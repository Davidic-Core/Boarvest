"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function SignOutButton() { const router = useRouter(); return <button className="button button-primary mx-auto mt-8" onClick={async () => { await createClient().auth.signOut(); router.replace("/login"); router.refresh(); }}>Sign out</button>; }
