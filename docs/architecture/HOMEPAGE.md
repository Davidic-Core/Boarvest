# Boarvest Homepage Architecture

## 1. Overview

Boarvest is a cryptocurrency investment platform project.

The public homepage introduces the Boarvest brand, explains its
intended capabilities, and provides visitors with an overview of
the platform.

The initial release focuses on the frontend and public-facing
experience. Authentication, wallet integration, deposits,
withdrawals, and investment operations are outside the scope of
the current homepage implementation.

This document describes the homepage architecture, implemented
components, design direction, and remaining review requirements.

## 2. Homepage Objectives

The homepage aims to:

- Establish the Boarvest brand identity.
- Explain the platform's intended purpose.
- Introduce planned platform capabilities.
- Provide clear navigation between homepage sections.
- Present an illustrative portfolio dashboard.
- Communicate cryptocurrency risks responsibly.
- Support mobile, tablet, and desktop layouts.
- Establish a maintainable foundation for future development.

## 3. Design Direction

### Visual Identity

The homepage uses the following design direction:

- Dark charcoal and near-black backgrounds.
- Emerald green as the primary accent.
- Warm gold as a secondary accent.
- White and muted-grey typography.
- Dark cards with subtle borders.
- Modern sans-serif typography.
- Boarvest branding and boar-inspired imagery.

### Design Principles

The interface should prioritize:

- Mobile-first responsive design.
- Clear visual hierarchy.
- Consistent spacing and typography.
- Accessible colour contrast.
- Purposeful animations.
- Minimal unnecessary visual clutter.
- Reusable components.

The design should remain distinctive and professional without
misrepresenting the platform's current capabilities.

## 4. Homepage Sections

### 4.1 Navigation

The navigation displays the Boarvest brand and provides access
to the homepage sections.

Navigation destinations include:

- About
- Features
- How It Works
- Markets
- FAQ

The navigation should adapt to the available screen width.

On smaller screens, links must remain readable and easy to tap.
A compact mobile menu should be used when the full navigation
cannot fit comfortably.

Authentication routes must not be presented as operational until
authentication has been implemented.

### 4.2 Hero Section

The hero introduces Boarvest and communicates its intended purpose.

It includes:

- A short introductory statement.
- The main Boarvest headline.
- Supporting descriptive text.
- A primary call to action.
- A secondary navigation action.
- Investor-focused supporting statements.

The hero must not promise profits or imply that unavailable
financial services are operational.

### 4.3 Portfolio Dashboard Preview

The homepage includes an illustrative dashboard preview.

It introduces concepts such as:

- Total Portfolio Value.
- Your Balance.
- Total Deposits.
- Investment Activity.
- A portfolio chart.
- Account connection status.

The preview is for presentation purposes only.

It must not imply that real customer accounts, balances,
transactions, deposits, or investment performance are available.

Any illustrative data or chart must be clearly identified as
a concept preview.

### 4.4 About Section

The About section explains the purpose and intended direction
of Boarvest.

It introduces the platform as a developing digital-asset and
cryptocurrency investment management experience.

The section must distinguish the project's goals from features
that have not yet been implemented.

### 4.5 Features Section

The Features section introduces planned platform capabilities,
including:

- Portfolio Overview.
- Transaction Tracking.
- Account Management.

Descriptions must accurately represent the status of each feature.

Planned capabilities must not be presented as operational services.

### 4.6 How It Works

This section explains the intended user journey.

It may describe future account creation, platform exploration,
and viewing supported account information.

The content must clearly distinguish future functionality from
services currently available.

### 4.7 Cryptocurrency Market Overview

The market section provides a place for future cryptocurrency
market information.

Potential assets include:

- Bitcoin (BTC).
- Ethereum (ETH).
- Solana (SOL).
- BNB.

The homepage must not present fabricated prices as live market data.

Live market information will require an appropriate data provider
and a separate integration.

### 4.8 Security and Risk Information

The homepage should communicate cryptocurrency risks and the
importance of responsible participation in digital-asset markets.

It must not claim that Boarvest has completed security audits,
insured customer funds, guaranteed returns, or obtained regulatory
approvals unless those claims have been independently verified.

### 4.9 Frequently Asked Questions

The FAQ should answer questions about:

- What Boarvest is.
- Its intended purpose.
- Planned platform features.
- Cryptocurrency risks.
- Account access and future availability.

Answers must reflect the actual status of the project.

### 4.10 Footer

The footer contains the Boarvest brand and relevant navigation.

Contact details and legal-policy links should only be included
when the appropriate information and documents are available.

## 5. Component Architecture

The current landing-page components are located in:

components/landing/

The component files include:

- Navbar.tsx
- HeroSection.tsx
- AboutSection.tsx
- FeaturesSection.tsx

The homepage is composed in:

app/page.tsx

The homepage file currently brings together the landing-page
components and the remaining homepage sections.

Additional sections may be extracted into separate components
when doing so improves readability and maintainability.

Components should be introduced when they have a clear purpose.
Empty placeholder components should be avoided.

## 6. Project Structure

The relevant application structure is:

app/
  layout.tsx
  page.tsx
  globals.css

components/
  landing/
    Navbar.tsx
    HeroSection.tsx
    AboutSection.tsx
    FeaturesSection.tsx

public/
  image/
    boarvest-logo.png

docs/
  ROADMAP.md
  architecture/
    HOMEPAGE.md

.github/
  workflows/
    ci.yml

The workflow file is planned for the development branch and
will be added when the continuous-integration setup is prepared.

Other configuration files include:

- package.json
- package-lock.json
- tsconfig.json
- next.config.ts
- eslint.config.mjs
- .gitignore

The exact structure should be kept consistent with the actual
repository.

## 7. Technology Stack

The application uses:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- ESLint.
- npm.

Next.js App Router manages the application's routes and layouts.

Server Components should be preferred for static homepage content.
Client Components should be introduced when browser-side
interactivity requires them.

Additional dependencies should only be added when they provide
a clear benefit.

## 8. Responsive Design and Accessibility

The homepage should support mobile phones, tablets, and desktops.

Requirements include:

- Responsive layouts and typography.
- No unintended horizontal overflow.
- Readable navigation at narrow screen widths.
- Sufficient spacing between interactive elements.
- Semantic HTML.
- Accessible names for interactive controls.
- Keyboard-accessible navigation.
- Appropriate alternative text for meaningful images.
- Sufficient text and control contrast.
- Respect for reduced-motion preferences when animations are used.

Mobile navigation and spacing remain part of the visual review.

## 9. Security and Financial Integrity

The homepage is a presentation layer.

It must not implement or simulate real financial transactions.

Requirements:

- Do not collect wallet seed phrases or private keys.
- Do not expose API keys or secrets in client-side code.
- Do not claim that deposits or withdrawals are operational.
- Do not promise guaranteed investment returns.
- Do not represent sample balances as real customer funds.
- Do not present fabricated market prices as live data.

Future financial functionality will require separate planning
for authentication, authorization, transaction integrity,
data protection, and applicable regulatory requirements.

## 10. Testing and Quality Assurance

The homepage has previously passed ESLint and a production build
using the Termux-compatible Webpack command.

Further review is required after the remaining visual changes.

The review process includes:

- Inspecting the homepage in Brave on a mobile device.
- Checking navigation links and interactive elements.
- Reviewing narrow and wider screen layouts.
- Checking for unintended horizontal overflow.
- Reviewing accessibility and semantic HTML.
- Running ESLint.
- Running a production build.
- Reviewing the final Git diff.
- Confirming that no secrets have been committed.

A successful build does not replace visual and functional review.

## 11. Implementation Status

### Implemented

- Public homepage structure.
- Boarvest branding and logo integration.
- Navigation component.
- Hero section.
- About section.
- Features component.
- Illustrative portfolio dashboard preview.
- Additional homepage sections composed in app/page.tsx.
- ESLint and production-build checks passed previously.

### Remaining Review

- Improve mobile navigation readability and spacing.
- Review hero spacing and call-to-action layout.
- Review dashboard preview spacing on mobile.
- Recheck navigation and interactive elements.
- Update this document after the final visual review.
- Run ESLint and the production build after final changes.
- Review the pull request before merging into dev.

### Planned for Later Development

- Authentication.
- Wallet integration.
- Live market-data integration.
- Deposits and withdrawals.
- Real financial operations.
- Account data and transaction history.

## 12. Git Workflow

Homepage development takes place on:

feat/public-homepage

The feature branch is intended to merge into dev through a
pull request.

Future feature branches should be created from dev.

Before merging:

- Review the implementation.
- Verify the documentation.
- Run the required quality checks.
- Confirm the required GitHub Actions checks pass.
- Complete any required review.

Feature branches must not be merged directly into main.

## 13. Acceptance Criteria

The homepage is ready for integration review when:

- The agreed homepage sections are present.
- The architecture document matches the implementation.
- Navigation is readable and usable on mobile.
- The layout works at narrow and wider screen sizes.
- No unintended horizontal overflow is present.
- Content accurately represents the platform's status.
- No unsupported financial claims or fabricated live data are shown.
- ESLint passes.
- The production build succeeds.
- The final changes have been reviewed.
- Required GitHub Actions checks pass before merging into dev.