import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getCurrentAdmin } from "@/lib/auth/admin";

export async function GET() {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });

  const supabase = await createClient();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  const dataClient = serviceKey ? createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }) : supabase;
  const { data, error } = await dataClient
    .from("deposit_requests")
    .select("id, reference, user_id, asset, network, requested_usd, estimated_token_amount, destination_wallet, status, created_at, reviewed_at, reviewed_by, review_note")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[v0] admin deposit lookup failed", { code: error.code, message: error.message, details: error.details, hint: error.hint });
    const missingTable = error.code === "42P01" || error.code === "PGRST205";
    return NextResponse.json({ error: missingTable ? "Deposit requests are not enabled yet. The Supabase deposit migration must be applied." : "Deposits are unavailable. Please try again." }, { status: missingTable ? 503 : 500 });
  }

  const deposits = data ?? [];
  let totalUsers = new Set(deposits.map((deposit) => deposit.user_id)).size;

  if (serviceKey) {
    const adminClient = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: users, error: usersError } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (!usersError && users) totalUsers = users.users.length;
  }

  const counts = {
    pending: deposits.filter((deposit) => deposit.status === "pending").length,
    approved: deposits.filter((deposit) => deposit.status === "approved").length,
    declined: deposits.filter((deposit) => deposit.status === "declined").length,
    totalUsers,
  };

  return NextResponse.json({ deposits, counts, updatedAt: new Date().toISOString() });
}
