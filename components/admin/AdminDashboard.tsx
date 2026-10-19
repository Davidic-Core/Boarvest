"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/auth/SignOutButton";

type Section =
  | "Overview"
  | "Users"
  | "Deposits"
  | "Withdrawals"
  | "Transactions"
  | "Notifications"
  | "Audit Log"
  | "Settings";

const navigation: { label: Section; icon: string }[] = [
  { label: "Overview", icon: "◈" },
  { label: "Users", icon: "◌" },
  { label: "Deposits", icon: "↓" },
  { label: "Withdrawals", icon: "↑" },
  { label: "Transactions", icon: "≡" },
  { label: "Notifications", icon: "○" },
  { label: "Audit Log", icon: "⌁" },
  { label: "Settings", icon: "⚙" },
];

const summaryCards = [
  { label: "Total Users", note: "Registered accounts", icon: "◌" },
  { label: "Pending Deposits", note: "Awaiting review", icon: "↓" },
  { label: "Approved Deposits", note: "Approved records", icon: "✓" },
  { label: "Pending Withdrawals", note: "Awaiting review", icon: "↑" },
  { label: "Approved Withdrawals", note: "Approved records", icon: "✓" },
  { label: "Completed Withdrawals", note: "Completed records", icon: "↗" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("Overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deposits, setDeposits] = useState<Array<{ id: string; reference: string; user_id: string; asset: string; network: string; requested_usd: number; destination_wallet: string; status: string; created_at: string; review_note: string | null }>>([]);
  const [depositError, setDepositError] = useState<string | null>(null);

  useEffect(() => {
    if (activeSection !== "Deposits") return;
    fetch("/api/admin/deposits").then(async (response) => { const body = await response.json(); if (!response.ok) throw new Error(body.error); setDeposits(body.deposits ?? []); }).catch((error) => setDepositError(error instanceof Error ? error.message : "Deposits are unavailable."));
  }, [activeSection]);

  function selectSection(section: Section) {
    setActiveSection(section);
    setIsMenuOpen(false);
  }

  return (
    <div className="admin-frame">
      <aside className={`admin-sidebar ${isMenuOpen ? "admin-sidebar-open" : ""}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark" aria-hidden="true">B</span>
          <span>Boarvest</span>
          <span className="admin-brand-tag">ADMIN</span>
          <button className="admin-close" type="button" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)}>×</button>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          <p className="admin-nav-label">Control center</p>
          {navigation.map((item) => (
            <button
              className={`admin-nav-item ${activeSection === item.label ? "admin-nav-item-active" : ""}`}
              type="button"
              key={item.label}
              onClick={() => selectSection(item.label)}
              aria-current={activeSection === item.label ? "page" : undefined}
            >
              <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "Notifications" && <span className="admin-nav-dot" aria-label="Unread notifications" />}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-secure-note"><span aria-hidden="true">◉</span><span><strong>Secure workspace</strong><small>Admin access verified</small></span></div>
          <SignOutButton />
        </div>
      </aside>

      {isMenuOpen && <button className="admin-overlay" type="button" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)} />}

      <div className="admin-content">
        <header className="admin-header">
          <button className="admin-menu-button" type="button" aria-label="Open navigation" onClick={() => setIsMenuOpen(true)}><span /><span /><span /></button>
          <div>
            <p className="admin-kicker">Boarvest / Administration</p>
            <h1>{activeSection}</h1>
          </div>
          <div className="admin-header-meta"><span className="admin-status-dot" /> <span>Live workspace</span></div>
        </header>

        <main className="admin-main">
          {activeSection === "Overview" ? <Overview /> : activeSection === "Deposits" ? <DepositManagement deposits={deposits} error={depositError} onReviewed={(id) => setDeposits((items) => items.map((item) => item.id === id ? { ...item, status: "reviewed" } : item))} /> : <PlaceholderSection section={activeSection} />}
        </main>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <>
      <section className="admin-welcome" aria-labelledby="overview-title">
        <div>
          <p className="admin-eyebrow">Operations overview</p>
          <h2 id="overview-title">Good morning, admin.</h2>
          <p>Monitor the Boarvest platform from one secure workspace.</p>
        </div>
        <div className="admin-data-badge"><span className="admin-status-dot" /> Mock data preview</div>
      </section>

      <div className="admin-notice" role="status"><span className="admin-notice-icon" aria-hidden="true">i</span><p><strong>Financial data is not connected.</strong> The metrics below are placeholders for the dashboard preview and do not represent live records.</p></div>

      <section aria-labelledby="summary-title">
        <div className="admin-section-heading"><div><p className="admin-eyebrow">At a glance</p><h2 id="summary-title">Platform summary</h2></div><span className="admin-updated">Last synced —</span></div>
        <div className="admin-summary-grid">
          {summaryCards.map((card) => <article className="admin-summary-card" key={card.label}><div className="admin-card-top"><span className="admin-card-icon" aria-hidden="true">{card.icon}</span><span className="admin-card-placeholder">Preview</span></div><p>{card.label}</p><strong>—</strong><span>{card.note}</span></article>)}
        </div>
      </section>

      <section className="admin-lower-grid" aria-label="Admin activity preview">
        <div className="admin-panel admin-activity-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">Activity</p><h2>Recent activity</h2></div><span className="admin-panel-muted">No records</span></div><div className="admin-empty"><span className="admin-empty-icon" aria-hidden="true">⌁</span><strong>Nothing to review yet</strong><p>Recent account and transaction activity will appear here once the backend is connected.</p></div></div>
        <div className="admin-panel admin-status-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">System</p><h2>Platform status</h2></div><span className="admin-status-pill">Ready</span></div><div className="admin-system-row"><span className="admin-system-icon" aria-hidden="true">◉</span><span><strong>Authentication</strong><small>Supabase session active</small></span><span className="admin-check" aria-label="Operational">✓</span></div><div className="admin-system-row"><span className="admin-system-icon" aria-hidden="true">◇</span><span><strong>Financial services</strong><small>Not connected in preview</small></span><span className="admin-pending" aria-label="Pending">—</span></div></div>
      </section>
    </>
  );
}

function DepositManagement({ deposits, error, onReviewed }: { deposits: Array<{ id: string; reference: string; user_id: string; asset: string; network: string; requested_usd: number; destination_wallet: string; status: string; created_at: string; review_note: string | null }>; error: string | null; onReviewed: (id: string) => void }) {
  async function review(id: string, decision: "approved" | "declined") {
    const response = await fetch(`/api/admin/deposits/${id}/review`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision }) });
    if (response.ok) onReviewed(id);
  }
  return <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">Financial controls</p><h2>Deposit management</h2></div><span className="admin-status-pill">Verify funds first</span></div><p>{error ?? "Review requests only after independently confirming the incoming payment. Approval credits the user's balance atomically."}</p><div className="admin-deposit-list">{deposits.length === 0 ? <div className="admin-empty"><strong>No deposit requests</strong><p>New user requests will appear here.</p></div> : deposits.map((deposit) => <article className="admin-deposit-row" key={deposit.id}><div><strong>{deposit.reference}</strong><small>{deposit.asset} · {deposit.network} · User {deposit.user_id}</small><small>${Number(deposit.requested_usd).toLocaleString("en-US", { minimumFractionDigits: 2 })} · {new Date(deposit.created_at).toLocaleString()}</small><small>{deposit.destination_wallet}</small></div><div><span className="admin-status-pill">{deposit.status}</span>{deposit.status === "pending" && <div><button className="admin-action-button" type="button" onClick={() => void review(deposit.id, "approved")}>Approve verified</button><button className="admin-action-button" type="button" onClick={() => void review(deposit.id, "declined")}>Decline</button></div>}</div></article>)}</div></section>;
}

function PlaceholderSection({ section }: { section: Section }) {
  return <section className="admin-placeholder" aria-labelledby="placeholder-title"><span className="admin-placeholder-icon" aria-hidden="true">{navigation.find((item) => item.label === section)?.icon}</span><p className="admin-eyebrow">Admin module</p><h2 id="placeholder-title">{section}</h2><p>This workspace is reserved for {section.toLowerCase()} management. The interface will be connected to secure backend data in a later phase.</p><span className="admin-status-pill">Not implemented</span></section>;
}
