import { NextResponse } from "next/server";

const ids = "solana,ethereum,binancecoin";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 55 } },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Market prices are temporarily unavailable." }, { status: response.status === 429 ? 429 : 502 });
    }

    const data = await response.json();
    return NextResponse.json({
      prices: { SOL: data.solana?.usd ?? null, ETH: data.ethereum?.usd ?? null, BNB: data.binancecoin?.usd ?? null },
      updatedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "public, s-maxage=55, stale-while-revalidate=120" } });
  } catch {
    return NextResponse.json({ error: "Market prices are temporarily unavailable." }, { status: 503 });
  }
}
