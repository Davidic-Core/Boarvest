# Boarvest Backend and Financial Data Architecture

## Status and boundaries

**Status: Proposed; financial backend not implemented.**

The inspected repository currently has Supabase email/password authentication, a browser client in `lib/supabase/client.ts`, a server client in `lib/supabase/server.ts`, session refresh in `lib/supabase/proxy.ts` via `proxy.ts`, authentication routes/pages, and a server-protected `/dashboard`. The current dashboard only renders placeholder values and empty states. No database migrations, financial tables, ledger, admin role, blockchain monitor, deposit/withdrawal service, notifications store, or transaction history implementation was found.

This document proposes only the backend pieces needed for those future capabilities. It does not claim that any proposed table or service already exists.

## Current implementation versus new work

| Area | Current repository | New work required |
| --- | --- | --- |
| Identity | Supabase Auth handles signup, password login, email confirmation, callbacks, and sign-out. | Keep Supabase Auth; add a server-managed profile projection only if product data needs one. |
| Session access | SSR cookies and request refresh are implemented. | Reuse the server client and verify the user on every protected operation. |
| User dashboard | `/dashboard` is protected and shows placeholders. | Add authorized server data loaders only after financial records exist. |
| Profiles | Name is read from Supabase user metadata for display. | Define a profile table only for durable application fields not suitable for Auth metadata. |
| Financial data | No schema or queries found. | Add deposit requests, withdrawal requests, ledger entries, supported assets/networks, and audit records. |
| Admin | No `/admin` route or admin authorization found. | Add one server-managed administrator mapping and server checks. |

## Proposed data model

Use integer base units (or another exact decimal representation agreed during implementation), never binary floating point, for financial amounts. Every money-like record must include its asset and network context.

Only the following records are initially needed:

- **profiles** — optional durable user fields keyed to the Supabase Auth user id. Do not duplicate authentication secrets.
- **admin_memberships** — server-managed mapping of the one authorized administrator to an Auth user id, with status and timestamps. It must not be writable by ordinary users.
- **supported_assets** — token symbol, network, contract address where applicable, decimals, enabled status, and versioned configuration.
- **treasury_addresses** — approved destination address per asset/network, with active history and operational ownership.
- **deposit_requests** — user, asset/network, intended amount, lifecycle state, treasury address version, and review metadata. A request is not proof of payment.
- **withdrawal_requests** — user, asset/network, amount, destination address, reservation state, payout state, confirmation state, and review metadata.
- **ledger_accounts** — per-user and system accounts for each asset/network.
- **ledger_entries** — immutable, balanced postings with a unique reference to the business event. Corrections use reversing/adjusting entries; existing postings are not edited in place.
- **blockchain_transactions** — normalized network evidence such as transaction hash, token contract, destination, amount, confirmation count, observed time, and verification state. Enforce uniqueness on `(network, transaction_hash, asset_contract)` as appropriate for the selected chain.
- **notifications** — user-facing status messages with delivery/read state and a source event id.
- **admin_audit_logs** — append-only records of privileged actions, actor, target, old/new state, reason, timestamp, and safe metadata.

Exact columns, indexes, retention, and whether some records are views or projections remain implementation decisions. Do not add tables that have no approved access pattern.

## Authorization and Row Level Security

All application data access must be server-mediated. Sensitive mutations must run in Route Handlers or Server Actions that first resolve `supabase.auth.getUser()` with the server client and then authorize the operation.

Supabase RLS should be enabled for every user-owned table:

- Users may select only their own profile, deposit requests, withdrawal requests, notifications, and transaction/history projections.
- Users may insert only their own deposit/withdrawal requests after server-side validation.
- Users must not directly insert, update, or delete ledger entries, blockchain verification, admin memberships, audit logs, supported assets, treasury addresses, or another user's records.
- Admin reads and writes should use a server-verified admin identity and narrowly scoped policies. A service-role client, if needed for a specific trusted server operation, must remain server-only and must still enforce application authorization and audit logging.
- RLS is defense in depth; it does not replace server authorization or input validation.

User-editable Auth metadata is presentation data, not an authorization source. Never use a client-supplied `userId` as proof of ownership or administrator status.

## Financial accounting

Do not design the system around an editable `balance` number. Derive balances from immutable ledger postings and explicit reservations:

- **Available funds** = posted credits minus posted debits minus active reservations.
- **Reserved funds** = open withdrawal reservations, represented by a ledger/accounting record or a rigorously locked reservation projection.
- **Completed funds/activity** = finalized ledger postings and completed business events.

For example, if a user has 500 units available and requests 50 units, an atomic transaction validates the available amount and reserves 50 units. The user can still see 500 as total posted holdings, but only 450 is available to spend. If the request is declined before payout, the reservation is released. After the payout is verified and the user confirms receipt, the system finalizes the existing reserved withdrawal without debiting the 50 units a second time.

The exact journal accounts and posting directions must be approved before implementation, but every entry must balance, reference one business event, and be idempotent.

## Deposit processing

A deposit request records user intent only. A monitor may create or update blockchain evidence, but a trusted server verification path must check network, token/contract identity, treasury destination, transaction hash, amount, required confirmations, and duplicate status. Only a privileged approval path may post the credit ledger entry. A unique business-event reference and database constraint must make retries safe.

## Withdrawal processing

Withdrawal creation, reservation, administrator decision, payout recording, user confirmation, and completion must be valid state transitions. The server should reject invalid transitions such as completing a declined request, approving an already completed request, or confirming without a verified payout.

A manual payout does not automatically happen because an administrator clicks Approve. The payout hash is entered and verified separately. Confirmation finalizes the existing reservation and ledger workflow; it never performs a second debit. Failed, uncertain, incorrect, disputed, and never-confirmed payouts remain auditable exception states rather than being overwritten.

## Atomicity, idempotency, and duplicate prevention

Use database transactions for operations that change multiple related records, especially:

- Creating a withdrawal and reserving funds.
- Declining a withdrawal and releasing funds.
- Posting a verified deposit credit.
- Recording a verified payout and changing its workflow state.
- Confirming receipt, finalizing accounting, releasing the reservation, and creating the notification.

Use idempotency keys for user submissions and admin actions. Enforce database uniqueness for business-event references, network-specific transaction identifiers, and any one-time ledger posting. Lock or otherwise serialize the affected account/reservation rows so concurrent requests cannot spend the same available funds.

## Reconciliation and auditability

Reconciliation should compare ledger events, deposit/withdrawal records, blockchain evidence, treasury addresses, and external monitoring data. Exceptions must be visible to an administrator and must not be silently “fixed” by editing a balance. Store who approved, verified, paid, corrected, or disputed an event and why. Audit logs should be append-only from the application perspective and should never contain private keys, service-role keys, passwords, or unnecessary personal data.

## Secrets and operational security

Keep Supabase service-role credentials, blockchain provider credentials, signing keys (if ever introduced), and webhook verification secrets on the server or in the deployment secret store. Never put them in `NEXT_PUBLIC_*` variables, browser bundles, Markdown examples, or client-editable metadata. The current `.env.example` contains only public Supabase URL/key placeholders and the local redirect URL; any future server secret must be added through the project's secure environment management, not committed.

## Testing before production

Before enabling real financial operations, test with a dedicated non-production Supabase project and test network. Cover RLS isolation, admin denial, concurrent reservations, duplicate submissions, repeated confirmation clicks, invalid transitions, insufficient funds, incorrect hashes, reorg/uncertain confirmations, failed payouts, notification retries, reconciliation exceptions, and recovery from partial failures. Add integration and end-to-end tests for the complete deposit and withdrawal state machines, then complete security, operational, compliance, custody, and legal review.

## Unresolved implementation decisions

- Which single blockchain network, token, monitor, and trusted verification source will be used first.
- Whether a provider or an internally operated verifier is responsible for confirmation data.
- The exact ledger chart of accounts and journal posting model.
- The administrator role storage and provisioning procedure.
- The retention, privacy, and export policy for financial and audit records.
- Whether user confirmation is mandatory forever, time-bounded, or replaced by an operations escalation policy.
- Required regulatory, custody, tax, and dispute-handling controls.

Until these decisions are resolved and implemented, Boarvest should continue to present financial dashboard values as unavailable rather than operational.
