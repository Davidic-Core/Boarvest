import { NextResponse } from "next/server";

import { getCurrentAdmin } from "@/lib/auth/admin";

export async function POST() {
  const admin = await getCurrentAdmin();

  return NextResponse.json({ destination: admin ? "/admin" : "/dashboard" });
}
