# Boarvest Development Roadmap

## Project Overview

Boarvest is a crypto investment platform designed to provide users with an account dashboard, deposit and withdrawal workflows, transaction history, and a referral commission system.

Development will proceed in clearly defined phases. Each phase must be reviewed and tested before we move to the next.

The project will begin with the public website and application structure. Authentication, database integration, administrative operations, and financial features will be introduced only when their requirements are sufficiently defined.

## Development Principles

- Build incrementally instead of creating the entire application at once.
- Keep public pages, user dashboard pages, and administrative pages separate.
- Reuse components where they have clear responsibilities.
- Preserve existing working code and global styles where appropriate.
- Document architectural decisions before implementing complex features.
- Do not claim a feature is operational until its backend functionality has been implemented and tested.
- Never expose passwords, private keys, seed phrases, or server secrets.
- Never display fabricated balances, deposits, earnings, transaction records, or market data as real information.
- Require server-side authorization for protected user and administrator operations.
- Test financial operations before handling real funds.
- Review applicable legal and regulatory requirements before launching investment-related services.

---

## Phase 1 — Architecture and Documentation

**Status:** In progress

### Objectives

Establish the application's architecture and record the responsibilities of its main areas before expanding the codebase.

### Tasks

- [ ] Create and maintain `docs/ROADMAP.md`.
- [ ] Create and maintain `docs/architecture/APPLICATION.md`.
- [ ] Confirm that `docs/architecture/HOMEPAGE.md` remains in place.
- [ ] Define the public, authentication, dashboard, and admin route structure.
- [ ] Document the responsibilities of each application area.
- [ ] Document the proposed referral system.
- [ ] Document the planned deposit and administrator verification workflow.
- [ ] Record unresolved technical and business decisions.

### Completion criteria

- The three documentation files exist in their intended locations.
- The application route structure and responsibilities are documented.
- The planned development sequence is clear.
- The major architectural decisions and unresolved questions are recorded.

---

## Phase 2 — Public Landing Page

**Status:** Pending

### Objectives

Complete a responsive public homepage that introduces Boarvest and provides clear navigation to the login and signup pages.

### Tasks

- [ ] Review the existing `app/page.tsx`.
- [ ] Preserve existing global styles and metadata where appropriate.
- [ ] Extract the navigation bar into a reusable component.
- [ ] Extract the hero section into a component.
- [ ] Extract the About section into a component.
- [ ] Extract the Features section into a component.
- [ ] Add agreed information and responsible disclaimers.
- [ ] Complete the responsive layout for mobile and desktop.
- [ ] Complete the footer.
- [ ] Ensure the landing page remains publicly accessible without authentication.
- [ ] Connect the login and signup buttons to their intended routes when those pages exist.
- [ ] Run ESLint.
- [ ] Run a production build using the supported Webpack option.
- [ ] Review the rendered page on mobile.

### Completion criteria

- The public homepage renders correctly.
- The layout is responsive.
- Components have clear responsibilities.
- The page does not make unsupported claims about returns, security, licensing, or regulatory supervision.
- Lint and production build pass.

---

## Phase 3 — Login and Signup Pages

**Status:** Pending

### Objectives

Create the visual structure of the login and signup pages.

### Planned routes

- `/login`
- `/signup`

### Tasks

- [ ] Create `app/login/page.tsx`.
- [ ] Create `app/signup/page.tsx`.
- [ ] Build the login form layout.
- [ ] Build the signup form layout.
- [ ] Add navigation between login and signup.
- [ ] Add referral-code handling to the signup page's planned design.
- [ ] Display the referrer's name when a valid referral code can be resolved.
- [ ] Validate form presentation and responsive behavior.
- [ ] Clearly distinguish visual forms from operational authentication.

### Important limitation

The forms must not imply that registration, login, password storage, or account creation is operational until the backend authentication system has been implemented.

### Completion criteria

- Both routes render correctly.
- The forms are responsive.
- The homepage buttons navigate to the appropriate routes.
- The implementation does not falsely claim that accounts can already be created or authenticated.

---

## Phase 4 — User Dashboard

**Status:** Pending

### Objectives

Establish the user dashboard and add its sections as their responsibilities become clear.

### Planned routes

- `/dashboard`
- `/dashboard/portfolio`
- `/dashboard/transactions`
- `/dashboard/deposits`
- `/dashboard/withdrawals`
- `/dashboard/settings`

### Tasks

- [ ] Create the dashboard layout.
- [ ] Create the dashboard overview page.
- [ ] Add portfolio information when its data model is defined.
- [ ] Add transaction history.
- [ ] Add the deposit page and planned deposit instructions.
- [ ] Add the withdrawal page.
- [ ] Add account settings.
- [ ] Plan the referral link and referral summary.
- [ ] Plan balance and commission summaries without double-counting funds.
- [ ] Design appropriate loading, empty, pending, and error states.

### Deposit page requirements

The planned deposit page will:

- Display the designated Boarvest deposit wallet address.
- Clearly identify the cryptocurrency and network accepted for deposits.
- Explain how users should submit deposits.
- Provide a way to submit the transaction hash or transaction identifier.
- Show the status of each deposit request.
- Explain that a submitted deposit is not approved until it has been verified.
- Display confirmed deposit history.

The application must not assume that a deposit is valid merely because a user submits a transaction hash.

### Completion criteria

- The dashboard structure is clear and maintainable.
- Each section has a defined purpose.
- The interface does not represent sample data as actual account balances.
- Financial actions remain non-operational until the necessary backend controls exist.

---

## Phase 5 — Authentication and Database

**Status:** Pending

### Objectives

Select and implement a secure authentication and persistence approach before connecting protected application features.

### Tasks

- [ ] Compare suitable authentication and database options.
- [ ] Select the approach before creating backend modules.
- [ ] Define the user account data model.
- [ ] Implement account registration.
- [ ] Implement secure password handling where passwords are used.
- [ ] Implement login and logout.
- [ ] Implement secure session management.
- [ ] Implement server-side authorization.
- [ ] Define user and administrator roles.
- [ ] Implement unique referral-code generation.
- [ ] Store referral relationships.
- [ ] Define account recovery and session-expiration behavior.
- [ ] Validate inputs on the server.
- [ ] Protect secrets and sensitive account information.

### Completion criteria

- Accounts can be created and authenticated securely.
- Sessions are validated by the server.
- Protected routes and operations require appropriate authorization.
- Referral codes are unique and linked to the correct accounts.
- Administrative privileges cannot be granted by changing client-side values.

---

## Phase 6 — Admin Panel

**Status:** Pending

### Objectives

Create a separate administrative interface for authorized operational tasks.

### Planned routes

- `/admin`
- Additional administrative routes will be defined when their responsibilities are established.

### Tasks

- [ ] Create the admin layout.
- [ ] Create the admin overview.
- [ ] Implement server-side administrator authorization.
- [ ] Add deposit review tools.
- [ ] Add deposit approval and rejection workflows.
- [ ] Add withdrawal review tools when the withdrawal process is defined.
- [ ] Add referral and commission reporting.
- [ ] Record administrator decisions and timestamps.
- [ ] Record reasons for rejected or reversed operations.
- [ ] Protect administrative operations against unauthorized requests.

### Authentication behavior

The same login page will be used by regular users and administrators.

After successful authentication, the server will determine the account's authorized role and direct the user to the appropriate area:

- Regular user: `/dashboard`
- Authorized administrator: `/admin`

The application must not trust a role or redirect destination supplied only by the browser.

### Completion criteria

- The admin interface is separate from the public homepage and user dashboard.
- Only authorized administrators can access administrative data and operations.
- Important administrative actions are recorded.
- Deposit and withdrawal decisions have clear states and audit records.

---

## Phase 7 — Financial Operations

**Status:** Pending

### Objectives

Implement, test, and secure the platform's financial workflows before handling real funds.

### Deposit verification

- [ ] Define supported cryptocurrencies and networks.
- [ ] Define how deposits will be verified.
- [ ] Confirm that transaction hashes belong to the expected network and asset.
- [ ] Verify the destination address, amount, and transaction status.
- [ ] Prevent the same transaction from being credited more than once.
- [ ] Implement pending, approved, rejected, and reversed states as appropriate.
- [ ] Record administrator decisions.
- [ ] Reconcile recorded deposits with actual on-chain transactions.

The administrator's wallet balance alone is not sufficient proof that a particular user's deposit is valid. Verification must establish the transaction, asset, network, destination, and amount.

### Withdrawals

- [ ] Define withdrawal eligibility.
- [ ] Define available-balance and pending-withdrawal rules.
- [ ] Implement appropriate authorization and verification.
- [ ] Prevent duplicate or conflicting withdrawal requests.
- [ ] Record withdrawal status changes.
- [ ] Implement reconciliation and failure handling.
- [ ] Test the workflow before enabling real withdrawals.

### Account ledger

- [ ] Define the authoritative financial ledger.
- [ ] Record deposits, withdrawals, fees, adjustments, and commissions.
- [ ] Prevent duplicate financial entries.
- [ ] Maintain a traceable history of changes.
- [ ] Reconcile balances against ledger entries.
- [ ] Test concurrent and failed operations.

### Referral commissions

- [ ] Finalize the referral bonus rules.
- [ ] Define qualifying deposits.
- [ ] Define commission eligibility and timing.
- [ ] Define how reversed or refunded deposits affect commissions.
- [ ] Calculate commissions from verified eligible events.
- [ ] Prevent duplicate commission credits.
- [ ] Record pending, approved, credited, and reversed commission states.
- [ ] Display referral activity and commissions in the user dashboard.
- [ ] Test edge cases and abuse prevention.

### Completion criteria

- Financial records are consistent and auditable.
- Deposit and withdrawal workflows have been tested.
- Duplicate credits and unauthorized operations are prevented.
- Referral bonuses follow documented rules.
- Legal, compliance, security, and operational requirements have been reviewed before launch.

---

## Phase 8 — Final Testing and Launch Readiness

**Status:** Pending

### Objectives

Review the application before making it available for real users or enabling real financial operations.

### Tasks

- [ ] Run lint and production builds.
- [ ] Test public pages on mobile and desktop.
- [ ] Test registration, login, logout, and account recovery.
- [ ] Test user and administrator authorization.
- [ ] Test deposit and withdrawal workflows.
- [ ] Test referral tracking and commission calculations.
- [ ] Review privacy and security controls.
- [ ] Review error handling and audit records.
- [ ] Verify environment variables and production configuration.
- [ ] Review applicable legal and regulatory requirements.
- [ ] Complete a security review before handling real funds.

### Completion criteria

The application has passed the relevant tests, operational controls are in place, and the project is ready for the next approved deployment step.

---

## Current Development Position

**Current phase:** Phase 1 — Architecture and Documentation

**Next action:** Finalize the roadmap and application architecture documentation before continuing with the landing-page refactor.

Do not mark a phase complete merely because its files have been created. Completion requires the relevant tasks to have been implemented, reviewed, and tested.