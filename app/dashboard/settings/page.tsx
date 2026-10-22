import { connection } from "next/server";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

function SettingSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="dashboard-card settings-section">
      <div className="settings-section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="dashboard-badge">Coming soon</span>
      </div>
      <div className="settings-section-content">{children}</div>
    </section>
  );
}

export default async function SettingsPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/settings");
  if (await getCurrentAdmin()) redirect("/admin");

  const metadata = user.user_metadata as { display_name?: unknown; full_name?: unknown; name?: unknown } | undefined;
  const displayName = [metadata?.display_name, metadata?.full_name, metadata?.name]
    .find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim() ?? null;

  return (
    <DashboardShell userEmail={user.email ?? "Authenticated account"} displayName={displayName}>
      <div className="settings-page">
        <header className="settings-intro">
          <span className="dashboard-eyebrow">Private workspace</span>
          <h2>SETTINGS</h2>
          <p>Manage your personal information and account security.</p>
        </header>
        <div className="settings-grid">
          <SettingSection title="Profile Information" description="Review the personal information associated with your account.">
            <div className="settings-detail-grid">
              <div><span>Full name</span><strong>{displayName ?? "Not provided"}</strong></div>
              <div><span>Email address</span><strong>{user.email ?? "Not provided"}</strong></div>
              <div><span>Account ID</span><strong className="settings-value-mono">{user.id}</strong></div>
            </div>
          </SettingSection>
          <SettingSection title="Security" description="Password and session controls will be available here.">
            <p className="settings-placeholder-copy">Security management is prepared for a future phase. Your existing authentication and sign-out behavior remain unchanged.</p>
          </SettingSection>
          <SettingSection title="Account Preferences" description="Choose how supported account information will be displayed.">
            <div className="settings-preference-row"><span>Display currency</span><strong>USD — US Dollar</strong></div>
            <p className="settings-placeholder-copy">Currency selection and persistence will be added in a future phase.</p>
          </SettingSection>
        </div>
      </div>
    </DashboardShell>
  );
}
