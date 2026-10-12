# Boarvest Application Architecture

## 1. Purpose

This document defines the planned structure and responsibilities of the Boarvest application.

Boarvest will have four principal areas:

1. Public website
2. Authentication pages
3. User dashboard
4. Administrative panel

Authentication, database operations, deposit verification, withdrawals, and referral commissions will be implemented in planned phases.

The architecture will evolve as the project develops. Components and backend modules should be introduced when their responsibilities are clear.

## 2. Application Route Structure

The following is the intended route structure. Routes will be created as the corresponding development phases begin.

```text
app/
├── layout.tsx
├── globals.css
├── page.tsx
│
├── about/
│   └── page.tsx
│
├── login/
│   └── page.tsx
│
├── signup/
│   └── page.tsx
│
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── transactions/
│   │   └── page.tsx
│   ├── deposits/
│   │   └── page.tsx
│   ├── withdrawals/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
└── admin/
    ├── layout.tsx
    └── page.tsx