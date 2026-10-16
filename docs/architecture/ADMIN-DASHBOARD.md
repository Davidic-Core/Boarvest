# Boarvest Admin Dashboard Architecture

## Status and scope

**Status: Proposed; not implemented.**

The repository currently contains a protected user dashboard at `/dashboard`, Supabase email/password authentication, Supabase SSR browser/server clients, and request session refresh through `proxy.ts`. It does **not** contain an `/admin` route, admin UI, financial tables, ledger, blockchain monitor, deposit workflow, withdrawal workflow, or administrator authorization model. This document describes the smallest secure design for a future admin dashboard without changing the existing authentication or user dashboard behavior.

The initial release targets one blockchain network. Asset and network identifiers should be modeled explicitly so another network can be added without redesigning every workflow.

## Navigation

The proposed admin navigation is:

- Overview
- Users
- Deposits
- Withdrawals
- Transactions
- Notifications
- Audit Log
- Settings

Every destination requires the same server-side administrator authorization. Hiding links is not an access control mechanism.

## Overview

The initial Overview contains exactly six summary cards:

| Card | Meaning | Intended source |
| --- | --- | --- |
| Total Users | Count of registered user accounts that are visible to the application, with the inclusion rule documented before launch. | Supabase Auth user data or a server-maintained profile projection; never a client-provided count. |
| Pending Deposits | Deposit requests awaiting administrator decision and/or required verification. | Server query over deposit requests and their valid pending states. |
| Approved Deposits | Deposit requests approved after the required review, whether awaiting ledger posting or already posted according to the final status contract. | Deposit request status plus the associated ledger posting state. The exact inclusion rule remains an implementation decision. |
| Pending Withdrawals | Withdrawal requests submitted or awaiting administrator action, excluding declined and completed requests. | Server query over withdrawal requests and valid pending states. |
| Approved Withdrawals | Withdrawal requests approved for manual payout but not yet recorded as paid. | Server query over approved withdrawal requests and payout state. |
| Completed Withdrawals | Withdrawals whose payout was verified, receipt was confirmed, and accounting was finalized. | Withdrawal state joined to the finalized ledger entry. |

Until those backend records exist, the interface may use sample values only when each value is visibly labeled **placeholder/demo data**. It must not display invented financial figures as real operational metrics.

## Administrator authentication and authorization

The dashboard must reuse the existing Supabase authentication system. There is no public admin signup. The initial release has one authorized administrator account.

Required controls:

1. Protect `/admin` in the server-rendered route and protect every sensitive Server Action or Route Handler independently.
2. Resolve the authenticated user on the server with the existing Supabase server client; do not trust a client-side flag, URL parameter, hidden link, or user-editable metadata as proof of administrator privileges.
3. Ordinary authenticated users must receive an authorization failure or safe redirect and must not see admin data.
4. Store the administrator authorization in a server-managed mechanism, preferably a tightly controlled database record or role mapping maintained by a deployment/migration process. Provisioning must be an operator-only action with review and auditability; it must not be available through the public application.
5. Never expose `SUPABASE_SERVICE_ROLE_KEY` or any other privileged secret to browser code. Browser code may use only the existing publishable Supabase configuration.
6. Preserve the current login, signup, callback, password-reset, session-refresh, sign-out, and `/dashboard` behavior.

The exact provisioning mechanism, role table name, and operational break-glass procedure are unresolved and must be approved before implementation.

## Deposit workflow

1. The user selects a supported token and network.
2. The user enters the intended amount and reviews the request.
3. The server creates a pending deposit request. Submitting it is not proof of payment and does not credit a balance.
4. A blockchain monitoring service detects potential incoming transactions.
5. The administrator manually reviews the transaction using trusted blockchain information.
6. The administrator approves or declines the request.
7. An approved and verified deposit is credited through the financial ledger exactly once.
8. The user sees the updated status and receives an appropriate notification.

For the initial one-network release, supported asset/network configuration must identify:

- Network and token identity.
- Token contract address where applicable.
- Treasury destination address.
- Transaction hash.
- Amount and asset decimals.
- Required confirmation count.
- A unique, network-specific transaction identifier to prevent duplicate crediting.

A monitor is evidence for review, not an authorization decision. The server must re-check the network, destination, token contract, amount, transaction receipt, and confirmation count before posting a ledger entry. A transaction hash cannot be credited twice, even if multiple requests refer to it.

## Withdrawal workflow

1. The user submits a request with a supported token, network, amount, and destination address.
2. The server validates the request and reserves the necessary funds so they cannot be spent elsewhere.
3. The administrator reviews and approves or declines the request.
4. Approval does not automatically execute a blockchain transfer.
5. The administrator manually sends the payout.
6. The administrator records the verified transaction hash and marks the payout as paid, awaiting user confirmation.
7. The user reviews the withdrawal and clicks **Confirm Received**.
8. The server records that confirmation, finalizes the ledger transaction, releases the reservation, and marks the withdrawal **Completed**.
9. The user sees the completed transaction in history.

The reservation is the first accounting control. User confirmation finalizes the existing reserved withdrawal; it must not create a second debit. Repeated confirmation clicks must be idempotent and return the already-completed result.

### Exceptions and reconciliation

- **Declined request:** keep the decision and reason in the audit trail, release the reservation atomically, and make the funds available again.
- **Failed or uncertain payout:** move to a review state; do not mark paid or finalize accounting until the payout is verified. If no payout occurred, decline/cancel and release the reservation through an audited action.
- **Incorrect transaction hash:** do not finalize. Correct it only through a privileged, audited correction workflow that preserves the original value and reason.
- **No user confirmation:** retain the payout in an awaiting-confirmation state, notify the user, and escalate according to an operations policy. Do not silently debit again or erase the record.
- **Recorded payout disputed by the user:** retain the user's dispute, re-check the transaction on the trusted network source, preserve all evidence, and route the case to manual review. User confirmation is a workflow requirement, not definitive blockchain proof of receipt.
- **Duplicate requests or clicks:** enforce idempotency keys and unique database constraints; return the existing request/result instead of creating another ledger entry.

Blockchain verification and user confirmation must be reconciled as separate facts: the transaction hash and network evidence establish the recorded payout event, while user confirmation establishes the workflow acknowledgement. A dispute remains possible after confirmation and must be auditable.

## Sensitive admin actions

Admin actions should be explicit, server-authorized, validated, and recorded in the audit log. Examples include approving/declining a deposit, approving/declining a withdrawal, correcting a payout hash, changing supported asset configuration, and issuing a notification. Each action should record actor, target, prior state, next state, reason, timestamp, and a safe metadata summary without secrets.

## Open decisions before implementation

- The exact administrator role/provisioning store and emergency recovery process.
- The initial blockchain network, supported token, confirmation threshold, and monitoring provider.
- The definition of “approved deposit” for the Overview card.
- Whether notifications are in-app only or also delivered by email.
- Operations policy and retention period for unconfirmed withdrawals and disputes.
- Compliance, custody, accounting, and legal requirements before real-money operation.

Until these decisions and the backend design are approved, this document must not be read as evidence that admin or financial functionality exists.
