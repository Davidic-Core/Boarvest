# Boarvest User Dashboard Architecture

## 1. Purpose and scope

This document describes the current authenticated user dashboard at `/dashboard`. It records the behavior implemented in the repository as inspected, including the page structure, Supabase access protection, dashboard shell, responsive navigation, and intentionally unavailable financial features.

This is documentation of the current implementation, not a design specification. Investment execution, deposits, withdrawals, portfolio accounting, transaction persistence, and admin functionality are outside the current dashboard scope.

Status labels used below:

- **Implemented** — present and functioning in the inspected code.
- **Partially implemented** — some supporting behavior exists, but the full feature is incomplete.
- **Placeholder** — visible UI exists, but it does not represent live functionality or data.
- **Planned** — described by the broader architecture or as a future improvement, but not implemented in the current route.

## 2. Current implementation status

| Area | Status | Current behavior |
| --- | --- | --- |
| Protected `/dashboard` route | Implemented | The server page calls Supabase `auth.getUser()` and redirects unauthenticated visitors to `/login?next=/dashboard`. |
| Dashboard shell | Implemented | A client-side shell provides the sidebar, header, user identity display, mobile menu state, and sign-out control. |
| Boarvest branding | Implemented | The existing `/public/image/boarvest-logo.png` asset is used in the dashboard brand. |
| Summary cards | Placeholder | Balance, deposits, and profit display an em dash with explanatory copy; no financial values are queried. |
| Portfolio overview | Placeholder | The section renders a polished empty state marked “Coming soon.” |
| Recent activity | Placeholder | The section renders a no-transactions empty state marked “Coming soon.” |
| Quick actions | Placeholder | Portfolio, transactions, and settings are non-interactive “Available soon” items. |
| Dashboard navigation | Partially implemented | Overview links to `/dashboard`; the remaining dashboard destinations are visibly disabled and marked “Soon.” |
| Responsive navigation | Implemented | On screens up to 760px wide, the sidebar becomes an off-canvas menu with a close button and overlay. |
| Financial backend | Planned | No dashboard database queries, ledger, portfolio model, or transaction source is present in this implementation. |

## 3. Dashboard routes and page structure

The current route structure relevant to the dashboard is:

```text
app/
├── dashboard/
│   ├── page.tsx
│   └── dashboard.css
├── login/page.tsx
├── signup/page.tsx
├── forgot-password/page.tsx
├── reset-password/page.tsx
└── auth/
    ├── callback/route.ts
    └── error/page.tsx
```

The broader `docs/architecture/APPLICATION.md` describes intended future dashboard routes such as portfolio, transactions, deposits, withdrawals, and settings. Those route files are not present in the inspected repository, so the current dashboard does not link to them as active destinations.

`app/dashboard/page.tsx` is an asynchronous App Router server component. It:

1. Calls `connection()` to opt the page into request-time behavior.
2. Creates the Supabase server client.
3. Calls `supabase.auth.getUser()`.
4. Redirects to `/login?next=/dashboard` when no authenticated user is returned.
5. Reads display-only name fields from `user.user_metadata`.
6. Renders `DashboardShell` with the authenticated email and optional display name.
7. Renders the welcome area, three summary cards, portfolio and activity sections, and quick actions.

## 4. Component architecture

### `DashboardShell`

**File:** `components/dashboard/DashboardShell.tsx`

**Status:** Implemented.

`DashboardShell` is a client component because it owns the mobile navigation state. It receives:

- `children` — the dashboard page content.
- `userEmail` — the authenticated user's email, or the page fallback string.
- `displayName` — a verified-looking display label sourced from metadata when available.

It composes:

- The Boarvest logo and brand label.
- Primary workspace navigation.
- Secondary support navigation.
- The authenticated user's avatar initials and account details.
- `SignOutButton`.
- A responsive header containing the current page title and user identity.
- A mobile menu button, close button, and click-to-close overlay.
- The semantic `<main>` element that contains page content.

### `SignOutButton`

**File:** `components/auth/SignOutButton.tsx`

**Status:** Implemented.

The button creates the existing Supabase browser client, calls `auth.signOut()`, then replaces the current route with `/login` and refreshes the router. It is rendered in the dashboard sidebar footer.

### Inline dashboard empty state

**File:** `app/dashboard/page.tsx`

**Status:** Implemented for current placeholders.

The page defines a small `EmptyState` component used for portfolio and activity sections. It supplies a decorative symbol, heading, and explanatory description without querying or fabricating financial data.

### Styling

**File:** `app/dashboard/dashboard.css`

**Status:** Implemented.

The dashboard stylesheet defines the dark frame, sidebar, cards, navigation states, headers, empty states, responsive grids, mobile off-canvas behavior, and focus/hover styling. It is imported globally by `app/layout.tsx`, so its selectors are available to the application rather than being scoped only to the dashboard route.

## 5. Authentication and access protection

**Status:** Implemented, with the existing Supabase flow preserved.

### Server-side dashboard protection

`app/dashboard/page.tsx` uses `createClient` from `lib/supabase/server.ts`. The server client is created with `createServerClient` from `@supabase/ssr` and reads/writes authentication cookies through `next/headers`.

The page checks the authenticated user on the server with `supabase.auth.getUser()`. If no user is returned, it redirects to the safe internal destination `/login?next=/dashboard`. The dashboard therefore does not rely only on client-side hiding.

### Session refresh

The root `proxy.ts` delegates to `updateSession` in `lib/supabase/proxy.ts`. That function creates a Supabase server client, forwards request cookies, calls `auth.getUser()`, and copies refreshed cookies to the response. This behavior remains separate from the dashboard page and was not changed for this documentation task.

### Existing authentication flows

- `/login` and `/signup` render the shared `components/auth/AuthForm` in the appropriate mode.
- `AuthForm` uses the Supabase browser client for password sign-in and sign-up.
- Sign-up stores the submitted full name in user metadata and requests email confirmation when no session is returned.
- `/forgot-password` and `/reset-password` are existing routes in the repository; their pages were included in the inspected route set.
- `/auth/callback/route.ts` exchanges the Supabase authorization code for a session.
- The callback validates `next` as a single-path internal URL by requiring it to start with `/` and not with `//`, otherwise it falls back to `/dashboard`.
- Sign-out uses the existing browser client flow described above.

No authentication client, callback route, proxy, cookie handling, or auth page was modified by this task.

## 6. Dashboard navigation and responsive behavior

### Sidebar navigation

**Status:** Partially implemented.

The sidebar contains:

- Overview — active link to `/dashboard`.
- Portfolio — disabled, marked “Soon.”
- Deposits — disabled, marked “Soon.”
- Transactions — disabled, marked “Soon.”
- Account Settings — disabled, marked “Soon.”
- Help & Support — disabled, marked “Soon.”
- Sign out — functional through the existing auth component.

Disabled destinations use non-link elements with `aria-disabled="true"`; they do not create misleading or broken routes.

### Header

**Status:** Implemented.

The header displays “Overview,” the “Private workspace” context label, and the authenticated user's display label and email. The dashboard page separately renders a welcome message. Display names are selected from `display_name`, `full_name`, or `name` in `user.user_metadata`; if none is available, neutral fallback text is used.

### Responsive behavior

**Status:** Implemented.

At viewport widths of 760px or less:

- The sidebar is fixed off-canvas and slides into view when opened.
- A compact menu button is displayed in the header.
- A close button is displayed inside the sidebar.
- A full-screen overlay closes the menu when clicked.
- The sidebar width is constrained to the viewport.
- Summary and content grids collapse to one column.
- Quick actions also collapse to one column.
- Header account details are compacted by hiding the secondary identity text.

The page uses flex and grid layouts and has no intended horizontal overflow from the dashboard structure.

## 7. Account summary cards and their current data sources

**Status:** Placeholder.

The three cards are rendered directly from static presentation data in `app/dashboard/page.tsx`:

1. **Total Balance** — value `—`; explains that a verified balance will appear later.
2. **Total Deposits** — value `—`; explains that deposit history is not available yet.
3. **Earned Profit** — value `—`; explains that verified performance data will appear later.

There are no Supabase table queries, API calls, calculations, APY values, return values, or transaction lookups supporting these cards. The displayed em dashes intentionally avoid representing fabricated account information.

Future financial cards must be backed by verified records, loaded through an authorized server-side data path, and calculated using a documented financial data model. Client-supplied user IDs must not be used as authorization evidence.

## 8. Portfolio and transaction-history states

### Portfolio overview

**Status:** Placeholder.

The “Portfolio overview” card displays a “Coming soon” badge and an empty state explaining that verified holdings and allocation details will appear when portfolio functionality becomes available. No assets, holdings, allocations, chart, performance history, or returns are shown.

### Recent activity

**Status:** Placeholder.

The “Recent activity” card displays a “Coming soon” badge and an empty state with the message that account activity will appear when verified transactions are available. No transaction records are created or displayed.

## 9. Quick actions and unavailable features

**Status:** Placeholder.

The quick-actions card contains three non-interactive items:

- View portfolio — Available soon.
- View transactions — Available soon.
- Account settings — Available soon.

There are no functional deposit or withdrawal actions. Deposit processing, withdrawals, investment execution, staking, trading, and financial calculations are not implemented by the dashboard.

The broader application architecture lists future portfolio, transaction, deposit, withdrawal, and settings routes, but those planned destinations should not be treated as implemented until their route and backend behavior exist.

## 10. Loading, empty, and error states

### Loading states

**Status:** Partially implemented.

Authentication and server rendering happen before the dashboard content is returned, but the dashboard has no dedicated loading UI or route-level `loading.tsx` file in the inspected implementation. The sign-in and sign-up form has a disabled submit state with “Please wait…” while an auth request is pending.

### Empty states

**Status:** Implemented for unavailable dashboard data.

Portfolio and activity use intentional empty-state messaging. Summary cards use an em dash and explanatory text rather than zero values that could imply a verified financial record.

### Error states

**Status:** Partially implemented.

The authentication callback redirects invalid links to `/auth/error?message=invalid-link`, and `AuthForm` provides generic sign-in/sign-up status messages. No dashboard-specific error boundary, data-fetch failure state, or financial data error state exists because the dashboard currently performs no financial data fetch.

## 11. Security and user-data protection

Current protections include:

- Server-side `getUser()` enforcement in the dashboard page.
- Supabase SSR cookies handled by the existing server client.
- Request session refresh through the existing proxy implementation.
- Publishable Supabase environment variables used by browser and server clients.
- No service-role key imported into dashboard UI code.
- Safe internal-path validation for the auth callback's `next` parameter.
- User email and display metadata taken from the authenticated Supabase user rather than from URL parameters or client-provided IDs.
- User metadata used only for presentation; it is not used as an authorization decision.
- No financial records, account identifiers, or sensitive secrets rendered by the current dashboard.

Future financial functionality must use server-enforced authorization, user-scoped queries or equivalent row-level security, parameterized data access, and verified ledger records. The financial ledger and database schema are intentionally not finalized by this task.

## 12. Accessibility considerations

Current implementation includes:

- Semantic `<aside>`, `<nav>`, `<header>`, `<main>`, `<section>`, and `<article>` elements.
- Navigation labels through `aria-label`.
- Screen-reader-only headings for the summary section.
- `aria-hidden` on decorative logo alt text and dashboard symbols.
- Accessible labels for the mobile open/close controls and overlay.
- Disabled navigation items marked with `aria-disabled="true"`.
- Visible focus styling defined in the shared dashboard stylesheet.
- Responsive controls that can be reached by keyboard as native buttons and links.

The logo in the dashboard shell is intentionally decorative because the adjacent “Boarvest” text identifies the brand. Future interactive menu items should retain visible focus indicators and provide accessible names for icons.

## 13. Planned improvements

The following are future work, not current dashboard capabilities:

1. Add real portfolio, transaction, deposit, and account-settings routes when their product and data contracts are approved.
2. Define a verified financial ledger and user-scoped database model before displaying financial values.
3. Add server-side data loaders with explicit authorization checks for every financial query.
4. Replace placeholder summary values with verified balance, deposit, and profit data only after the ledger is operational.
5. Add route-level loading, error, and retry states for dashboard data.
6. Make navigation links functional as each corresponding route is implemented.
7. Add tested profile/account settings behavior and a real support destination.
8. Add automated coverage for unauthenticated redirects, responsive navigation, sign-out, and authorization boundaries.
9. Review global dashboard stylesheet ownership and consider route-scoped styling if the application grows.
10. Keep the admin dashboard separate; it is not designed or implemented by this task.

## 14. Acceptance criteria

The current dashboard architecture is accurately documented when:

- `/dashboard` is identified as a protected server-rendered route.
- The server Supabase client and `getUser()` redirect behavior are described accurately.
- Existing proxy session refresh and auth callback behavior are distinguished from dashboard UI behavior.
- Implemented, partially implemented, placeholder, and planned features are clearly labeled.
- Navigation items that are not implemented are documented as disabled rather than active routes.
- Summary cards are documented as placeholders with no real financial data source.
- Portfolio and activity sections are documented as empty states with no fabricated records.
- Quick actions are documented as non-functional “Available soon” items.
- Future financial work is required to use verified data and server-enforced authorization.
- The admin dashboard, financial ledger, and database schema are explicitly outside this documentation task.
- No claim is made that investment, deposit, withdrawal, transaction, or profit functionality currently exists.
- The document reflects the inspected files and does not require application code changes.

## Review notes

Files inspected for this document included:

- `app/dashboard/page.tsx`
- `components/dashboard/DashboardShell.tsx`
- `app/dashboard/dashboard.css`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/proxy.ts`
- `proxy.ts`
- `components/auth/AuthForm.tsx`
- `components/auth/SignOutButton.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/auth/callback/route.ts`
- `app/layout.tsx`
- `package.json`
- `docs/architecture/APPLICATION.md`
- `docs/architecture/HOMEPAGE.md`
- `public/image/boarvest-logo.png`

No application code, dependency, database, authentication implementation, or configuration was changed. No dependency was added. Existing follow-up issues are the absence of functional financial routes/data sources, dashboard-specific loading/error states, and active settings/support destinations.

This documentation file was created on the current user-dashboard feature branch. No commit, push, or merge was performed.

## Status legend

- **Implemented:** behavior exists in the current repository.
- **Partially implemented:** supporting behavior exists, but the complete feature is not available.
- **Placeholder:** visual or structural UI exists without live business data or action.
- **Planned:** future work described by the architecture or follow-up notes.

All financial examples in this document are descriptions of labels and empty-state behavior, not account data.
