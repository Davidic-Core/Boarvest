#!/usr/bin/env bash
set -euo pipefail

if [[ "${BOARVEST_LOCAL_SUPABASE_CONFIRM:-}" != "yes" ]]; then
  printf '%s\n' 'Refusing to run: set BOARVEST_LOCAL_SUPABASE_CONFIRM=yes for the disposable local Supabase stack.' >&2
  exit 2
fi

if ! command -v supabase >/dev/null 2>&1; then
  printf '%s\n' 'Supabase CLI is required but was not found.' >&2
  exit 127
fi
if ! command -v docker >/dev/null 2>&1; then
  printf '%s\n' 'Docker is required but was not found.' >&2
  exit 127
fi

if [[ -n "${SUPABASE_PROJECT_REF:-}" || -n "${SUPABASE_ACCESS_TOKEN:-}" || -n "${SUPABASE_DB_PASSWORD:-}" ]]; then
  printf '%s\n' 'Refusing to run with remote Supabase credentials in the environment.' >&2
  exit 2
fi

supabase start
supabase db reset --local
supabase db execute --local --file supabase/tests/deposit-accounting.sql
