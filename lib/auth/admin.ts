import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function isAdmin(userId: string) {
  const supabase = await createClient();
  const { data: membership, error } = await supabase
    .from("admin_memberships")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return !error && Boolean(membership);
}
