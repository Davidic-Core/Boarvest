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
  if (error) return NextResponse.json({ error: error.message.includes("already reviewed") ? "This deposit has already been reviewed." : "The deposit review could not be completed." }, { status: 409 });
  return NextResponse.json({ deposit: data });
}
