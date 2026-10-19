import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEPOSIT_ASSETS, isDepositAsset } from "@/lib/deposits/config";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let body: { asset?: unknown; network?: unknown; amount?: unknown; estimatedTokenAmount?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (!isDepositAsset(body.asset)) return NextResponse.json({ error: "Unsupported asset." }, { status: 400 });
  const asset = DEPOSIT_ASSETS[body.asset];
  if (body.network !== asset.network) return NextResponse.json({ error: "Asset and network do not match." }, { status: 400 });
  const amount = typeof body.amount === "number" ? body.amount : Number(body.amount);
  if (!Number.isFinite(amount) || amount < 10 || amount > 5000) return NextResponse.json({ error: "Deposit amount must be between $10 and $5,000." }, { status: 400 });
  const estimate = body.estimatedTokenAmount == null ? null : Number(body.estimatedTokenAmount);
  if (estimate !== null && (!Number.isFinite(estimate) || estimate <= 0)) return NextResponse.json({ error: "Invalid token estimate." }, { status: 400 });

  const { data, error } = await supabase.from("deposit_requests").insert({
    user_id: user.id,
    asset: body.asset,
    network: asset.network,
    requested_usd: amount,
    estimated_token_amount: estimate,
    destination_wallet: asset.wallet,
    status: "pending",
  }).select("id, reference, status, created_at").single();
  if (error) {
    console.error("[v0] deposit creation failed", error.code);
    return NextResponse.json({ error: "The deposit request could not be saved." }, { status: 500 });
  }
  return NextResponse.json({ deposit: data }, { status: 201 });
}
