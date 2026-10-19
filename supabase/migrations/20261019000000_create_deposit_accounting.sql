create extension if not exists pgcrypto;

create table if not exists public.deposit_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('DEP-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  user_id uuid not null references auth.users (id) on delete cascade,
  asset text not null check (asset in ('SOL', 'ETH', 'BNB')),
  network text not null check (network in ('Solana', 'Ethereum', 'BNB Smart Chain')),
  requested_usd numeric(12, 2) not null check (requested_usd >= 10 and requested_usd <= 5000),
  estimated_token_amount numeric(30, 12),
  destination_wallet text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id),
  review_note text,
  constraint deposit_review_fields_check check ((status = 'pending' and reviewed_at is null and reviewed_by is null) or (status in ('approved', 'declined') and reviewed_at is not null and reviewed_by is not null))
);

create index if not exists deposit_requests_user_created_idx on public.deposit_requests (user_id, created_at desc);
create index if not exists deposit_requests_status_created_idx on public.deposit_requests (status, created_at desc);

create table if not exists public.account_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  deposit_request_id uuid unique references public.deposit_requests (id) on delete restrict,
  entry_type text not null check (entry_type in ('deposit_credit')),
  amount_usd numeric(12, 2) not null check (amount_usd > 0),
  created_at timestamptz not null default timezone('utc'::text, now()),
  created_by uuid not null references auth.users (id)
);

create index if not exists account_ledger_user_created_idx on public.account_ledger (user_id, created_at desc);

alter table public.deposit_requests enable row level security;
alter table public.account_ledger enable row level security;

create policy "Users can view their own deposit requests" on public.deposit_requests for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can create their own pending deposit requests" on public.deposit_requests for insert to authenticated with check ((select auth.uid()) = user_id and status = 'pending' and reviewed_at is null and reviewed_by is null);
create policy "Admins can view deposit requests" on public.deposit_requests for select to authenticated using (exists (select 1 from public.admin_memberships m where m.user_id = (select auth.uid())));
create policy "Users can view their own ledger" on public.account_ledger for select to authenticated using ((select auth.uid()) = user_id);
create policy "Admins can view ledger" on public.account_ledger for select to authenticated using (exists (select 1 from public.admin_memberships m where m.user_id = (select auth.uid())));

create or replace function public.review_deposit_request(p_deposit_id uuid, p_decision text, p_review_note text default null)
returns public.deposit_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_admin uuid := auth.uid();
  v_request public.deposit_requests;
begin
  if v_admin is null or not exists (select 1 from public.admin_memberships where user_id = v_admin) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select * into v_request from public.deposit_requests where id = p_deposit_id for update;
  if not found then raise exception 'deposit not found' using errcode = 'P0002'; end if;
  if v_request.status <> 'pending' then raise exception 'deposit already reviewed' using errcode = '40001'; end if;
  if v_request.user_id = v_admin then raise exception 'admins cannot approve their own deposit' using errcode = '42501'; end if;
  if p_decision not in ('approved', 'declined') then raise exception 'invalid decision' using errcode = '22023'; end if;

  update public.deposit_requests
  set status = p_decision, reviewed_at = timezone('utc'::text, now()), reviewed_by = v_admin, review_note = nullif(trim(coalesce(p_review_note, '')), '')
  where id = p_deposit_id
  returning * into v_request;

  if p_decision = 'approved' then
    insert into public.account_ledger (user_id, deposit_request_id, entry_type, amount_usd, created_by)
    values (v_request.user_id, v_request.id, 'deposit_credit', v_request.requested_usd, v_admin)
    on conflict (deposit_request_id) do nothing;
  end if;

  return v_request;
end;
$$;

revoke all on function public.review_deposit_request(uuid, text, text) from public, anon;
grant execute on function public.review_deposit_request(uuid, text, text) to authenticated;
