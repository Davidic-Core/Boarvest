create extension if not exists pgcrypto;

create table if not exists public.deposit_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('DEP-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  user_id uuid not null references auth.users (id) on delete cascade,
  asset text not null,
  network text not null,
  requested_usd numeric(12, 2) not null,
  estimated_token_amount numeric(30, 12),
  destination_wallet text not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc'::text, now()),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id),
  review_note text
);

create table if not exists public.account_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  deposit_request_id uuid not null unique references public.deposit_requests (id) on delete restrict,
  entry_type text not null default 'deposit_credit',
  amount_usd numeric(12, 2) not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  created_by uuid not null references auth.users (id)
);

-- Explicitly add the invariants when this migration is rerun against a database
-- where CREATE TABLE IF NOT EXISTS kept an earlier table definition.
do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_asset_check
    check (asset in ('SOL', 'ETH', 'BNB'));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_network_check
    check (network in ('Solana', 'Ethereum', 'BNB Smart Chain'));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_asset_network_check
    check ((asset = 'SOL' and network = 'Solana') or (asset = 'ETH' and network = 'Ethereum') or (asset = 'BNB' and network = 'BNB Smart Chain'));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_amount_check
    check (requested_usd >= 10 and requested_usd <= 5000);
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_wallet_check
    check ((asset = 'SOL' and destination_wallet = 'HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT') or (asset in ('ETH', 'BNB') and destination_wallet = '0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62'));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_status_check
    check (status in ('pending', 'approved', 'declined'));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.deposit_requests add constraint deposit_requests_review_fields_check
    check ((status = 'pending' and reviewed_at is null and reviewed_by is null) or (status in ('approved', 'declined') and reviewed_at is not null and reviewed_by is not null));
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.account_ledger add constraint account_ledger_entry_type_check
    check (entry_type = 'deposit_credit');
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.account_ledger add constraint account_ledger_amount_check
    check (amount_usd > 0);
exception when duplicate_object then null;
end $$;

create index if not exists deposit_requests_user_created_idx on public.deposit_requests (user_id, created_at desc);
create index if not exists deposit_requests_status_created_idx on public.deposit_requests (status, created_at desc);
create index if not exists account_ledger_user_created_idx on public.account_ledger (user_id, created_at desc);

alter table public.deposit_requests enable row level security;
alter table public.account_ledger enable row level security;

drop policy if exists "Users can view their own deposit requests" on public.deposit_requests;
drop policy if exists "Users can create their own pending deposit requests" on public.deposit_requests;
drop policy if exists "Admins can view deposit requests" on public.deposit_requests;
drop policy if exists "Users can view their own ledger" on public.account_ledger;
drop policy if exists "Admins can view ledger" on public.account_ledger;

create policy "Users can view their own deposit requests" on public.deposit_requests
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can create their own pending deposit requests" on public.deposit_requests
  for insert to authenticated with check ((select auth.uid()) = user_id and status = 'pending' and reviewed_at is null and reviewed_by is null);
create policy "Admins can view deposit requests" on public.deposit_requests
  for select to authenticated using (exists (select 1 from public.admin_memberships m where m.user_id = (select auth.uid())));
create policy "Users can view their own ledger" on public.account_ledger
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Admins can view ledger" on public.account_ledger
  for select to authenticated using (exists (select 1 from public.admin_memberships m where m.user_id = (select auth.uid())));

-- No client role can write or alter ledger rows. The trigger also protects
-- against accidental writes by privileged code paths other than the review RPC.
revoke all on table public.account_ledger from anon, authenticated;
grant select on table public.account_ledger to authenticated;
revoke insert, update, delete, truncate, references, trigger on public.account_ledger from anon, authenticated;

create or replace function public.assert_deposit_ledger_integrity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_request public.deposit_requests;
  v_credits integer;
begin
  if tg_table_name = 'account_ledger' then
    select * into v_request from public.deposit_requests where id = new.deposit_request_id;
    if not found or v_request.status <> 'approved' or new.user_id <> v_request.user_id or new.amount_usd <> v_request.requested_usd or new.created_by <> v_request.reviewed_by then
      raise exception 'ledger credit does not match approved deposit' using errcode = '23514';
    end if;
    return new;
  end if;

  select count(*) into v_credits from public.account_ledger where deposit_request_id = new.id;
  if (new.status = 'approved' and v_credits <> 1) or (new.status in ('pending', 'declined') and v_credits <> 0) then
    raise exception 'deposit approval and ledger credit must match exactly' using errcode = '23514';
  end if;
  return new;
end;
$$;

drop trigger if exists account_ledger_validate_insert on public.account_ledger;
create trigger account_ledger_validate_insert
  before insert on public.account_ledger
  for each row execute function public.assert_deposit_ledger_integrity();

drop trigger if exists deposit_requests_credit_consistency on public.deposit_requests;
create constraint trigger deposit_requests_credit_consistency
  after insert or update on public.deposit_requests
  deferrable initially deferred
  for each row execute function public.assert_deposit_ledger_integrity();

drop trigger if exists account_ledger_append_only on public.account_ledger;
create or replace function public.reject_ledger_mutation()
returns trigger language plpgsql security definer set search_path = '' as $$
begin raise exception 'account ledger is append-only' using errcode = '42501'; end;
$$;
create trigger account_ledger_append_only
  before update or delete on public.account_ledger
  for each row execute function public.reject_ledger_mutation();

create or replace function public.review_deposit_request(p_deposit_id uuid, p_decision text, p_review_note text default null)
returns public.deposit_requests
language plpgsql security definer set search_path = ''
as $$
declare
  v_admin uuid := auth.uid();
  v_request public.deposit_requests;
  v_inserted integer;
begin
  if v_admin is null or not exists (select 1 from public.admin_memberships where user_id = v_admin) then
    raise exception 'not authorized' using errcode = '42501';
  end if;
  if p_decision not in ('approved', 'declined') then raise exception 'invalid decision' using errcode = '22023'; end if;
  select * into v_request from public.deposit_requests where id = p_deposit_id for update;
  if not found then raise exception 'deposit not found' using errcode = 'P0002'; end if;
  if v_request.status <> 'pending' then raise exception 'deposit already reviewed' using errcode = '40001'; end if;
  if v_request.user_id = v_admin then raise exception 'admins cannot review their own deposit' using errcode = '42501'; end if;

  update public.deposit_requests set status = p_decision, reviewed_at = timezone('utc'::text, now()), reviewed_by = v_admin, review_note = nullif(trim(coalesce(p_review_note, '')), '') where id = p_deposit_id and status = 'pending' returning * into v_request;
  if not found then raise exception 'deposit was reviewed concurrently' using errcode = '40001'; end if;

  if p_decision = 'approved' then
    insert into public.account_ledger (user_id, deposit_request_id, entry_type, amount_usd, created_by)
    values (v_request.user_id, v_request.id, 'deposit_credit', v_request.requested_usd, v_admin);
    get diagnostics v_inserted = row_count;
    if v_inserted <> 1 then raise exception 'deposit credit was not created' using errcode = '23514'; end if;
  end if;
  return v_request;
end;
$$;

revoke all on function public.review_deposit_request(uuid, text, text) from public, anon;
grant execute on function public.review_deposit_request(uuid, text, text) to authenticated;
revoke all on function public.assert_deposit_ledger_integrity() from public, anon, authenticated;
revoke all on function public.reject_ledger_mutation() from public, anon, authenticated;
