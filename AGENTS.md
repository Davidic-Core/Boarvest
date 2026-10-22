<!-- BEGIN:nextjs-agent-rules -->This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in "node_modules/next/dist/docs/" (resolved from this file's directory; in monorepos, the "next" package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by "next dev" — verify at "node_modules/next/dist/server/lib/generate-agent-files.js". Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->Boarvest Agent Instructions

Project Overview

This repository is a Next.js 16 + TypeScript application with Supabase authentication and an investment platform dashboard.

Stack

- Next.js 16
- React 19
- TypeScript
- Supabase
- ESLint
- Node.js 24

Current Task: User Dashboard Settings

Branch: "feat:settings"

Current Mode: Planning and documentation only.

The agent must inspect the existing implementation and document the proposed changes. It must NOT modify application code, components, styles, routes, database schemas, migrations, environment variables, or configuration files without explicit user approval.

The agent may update this "agent.md" file to document findings and checklist progress.

Objective

Replace the existing user dashboard menu label Account Settings with Settings and plan a Settings page that lets authenticated users manage their profile, security, and display currency.

Keep the implementation minimal and consistent with the existing Boarvest dashboard design.

Implementation Checklist

The agent must inspect the existing codebase and maintain this checklist. Mark an item "✅" only after its corresponding work has actually been implemented and verified. During the planning phase, all implementation items must remain unchecked.

Phase 1: Inspect and Plan

- [ ] Locate the existing Account Settings navigation item and page.
- [ ] Locate the existing dashboard navigation component and determine how menu labels and routes are configured.
- [ ] Locate the current Sign Out button and inspect its existing logout implementation.
- [ ] Inspect the existing Supabase authentication and profile-data implementation.
- [ ] Identify where the authenticated user's full name, email, user ID, and account creation date come from.
- [ ] Determine which profile fields can safely be edited using the current schema.
- [ ] Inspect existing password-change and password-reset functionality.
- [ ] Inspect existing dashboard balance and earned-profit components.
- [ ] Identify how the selected display currency could persist across sessions.
- [ ] Determine whether an existing, approved cryptocurrency exchange-rate source is available.
- [ ] Document the proposed files to change and the purpose of each change.
- [ ] Identify any required database migration, environment variable, or external service before proposing it.
- [ ] Present the implementation plan for user approval.

Phase 2: Settings Navigation and Layout

Do not begin until implementation is explicitly approved.

- [ ] Rename the user dashboard navigation label from "Account Settings" to "Settings".
- [ ] Preserve the existing route if practical; avoid unnecessary route changes.
- [ ] Display the page heading "SETTINGS".
- [ ] Display the description: "Manage your personal information and account security."
- [ ] Build a responsive Profile Information section.
- [ ] Build a responsive Security section.
- [ ] Build a responsive Account Preferences section.
- [ ] Keep Account Actions and account deletion outside the initial implementation.
- [ ] Preserve the existing visual design and mobile usability.

Phase 3: Profile Information

- [ ] Display the authenticated user's full name.
- [ ] Display the user's email address as read-only initially.
- [ ] Display the user's ID as read-only.
- [ ] Display the account creation date if available.
- [ ] Allow editing only of profile fields supported by the existing data model.
- [ ] Add a Save Changes button.
- [ ] Validate form input and display clear success or error messages.
- [ ] Ensure users can access and update only their own profile information.
- [ ] Verify profile changes persist after refreshing the page.

Phase 4: Security

- [ ] Add a Change Password action using the existing Supabase Auth implementation.
- [ ] Provide the required password fields according to the existing authentication flow.
- [ ] Add a show/hide password control where password fields are displayed.
- [ ] Provide a secure password-reset flow.
- [ ] Move or expose the existing Sign Out action within the Settings Security section.
- [ ] Preserve the existing logout behaviour and session handling.
- [ ] Verify that password operations and sign-out work correctly.

Phase 5: Account Preferences — Display Currency

The available display currency options must be:

- USD — US Dollar

- SOL — Solana

- ETH — Ethereum

- BNB — BNB

- [ ] Add a Display Currency selector.

- [ ] Use USD as the underlying accounting currency.

- [ ] Persist the user's selected display currency across sessions.

- [ ] Update supported dashboard balance displays to reflect the selected currency.

- [ ] Update supported earned-profit displays to reflect the selected currency.

- [ ] Ensure portfolio values use the selected display currency when the portfolio integration is implemented.

- [ ] Avoid counting balances or earnings twice.

- [ ] Ensure changing display currency never changes actual financial balances or ledger entries.

- [ ] Do not imply that displaying a SOL, ETH, or BNB equivalent means the user owns that cryptocurrency.

- [ ] Inspect for an existing approved exchange-rate source before proposing a new one.

- [ ] Never invent live rates or present mock rates as real market prices.

- [ ] If no reliable rate source exists, document the limitation and propose the safest next step before implementation.

Phase 6: Account Actions — Deferred

Account deletion is explicitly out of scope for this task.

- [ ] Do not add a Request Account Deletion button.
- [ ] Do not create account-deletion APIs or database operations.
- [ ] Revisit this feature only after an appropriate administrative review and response workflow has been planned.

Phase 7: Testing and Verification

Do not mark an item complete without evidence of implementation and verification.

- [ ] Verify the Settings navigation label and route.
- [ ] Test profile validation and saving.
- [ ] Test password-change and password-reset flows.
- [ ] Test Sign Out.
- [ ] Test currency selection and persistence.
- [ ] Verify balance and earned-profit displays use the selected currency correctly.
- [ ] Confirm display conversion does not modify financial records.
- [ ] Confirm existing deposit functionality remains intact.
- [ ] Confirm the existing user Transactions page remains intact.
- [ ] Confirm admin authorization and admin dashboard functionality remain intact.
- [ ] Run "npm run lint".
- [ ] Run "npx tsc --noEmit".
- [ ] Run "npm run build".
- [ ] Record the actual result of each validation command.

Security Rules

- Never commit secrets, API keys, service-role keys, or database credentials.
- Never expose "SUPABASE_SERVICE_ROLE_KEY" in frontend code or client components.
- Treat privileged Supabase credentials as server-only.
- Never allow Settings to modify account balances, deposit approvals, ledger entries, investment records, or administrative privileges.
- Never allow a user to access or update another user's profile.
- Do not run destructive database operations against production financial data.

Supabase Rules

- Use the browser client in client components.
- Use the server client in server actions and route handlers.
- Follow existing SSR-safe authentication patterns.
- If a schema change is necessary, document it and propose a migration under "supabase/migrations" before requesting approval.
- Do not apply schema changes without explicit authorization.

Code Standards

- Keep components small, typed, and reusable.
- Follow the existing Next.js App Router conventions.
- Inspect repository-specific implementations before proposing changes.
- Avoid unrelated refactors.
- Preserve existing authentication and redirect behaviour.

Required Agent Behaviour

1. Begin in planning mode.
2. Inspect the repository and identify the relevant files.
3. Update this checklist only when findings are supported by actual inspection or implementation.
4. Keep implementation checkboxes unchecked until the corresponding feature has been implemented and verified.
5. Document the proposed files to change, expected behaviour, risks, and required dependencies.
6. Stop and present the plan for approval before modifying application code.
7. After approval, implement only the approved scope.
8. Report completed work, incomplete work, validation results, and any blockers.
9. Do not merge branches, push changes, or deploy without explicit authorization.

Validation Commands

Run when implementation is approved and the relevant environment is available:

- "npm run lint"
- "npx tsc --noEmit"
- "npm run build"

If a command fails, report the actual error. Do not mark the validation as successful.

PR Expectations

- Keep changes scoped to the approved Settings feature.
- Document changes to environment variables, database schema, or authentication behaviour.
- Preserve working deposit, Transactions, and admin functionality.
- Do not claim that a feature works unless it has been tested.
