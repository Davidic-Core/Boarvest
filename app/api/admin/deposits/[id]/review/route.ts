import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/auth/admin";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const { id } = await params;
  let body: { decision?: unknown; note?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (body.decision !== "approved" && body.decision !== "declined") return NextResponse.json({ error: "Invalid review decision." }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("review_deposit_request", { p_deposit_id: id, p_decision: body.decision, p_review_note: typeof body.note === "string" ? body.note : null });
  if (error) {
    console.error("[v0] deposit review failed", { code: error.code, message: error.message, details: error.details, hint: error.hint });
    const missingFunction = error.code === "42883" || error.code === "PGRST202";
    const migrationRequired = missingFunction || error.code === "42P01";
    return NextResponse.json({ error: migrationRequired ? "Deposit approval is not enabled yet. The Supabase deposit migration must be applied." : error.message.includes("already reviewed") || error.message.includes("reviewed concurrently") ? "This deposit has already been reviewed." : error.message.includes("not authorized") ? "You are not authorized to review deposits." : "The deposit review could not be completed." }, { status: migrationRequired ? 503 : error.message.includes("not authorized") ? 403 : 409 });
  }
  return NextResponse.json({ deposit: data });
}
