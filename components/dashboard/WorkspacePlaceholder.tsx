import { connection } from "next/server";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspacePlaceholder({ title, description }: { title: string; description: string }) {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/dashboard/${title.toLowerCase().replaceAll(" ", "-")}`);
  if (await getCurrentAdmin()) redirect("/admin");
  const metadata = user.user_metadata as { display_name?: unknown; full_name?: unknown; name?: unknown } | undefined;
  const displayName = [metadata?.display_name, metadata?.full_name, metadata?.name].find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim() ?? null;
  return <DashboardShell userEmail={user.email ?? "Authenticated account"} displayName={displayName}><section className="dashboard-card dashboard-placeholder"><span className="dashboard-eyebrow">Private workspace</span><h2>{title}</h2><p>{description}</p><span className="dashboard-badge">Not available yet</span></section></DashboardShell>;
}
