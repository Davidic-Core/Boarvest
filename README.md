# Boarvest Development Roadmap

## 1. Overview

Boarvest is a cryptocurrency investment platform project focused
on providing an organized interface for digital-asset information,
portfolio visibility, and future investment-management features.

Development will proceed incrementally.

The initial priority is to establish a reliable public website
and development workflow before introducing authentication,
financial integrations, or real-money operations.

This roadmap describes the intended development phases. It does
not mean that planned features are already available.

## 2. Development Principles

Boarvest development will follow these principles:

- Build and review features incrementally.
- Keep the main branch stable.
- Use dev as the integration branch.
- Create feature branches from dev.
- Use pull requests to integrate feature work.
- Run automated checks before merging.
- Do not present planned features as operational.
- Avoid fabricated market data and unsupported financial claims.
- Do not introduce real financial operations before the required
  security, transaction, and compliance planning is complete.

## 3. Phase 1: Public Homepage

Status: In progress

Branch:

feat/public-homepage

### Objectives

Establish Boarvest's public identity and introduce the intended
purpose of the platform.

### Scope

- Public homepage layout.
- Boarvest branding and logo.
- Navigation.
- Hero section.
- About section.
- Planned platform features.
- Illustrative portfolio dashboard preview.
- How It Works section.
- Market overview section.
- Security and risk information.
- Frequently Asked Questions.
- Footer.

### Remaining Work

- Improve mobile navigation readability.
- Review mobile spacing and dashboard layout.
- Verify navigation links and interactive elements.
- Update the homepage architecture documentation.
- Run final quality checks.
- Review and merge the feature branch into dev.

### Completion Criteria

- The homepage is visually reviewed.
- Navigation is usable on mobile.
- Documentation matches the implementation.
- ESLint and the production build pass.
- The pull request into dev is approved according to the
  repository's review policy and required checks.

## 4. Phase 2: Development Workflow and Quality Gates

Status: Planned

### Objectives

Establish repeatable checks for future feature branches.

### Scope

- Add a GitHub Actions workflow.
- Run dependency installation in CI.
- Run ESLint.
- Run TypeScript checks.
- Run a production build.
- Configure appropriate required status checks for dev.
- Verify that failed checks prevent merging when configured
  as required.
- Document the pull-request workflow.

### Completion Criteria

- The workflow runs on pull requests targeting dev.
- The checks report their results in GitHub.
- Required checks are configured correctly.
- A test pull request demonstrates the intended workflow.

## 5. Phase 3: Authentication Interface

Status: Planned

### Objectives

Design the user-facing authentication experience.

### Potential Scope

- Login page.
- Registration page.
- Form validation and error states.
- Password visibility controls where appropriate.
- Responsive layouts.
- Accessible form labels and messages.
- Loading and failure states.

### Important Boundaries

The interface alone does not provide secure authentication.

Real account creation and login will require a separately reviewed
authentication implementation.

## 6. Phase 4: User Dashboard Interface

Status: Planned

### Objectives

Create the initial authenticated dashboard experience.

### Potential Scope

- Dashboard layout.
- Portfolio summary.
- Total balance display.
- Deposit and transaction summaries.
- Investment activity presentation.
- Account status indicators.
- Empty, loading, and error states.

### Important Boundaries

Until real account and financial services are implemented, any
sample dashboard data must be clearly identified as illustrative.

The interface must not imply that real balances or transactions
exist when they do not.

## 7. Phase 5: Application Backend and Data Architecture

Status: Planned

### Objectives

Plan and implement the backend foundations required for account
services and reliable data handling.

### Potential Scope

- Application architecture.
- Database selection and schema.
- Authentication and authorization.
- Account data ownership.
- Server-side validation.
- API design.
- Error handling and logging.
- Data protection and backup planning.
- Security review.

### Completion Criteria

The backend architecture must be reviewed before connecting
real user accounts or financial operations.

## 8. Phase 6: Market Data Integration

Status: Planned

### Objectives

Provide accurate cryptocurrency market information.

### Potential Scope

- Select a market-data provider.
- Integrate the provider through an appropriate server-side
  or otherwise secure architecture.
- Display supported assets and market information.
- Handle unavailable or stale data.
- Display timestamps and source information where appropriate.
- Apply request limits and error handling.

### Completion Criteria

Market information must be traceable to the chosen provider
and must not be presented as live when it is unavailable or stale.

## 9. Phase 7: Financial Operations and Ledger Design

Status: Not started

### Objectives

Determine whether and how Boarvest will support real financial
operations.

### Potential Scope

- Financial system architecture.
- Transaction ledger design.
- Deposit and withdrawal workflows.
- Transaction state management.
- Reconciliation.
- Authorization and audit trails.
- Failure recovery.
- Abuse prevention.
- Security assessment.
- Applicable legal and regulatory review.

### Important Boundaries

No real deposits, withdrawals, or investment operations should
be enabled until the required technical, security, operational,
and legal reviews have been completed.

A frontend balance or transaction record is not proof that
funds have been received or that a financial transaction occurred.

## 10. Phase 8: Administration and Operations

Status: Planned

### Objectives

Plan controlled administrative capabilities for operating
and maintaining the platform.

### Potential Scope

- Administrative authorization.
- User and account management.
- Operational monitoring.
- Audit logs.
- Incident handling.
- Appropriate access restrictions.
- Administrative action tracking.

Administrative access must be protected by server-side
authorization, not merely by hiding a page or navigation link.

## 11. Phase 9: Testing and Launch Readiness

Status: Planned

### Objectives

Review the platform before any public production release.

### Potential Scope

- Automated tests.
- Integration tests.
- End-to-end tests.
- Accessibility review.
- Responsive design review.
- Security testing.
- Dependency review.
- Performance checks.
- Backup and recovery planning.
- Monitoring and incident response.
- Privacy and legal-policy review.
- Production deployment verification.

### Completion Criteria

The application must meet its defined acceptance criteria,
and outstanding critical security or financial-integrity issues
must be resolved before launch.

## 12. Branching and Integration Strategy

The repository uses the following branch roles:

### main

The default branch and stable release branch.

### dev

The development integration branch.

### feat/*

Short-lived feature branches created from dev.

Feature work is integrated into dev through pull requests.

Required automated checks must pass before a protected branch
accepts a merge.

The process for promoting reviewed changes from dev to main
will be handled separately.

## 13. Roadmap Maintenance

This roadmap will be updated when development phases change.

A phase should not be marked complete until its acceptance
criteria have been reviewed.

Planned functionality must not be described as operational
in public-facing content.