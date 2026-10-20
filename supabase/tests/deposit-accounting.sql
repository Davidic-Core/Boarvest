-- Disposable local-only integration assertions.
-- Run only after `supabase db reset` against the local Supabase stack.
-- This file never contacts a remote project and uses synthetic auth identities.

\set ON_ERROR_STOP on

create temporary table test_ids (name text primary key, id uuid not null);
insert into test_ids values
  ('user', '00000000-0000-0000-0000-000000000001'),
  ('admin', '00000000-0000-0000-0000-000000000002'),
  ('other', '00000000-0000-0000-0000-000000000003');

insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
select id, 'authenticated', 'authenticated', name || '@local.test', crypt('local-test-only', gen_salt('bf')), now()
from test_ids;

create function pg_temp.assert_true(condition boolean, message text)
returns void language plpgsql as $$
begin
  if not condition then raise exception 'ASSERTION FAILED: %', message; end if;
end;
$$;

select assert_true(to_regclass('public.admin_memberships') is not null, 'admin_memberships exists');
select assert_true(to_regclass('public.deposit_requests') is not null, 'deposit_requests exists');
select assert_true(to_regclass('public.account_ledger') is not null, 'account_ledger exists');
select assert_true((select relrowsecurity from pg_class where oid = 'public.deposit_requests'::regclass), 'deposit_requests has RLS');
select assert_true((select relrowsecurity from pg_class where oid = 'public.account_ledger'::regclass), 'account_ledger has RLS');
select assert_true(to_regprocedure('public.review_deposit_request(uuid,text,text)') is not null, 'review RPC exists');
select assert_true(to_regprocedure('public.assert_deposit_ledger_integrity()') is not null, 'ledger trigger function exists');

insert into public.admin_memberships(user_id) select id from test_ids where name = 'admin';

-- Authenticated owner can insert a valid pending request and read only their own row.
set local role authenticated;
select set_config('request.jwt.claim.sub', (select id::text from test_ids where name = 'user'), true);
insert into public.deposit_requests (user_id, asset, network, requested_usd, estimated_token_amount, destination_wallet)
select id, 'SOL', 'Solana', 100.00, 1.25, 'HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT'
from test_ids where name = 'user';
select assert_true((select count(*) from public.deposit_requests) = 1, 'owner sees own request');
select assert_true((select count(*) from public.deposit_requests where user_id <> (select id from test_ids where name = 'user')) = 0, 'owner cannot see other requests');

-- Invalid client writes are rejected by database constraints and RLS.
do $$
begin
  begin
    insert into public.deposit_requests (user_id, asset, network, requested_usd, destination_wallet)
    values ((select id from test_ids where name = 'user'), 'ETH', 'Solana', 100, '0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62');
    raise exception 'invalid asset/network was accepted';
  exception when check_violation then null;
  end;
  begin
    insert into public.deposit_requests (user_id, asset, network, requested_usd, destination_wallet)
    values ((select id from test_ids where name = 'other'), 'SOL', 'Solana', 100, 'HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT');
    raise exception 'cross-user insert was accepted';
  exception when insufficient_privilege or check_violation then null;
  end;
end $$;

-- Ordinary users cannot call the review RPC.
select set_config('request.jwt.claim.sub', (select id::text from test_ids where name = 'user'), true);
do $$
begin
  begin
    perform public.review_deposit_request((select id from public.deposit_requests limit 1), 'approved', null);
    raise exception 'ordinary user reviewed a deposit';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Admin approval creates exactly one matching credit.
select set_config('request.jwt.claim.sub', (select id::text from test_ids where name = 'admin'), true);
select public.review_deposit_request((select id from public.deposit_requests limit 1), 'approved', 'local approval');
select assert_true((select count(*) from public.account_ledger) = 1, 'approval creates one ledger credit');
select assert_true((select sum(amount_usd) from public.account_ledger) = 100.00, 'ledger amount matches request');
select assert_true((select count(*) from public.account_ledger l join public.deposit_requests d on d.id = l.deposit_request_id where l.user_id = d.user_id and l.created_by = d.reviewed_by) = 1, 'ledger identity fields match');

-- Repeat review is rejected and cannot create another credit.
do $$
begin
  begin
    perform public.review_deposit_request((select id from public.deposit_requests limit 1), 'approved', null);
    raise exception 'repeat review was accepted';
  exception when transaction_rollback then null;
  end;
end $$;
select assert_true((select count(*) from public.account_ledger) = 1, 'repeat review did not duplicate credit');

-- Append-only ledger and reviewed financial fields are protected.
do $$
begin
  begin
    update public.account_ledger set amount_usd = 999 where true;
    raise exception 'ledger update was accepted';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.deposit_requests set requested_usd = 999 where status = 'approved';
    raise exception 'reviewed deposit mutation was accepted';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'deposit-accounting local assertions passed' as result;
