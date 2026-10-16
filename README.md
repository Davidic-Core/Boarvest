# Boarvest

Boarvest is an early-stage cryptocurrency investment platform project. The repository currently focuses on the public site and a Supabase-backed authentication experience with a protected user dashboard shell. Financial operations are not live: deposits, withdrawals, blockchain monitoring, portfolio accounting, transaction history, and administration remain planned work.

## Project Overview

The current application provides:

- A public Boarvest homepage.
- Supabase email/password signup and login flows.
- Email-confirmation callback handling and password-reset routes.
- A server-protected `/dashboard` route with responsive navigation.
- Clearly labeled empty and placeholder states for future account data.

The project does not currently process real deposits or withdrawals, display verified balances, monitor blockchains, or provide an admin dashboard.

## Key Features

### Available in the current repository

- Responsive public homepage and branding.
- Supabase browser and server clients using SSR cookies.
- Session refresh through the Next.js `proxy.ts` integration.
- Authenticated user dashboard access control.
- Sign-in, sign-up, sign-out, email confirmation callback, and password-reset UI.

### Planned

- Verified portfolio and transaction data.
- Deposit and withdrawal workflows backed by an auditable ledger.
- A secure single-administrator dashboard.
- Notifications, reconciliation, and operational audit logs.

Planned features are not production-ready until their backend, security, testing, and operational requirements are implemented.

## Installation and Setup

### Prerequisites

- Node.js compatible with the repository's Next.js 16 setup.
- npm.
- A Supabase project configured for the authentication flow.

### Install and run

```bash
git clone https://github.com/Snr-Dave/Boarvest.git
cd Boarvest
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The commands match the repository's `package.json`, which defines `npm run dev` as `next dev`.

## Usage

Use the public homepage to navigate to the authentication pages. After a successful sign-in, the current application redirects to `/dashboard`. The dashboard requires a Supabase-authenticated user and currently shows placeholders rather than live financial information.

## Configuration

Copy `.env.example` to `.env.local` and provide values for:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL used by the browser and server clients. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key used by the browser and server clients. |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Local development email-confirmation redirect, normally `http://localhost:3000/auth/callback`. |

Do not commit `.env.local` or secret values. No server-side financial or admin environment variables are currently documented because those features have not been implemented.

## Documentation

- [User Dashboard Architecture](docs/architecture/USER-DASHBOARD.md)
- [Admin Dashboard Architecture](docs/architecture/ADMIN-DASHBOARD.md)
- [Backend and Financial Data Architecture](docs/architecture/BACKEND-AND-FINANCIAL-DATA.md)
- [Application Architecture](docs/architecture/APPLICATION.md)
- [Homepage Architecture](docs/architecture/HOMEPAGE.md)
- [Development Roadmap](docs/ROADMAP.md)

The architecture documents distinguish inspected implementation from proposed functionality; they are not evidence that planned financial features are available.

## License

Boarvest is distributed under the [MIT License](LICENSE).
