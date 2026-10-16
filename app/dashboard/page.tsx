import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/auth/SignOutButton";

export const instant = false;

export default async function DashboardPage() { await connection(); const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/login?next=/dashboard"); return <main className="flex min-h-screen items-center justify-center bg-[#080d0b] px-4"><section className="w-full max-w-xl rounded-3xl border border-white/[0.1] bg-[#0d1511] p-8 text-center"><h1 className="text-3xl font-black text-white">Welcome to Boarvest</h1><p className="mt-3 text-gray-400">Your private dashboard is ready for the next phase of development.</p><p className="mt-4 text-sm text-gray-500">Signed in as {user.email}</p><SignOutButton /></section></main>; }
