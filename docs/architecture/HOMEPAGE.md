# Boarvest Homepage Architecture

## 1. Overview

Boarvest is a cryptocurrency investment platform project.

The public homepage will introduce the Boarvest brand, explain the
platform's intended features, and provide visitors with a clear
understanding of its purpose.

The initial release will focus on the frontend and public-facing
experience. Authentication, cryptocurrency wallet integration,
deposits, withdrawals, and investment operations are outside the
scope of the initial homepage.

This document defines the proposed architecture and implementation
plan for the public homepage.

## 2. Homepage Objectives

The homepage should:

- Establish a recognizable Boarvest brand identity.
- Introduce the platform and its intended capabilities.
- Provide clear navigation for visitors.
- Explain the intended user journey.
- Present planned features in an understandable way.
- Communicate cryptocurrency investment risks responsibly.
- Work well on mobile devices, tablets, and desktop screens.
- Provide a maintainable foundation for future development.

## 3. Design Direction

### Visual Identity

- Dark, premium crypto-finance aesthetic.
- Deep charcoal or near-black backgrounds.
- Emerald green as the primary accent.
- Warm gold as a secondary accent.
- White and muted grey typography.
- Subtle borders and carefully spaced cards.
- Modern, readable sans-serif typography.
- Distinctive Boarvest branding and boar-inspired imagery.

### Design Principles

- Mobile-first responsive design.
- Clear visual hierarchy.
- Consistent spacing and typography.
- Accessible colour contrast.
- Simple, purposeful animations.
- Minimal unnecessary visual clutter.
- Reusable design patterns.

The interface should feel professional and distinctive rather than
resembling a generic cryptocurrency template.

## 4. Homepage Sections

### 4.1 Navigation

Responsibilities:

- Display the Boarvest brand and logo.
- Provide navigation to homepage sections.
- Provide Login and Sign Up entry points when appropriate.
- Support a responsive mobile navigation menu.
- Maintain consistent styling across screen sizes.

Navigation items:

- Home
- About
- Features
- How It Works
- FAQ
- Login
- Sign Up

Navigation links should point to valid sections or existing routes.
Authentication routes must not be presented as functional until
authentication has been implemented.

### 4.2 Hero Section

Responsibilities:

- Communicate the purpose of Boarvest.
- Introduce the platform using concise copy.
- Present a primary call to action.
- Provide a secondary navigation action.
- Establish the visual identity through branding or illustration.

Proposed headline:

"Your Crypto Journey Starts with Boarvest."

The supporting copy should explain the platform without promising
profits or implying that unavailable features are operational.

### 4.3 Platform Features

Introduce the platform's planned capabilities.

Initial feature cards:

- Portfolio Overview
- Transaction Tracking
- Account Management

Each card should explain its intended purpose.

Features that have not been implemented must be presented as planned
capabilities rather than existing services.

### 4.4 How It Works

Explain the intended user journey in simple steps:

1. Create an account when registration becomes available.
2. Explore the platform and its supported features.
3. Monitor supported account and financial activity.

The section must not imply that registration, deposits, or investment
operations are available before they have been implemented.

### 4.5 Cryptocurrency Market Overview

Reserve a section for cryptocurrency market information.

Potential assets include:

- Bitcoin (BTC)
- Ethereum (ETH)
- Solana (SOL)
- BNB

Initial implementation requirements:

- Do not present invented prices as live market data.
- Use clearly labelled illustrative data if sample figures are needed.
- Otherwise, display a non-numeric market overview.
- Introduce a market-data provider only when live data is required.

### 4.6 Security and Risk Information

Explain the importance of security, transparency, and responsible
participation in cryptocurrency markets.

The content must not claim that Boarvest has completed security audits,
insured funds, guaranteed returns, or other independently verifiable
protections unless evidence supports those claims.

### 4.7 Frequently Asked Questions

Provide answers to common questions about:

- What Boarvest is.
- The platform's intended purpose.
- Planned features.
- Cryptocurrency investment risks.
- Account access when registration becomes available.

Answers must reflect the platform's actual capabilities and status.

### 4.8 Footer

The footer should contain the Boarvest brand and relevant navigation.

Potential links:

- About
- Features
- FAQ
- Contact
- Privacy Policy
- Terms of Service
- Risk Disclosure

Policy pages should not be presented as completed documents until
their content has been prepared and reviewed.

## 5. Component Architecture

The homepage will use reusable React components.

Proposed components:

### Layout Components

- Navbar
- Footer

### Homepage Components

- HeroSection
- FeaturesSection
- HowItWorksSection
- MarketOverviewSection
- SecuritySection
- FAQSection

The root homepage should primarily compose these components rather
than contain every section's markup in one large file.

Components should be introduced as they become necessary. We should
avoid creating empty placeholder components without a clear purpose.

## 6. Proposed File Structure

The following structure is a starting proposal. It will be adjusted
to match the Next.js starter and implementation requirements.

app/
  layout.tsx
  page.tsx
  globals.css
  favicon.ico

components/
  layout/
    Navbar.tsx
    Footer.tsx
  home/
    HeroSection.tsx
    FeaturesSection.tsx
    HowItWorksSection.tsx
    MarketOverviewSection.tsx
    SecuritySection.tsx
    FAQSection.tsx

public/
  images and other static assets

docs/
  ROADMAP.md
  architecture/
    HOMEPAGE.md

Configuration files:

- package.json
- tsconfig.json
- next.config.ts
- eslint.config.mjs
- .gitignore
- LICENSE
- README.md

The actual generated files and configuration may differ slightly
depending on the selected Next.js version.

## 7. Technology Stack

The initial application will use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- npm

Next.js App Router will manage the application's routes and layouts.

Server Components should be preferred for static homepage sections.
Client Components should be introduced only where browser-side
interactivity is required.

Additional dependencies should be added only when they provide a
clear benefit.

## 8. Responsive Design and Accessibility

The homepage must support:

- Mobile phones
- Tablets
- Desktop screens

Requirements:

- Use responsive layouts and typography.
- Prevent horizontal overflow on narrow screens.
- Use semantic HTML elements.
- Provide accessible names for interactive controls.
- Ensure keyboard accessibility for navigation.
- Provide appropriate alternative text for meaningful images.
- Maintain sufficient text and control contrast.
- Respect reduced-motion preferences when animations are used.

## 9. Security and Financial Integrity

The initial homepage is a presentation layer only.

It must not implement or simulate real financial transactions.

Requirements:

- Do not collect wallet seed phrases or private keys.
- Do not expose API keys or secrets in client-side code.
- Do not claim that deposits or withdrawals are operational.
- Do not promise guaranteed investment returns.
- Do not represent sample balances as real customer funds.
- Do not present fabricated market prices as live data.

Future financial functionality will require a separate architecture
covering authentication, authorization, transaction integrity,
data protection, and applicable regulatory requirements.

## 10. Testing and Quality Assurance

Before the homepage is considered ready for review:

- Inspect the homepage on mobile and desktop layouts.
- Check navigation links and interactive elements.
- Verify that the layout has no unintended horizontal overflow.
- Review accessibility and semantic HTML.
- Run ESLint.
- Run the production build.
- Review all changes before committing.
- Verify that no secrets have been committed.

## 11. Implementation Sequence

The proposed implementation order is:

1. Review and initialize the Next.js application.
2. Establish global styles and design tokens.
3. Configure the root layout and metadata.
4. Implement the navigation.
5. Implement the hero section.
6. Implement the features section.
7. Implement the How It Works section.
8. Implement the market overview.
9. Implement security and risk information.
10. Implement the FAQ and footer.
11. Test and review the complete homepage.
12. Update this document to reflect the actual implementation.

## 12. Git Workflow

Homepage development will take place on:

feat/public-homepage

The feature branch is based on dev.

Documentation and implementation for this homepage will remain
together on the feature branch.

Before merging:

- Review the changes.
- Run the required checks.
- Verify the documentation.
- Open a pull request into dev.

Do not merge directly into main.

## 13. Acceptance Criteria

The initial homepage is ready for review when:

- All agreed homepage sections are implemented.
- The layout works on mobile and desktop.
- Components are organized and maintainable.
- Navigation behaves as intended.
- Content does not misrepresent unavailable functionality.
- Cryptocurrency risk information is appropriately presented.
- ESLint passes.
- The production build succeeds.
- The implementation is reviewed before merging.