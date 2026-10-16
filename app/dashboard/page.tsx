import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const instant = false;

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="dashboard-empty-state"><div className="dashboard-empty-icon" aria-hidden="true">◌</div><h3>{title}</h3><p>{description}</p></div>;
}

export default async function DashboardPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const metadata = user.user_metadata as { display_name?: unknown; full_name?: unknown; name?: unknown } | undefined;
  const displayName = [metadata?.display_name, metadata?.full_name, metadata?.name].find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim() ?? null;
  const greeting = displayName ? `Welcome back, ${displayName}.` : "Welcome to your private workspace.";

  return <DashboardShell userEmail={user.email ?? "Authenticated account"} displayName={displayName}>
    <section className="dashboard-welcome"><div><span className="dashboard-eyebrow">Account overview</span><h2>{greeting}</h2><p>Keep an eye on your Boarvest account from one clear, secure workspace.</p></div><div className="dashboard-status"><span className="dashboard-status-dot" /> Account active</div></section>
    <section aria-labelledby="summary-heading"><div className="sr-only"><h2 id="summary-heading">Account summary</h2></div><div className="dashboard-summary-grid">
      {[["Total Balance", "—", "Your verified balance will appear here."], ["Total Deposits", "—", "Deposit history is not available yet."], ["Earned Profit", "—", "Verified performance data will appear here."]].map(([label, value, note]) => <article className="dashboard-card dashboard-summary-card" key={label}><div className="dashboard-card-top"><span className="dashboard-card-label">{label}</span><span className="dashboard-card-icon" aria-hidden="true">{label === "Total Balance" ? "◈" : label === "Total Deposits" ? "↓" : "↗"}</span></div><strong className="dashboard-summary-value">{value}</strong><p>{note}</p></article>)}
    </div></section>
    <div className="dashboard-section-grid"><section className="dashboard-card" aria-labelledby="portfolio-heading"><div className="dashboard-section-heading"><div><span className="dashboard-card-label">Your holdings</span><h2 id="portfolio-heading">Portfolio overview</h2></div><span className="dashboard-badge">Coming soon</span></div><EmptyState title="Your portfolio is taking shape" description="Once portfolio functionality is available, your verified holdings and allocation details will appear here." /></section><section className="dashboard-card" aria-labelledby="activity-heading"><div className="dashboard-section-heading"><div><span className="dashboard-card-label">Account history</span><h2 id="activity-heading">Recent activity</h2></div><span className="dashboard-badge">Coming soon</span></div><EmptyState title="No transactions yet" description="Your account activity will appear here when verified transactions are available." /></section></div>
    <section className="dashboard-card dashboard-actions" aria-labelledby="actions-heading"><div className="dashboard-section-heading"><div><span className="dashboard-card-label">Shortcuts</span><h2 id="actions-heading">Quick actions</h2></div></div><div className="dashboard-action-grid"><span className="dashboard-action-item"><span>◒</span><strong>View portfolio</strong><small>Available soon</small></span><span className="dashboard-action-item"><span>≡</span><strong>View transactions</strong><small>Available soon</small></span><span className="dashboard-action-item"><span>⚙</span><strong>Account settings</strong><small>Available soon</small></span></div></section>
  </DashboardShell>;
}
