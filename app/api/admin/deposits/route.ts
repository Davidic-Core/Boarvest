import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/auth/admin";

export async function GET() {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const supabase = await createClient();
  const { data, error } = await supabase.from("deposit_requests").select("id, reference, user_id, asset, network, requested_usd, destination_wallet, status, created_at, reviewed_at, reviewed_by, review_note").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Deposits are unavailable." }, { status: 500 });
  return NextResponse.json({ deposits: data });
}
