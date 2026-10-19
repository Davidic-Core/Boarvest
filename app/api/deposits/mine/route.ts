import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { data, error } = await supabase.from("deposit_requests").select("id, reference, asset, network, requested_usd, estimated_token_amount, status, created_at, reviewed_at, review_note").eq("user_id", user.id).order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Transactions are unavailable." }, { status: 500 });
  return NextResponse.json({ deposits: data });
}
