# User Dashboard and Deposit Roadmap

## Implemented in this stage

- `/dashboard` remains server-protected by Supabase Auth and redirects administrators to `/admin` using the existing authorization check.
- The Total Deposits card was removed. Total Balance and Earned Profit now show `$0.00` with copy that makes clear no approved/verified financial records exist. No financial tables or client-writable balances were added.
- Portfolio Overview now names the intended fields: invested capital, active investments, investment dates, status, and accumulated earned profit, with an explicit empty state.
- Workspace navigation exposes Overview, Portfolio, Deposits, Transactions, Account Settings, and Help & Support. Withdrawals appears directly below Deposits and is explicitly unavailable.
- Placeholder routes preserve authentication and administrator redirects without creating deposit, withdrawal, investment, transaction, or approval records.

## Deposit workflow and Stage 4 admin control center

The Stage 3 accounting migration remains unapplied pending review. When applied, it provides constrained deposit requests, an append-only ledger, owner-scoped RLS, administrator-only review, and an atomic `review_deposit_request` operation. The existing API routes use the authenticated Supabase session, derive wallet configuration server-side, and keep review authorization behind `public.admin_memberships`.

The Stage 4 admin surface is implemented in `components/admin/AdminDashboard.tsx`. `/admin` now loads `/api/admin/deposits`, shows live deposit counts, and provides Pending, Approved, Declined, and All filters. Pending rows include reference, user identifier, asset/network, USD amount, estimate, destination wallet, and submission time. Approve and Decline use the existing server review endpoint, require an explicit confirmation, and display the verification warning. The endpoint remains the enforcement point; hiding or disabling a button is not authorization. Total Users uses the server-only Supabase admin API when the service key is available; the fallback is the distinct users represented in deposit records.

The user deposit interface remains at `/dashboard/deposits`, and user transactions remain at `/dashboard/transactions`. The interface supports SOL/Solana, ETH/Ethereum, and BNB/BNB Smart Chain, CoinGecko prices, wallet selection, validation, and pending-request submission through the existing API. Pending deposits do not affect balances; approved credits are expected to flow through the reviewed ledger operation. No withdrawals, investments, ROI rules, blockchain verification, or deployment were added in this stage.

## Relevant routes and components

- `app/dashboard/page.tsx` — protected overview and financial empty states.
- `components/dashboard/DashboardShell.tsx` — existing responsive workspace shell and navigation.
- `components/dashboard/WorkspacePlaceholder.tsx` — authenticated placeholder surface for newly exposed routes.
- `app/dashboard/{portfolio,deposits,withdrawals,transactions,settings,help}/page.tsx` — scoped placeholders.
- `lib/auth/admin.ts`, `lib/supabase/server.ts`, and `proxy.ts` — existing authentication/session and administrator security paths, preserved.

## Remaining work

Implement the deposit data model and RLS, server-side submission, blockchain evidence and administrator approval workflow, immutable balance ledger, investment records and verified returns, the ROI calculator, transaction history, and withdrawal controls. Add migrations, integration tests, duplicate-approval tests, authorization tests, and operational reconciliation before enabling real financial actions. No deployment was performed by this stage.
