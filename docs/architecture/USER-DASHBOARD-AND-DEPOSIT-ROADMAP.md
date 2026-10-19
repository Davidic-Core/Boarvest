# User Dashboard and Deposit Roadmap

## Implemented in this stage

- `/dashboard` remains server-protected by Supabase Auth and redirects administrators to `/admin` using the existing authorization check.
- The Total Deposits card was removed. Total Balance and Earned Profit now show `$0.00` with copy that makes clear no approved/verified financial records exist. No financial tables or client-writable balances were added.
- Portfolio Overview now names the intended fields: invested capital, active investments, investment dates, status, and accumulated earned profit, with an explicit empty state.
- Workspace navigation exposes Overview, Portfolio, Deposits, Transactions, Account Settings, and Help & Support. Withdrawals appears directly below Deposits and is explicitly unavailable.
- Placeholder routes preserve authentication and administrator redirects without creating deposit, withdrawal, investment, transaction, or approval records.

## Planned deposit and investment workflow

A later implementation must add trusted Supabase tables, RLS, immutable ledger entries, idempotent server-side mutations, and administrator-only approval transitions. A deposit request is only user intent; it must not credit available funds. A verified approval may post the approved USD amount exactly once. Portfolio and profit values must be derived from persisted investment and verified-return records.

The deposit interface is now implemented at `/dashboard/deposits`. It supports exactly SOL/Solana, ETH/Ethereum, and BNB/BNB Smart Chain with reputable CoinGecko-hosted token icons, the supplied treasury addresses, $10–$5,000 client-side validation, dynamic USD-to-token estimates, asset-specific network warnings, and copy feedback. `/api/market-prices` fetches all three prices server-side in one request, uses Next.js response caching, refreshes the client approximately every 60 seconds, prevents overlapping requests, and exposes loading/error states. Confirm Deposit remains intentionally non-persistent: it displays an honest unavailable message and creates no request or financial record. The intended ROI calculator minimum is $300 and the duration is seven days; ROI percentages, tiers, and payout rules remain unconfigured and are not displayed.

## Relevant routes and components

- `app/dashboard/page.tsx` — protected overview and financial empty states.
- `components/dashboard/DashboardShell.tsx` — existing responsive workspace shell and navigation.
- `components/dashboard/WorkspacePlaceholder.tsx` — authenticated placeholder surface for newly exposed routes.
- `app/dashboard/{portfolio,deposits,withdrawals,transactions,settings,help}/page.tsx` — scoped placeholders.
- `lib/auth/admin.ts`, `lib/supabase/server.ts`, and `proxy.ts` — existing authentication/session and administrator security paths, preserved.

## Remaining work

Implement the deposit data model and RLS, server-side submission, blockchain evidence and administrator approval workflow, immutable balance ledger, investment records and verified returns, the ROI calculator, transaction history, and withdrawal controls. Add migrations, integration tests, duplicate-approval tests, authorization tests, and operational reconciliation before enabling real financial actions. No deployment was performed by this stage.
