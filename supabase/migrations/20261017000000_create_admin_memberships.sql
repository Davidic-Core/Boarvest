create table if not exists public.admin_memberships (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.admin_memberships enable row level security;

create policy "Admins can view their own membership"
on public.admin_memberships
for select
to authenticated
using (auth.uid() = user_id);
