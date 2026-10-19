# User Dashboard and Deposit Roadmap

## Implemented in this stage

- `/dashboard` remains server-protected by Supabase Auth and redirects administrators to `/admin` using the existing authorization check.
- The Total Deposits card was removed. Total Balance and Earned Profit now show `$0.00` with copy that makes clear no approved/verified financial records exist. No financial tables or client-writable balances were added.
- Portfolio Overview now names the intended fields: invested capital, active investments, investment dates, status, and accumulated earned profit, with an explicit empty state.
- Workspace navigation exposes Overview, Portfolio, Deposits, Transactions, Account Settings, and Help & Support. Withdrawals appears directly below Deposits and is explicitly unavailable.
- Placeholder routes preserve authentication and administrator redirects without creating deposit, withdrawal, investment, transaction, or approval records.

## Planned deposit and investment workflow

A later implementation must add trusted Supabase tables, RLS, immutable ledger entries, idempotent server-side mutations, and administrator-only approval transitions. A deposit request is only user intent; it must not credit available funds. A verified approval may post the approved USD amount exactly once. Portfolio and profit values must be derived from persisted investment and verified-return records.

The intended deposit UI supports SOL/Solana, ETH/Ethereum, and BNB/BNB Smart Chain, CoinGecko pricing with 60-second polling, estimated USD-to-token conversion, the supplied treasury addresses, and $10–$5,000 validation. None of that interface or CoinGecko integration is implemented in this stage. The intended ROI calculator minimum is $300 and the duration is seven days; ROI percentages, tiers, and payout rules remain unconfigured and are not displayed.

## Relevant routes and components

- `app/dashboard/page.tsx` — protected overview and financial empty states.
- `components/dashboard/DashboardShell.tsx` — existing responsive workspace shell and navigation.
- `components/dashboard/WorkspacePlaceholder.tsx` — authenticated placeholder surface for newly exposed routes.
- `app/dashboard/{portfolio,deposits,withdrawals,transactions,settings,help}/page.tsx` — scoped placeholders.
- `lib/auth/admin.ts`, `lib/supabase/server.ts`, and `proxy.ts` — existing authentication/session and administrator security paths, preserved.

## Remaining work

Implement the deposit data model and RLS, server-side submission, blockchain evidence and administrator approval workflow, immutable balance ledger, investment records and verified returns, the ROI calculator, transaction history, and withdrawal controls. Add migrations, integration tests, duplicate-approval tests, authorization tests, and operational reconciliation before enabling real financial actions. No deployment was performed by this stage.
