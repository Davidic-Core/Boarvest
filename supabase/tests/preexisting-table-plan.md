# Pre-existing table compatibility test plan

This plan is intentionally separate from the empty-database test and must not run against a persistent or remote database.

1. Create a disposable local database and apply only the admin-membership migration.
2. Before the deposit migration, create a deliberately incompatible `public.deposit_requests` table missing `network`, `reviewed_by`, and the expected constraints.
3. Run the deposit migration and record the first failing statement and PostgreSQL error.
4. Destroy the disposable database; do not repair the migration or retry destructive SQL automatically.
5. Repeat with a compatible table that lacks only named constraints, verifying whether the guarded `ALTER TABLE ... ADD CONSTRAINT` blocks restore the intended invariants.
6. Repeat with an existing `account_ledger` table containing conflicting column types and verify that migration failure is reported.
7. Compare the resulting catalog against the empty-database baseline. Any drift requires a human decision before migration changes are considered.

Expected outcome: incompatible pre-existing schemas fail closed or are clearly reported; no existing persistent schema is altered.
