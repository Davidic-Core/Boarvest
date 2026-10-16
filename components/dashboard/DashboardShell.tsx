"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignOutButton from "@/components/auth/SignOutButton";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
  displayName: string | null;
};

const navigation = [
  { label: "Overview", href: "/dashboard", icon: "◈", active: true },
  { label: "Portfolio", icon: "◒" },
  { label: "Deposits", icon: "＋" },
  { label: "Transactions", icon: "≡" },
];

const secondaryNavigation = [
  { label: "Account Settings", icon: "⚙" },
  { label: "Help & Support", icon: "?" },
];

export default function DashboardShell({ children, userEmail, displayName }: DashboardShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const initials = (displayName ?? userEmail).slice(0, 2).toUpperCase();

  return (
    <div className="dashboard-frame">
      <aside className={`dashboard-sidebar ${isMenuOpen ? "dashboard-sidebar-open" : ""}`}>
        <div className="dashboard-brand">
          <Image src="/image/boarvest-logo.png" alt="" width={44} height={44} priority />
          <span>Boarvest</span>
          <button className="dashboard-close" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)}>×</button>
        </div>
        <nav aria-label="Dashboard navigation" className="dashboard-nav">
          <p className="dashboard-nav-label">Workspace</p>
          {navigation.map((item) => item.href ? (
            <Link key={item.label} href={item.href} className={`dashboard-nav-item ${item.active ? "dashboard-nav-item-active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </Link>
          ) : (
            <span key={item.label} className="dashboard-nav-item dashboard-nav-item-disabled" aria-disabled="true"><span aria-hidden="true">{item.icon}</span>{item.label}<small>Soon</small></span>
          ))}
          <p className="dashboard-nav-label dashboard-nav-label-spaced">Support</p>
          {secondaryNavigation.map((item) => <span key={item.label} className="dashboard-nav-item dashboard-nav-item-disabled" aria-disabled="true"><span aria-hidden="true">{item.icon}</span>{item.label}<small>Soon</small></span>)}
        </nav>
        <div className="dashboard-sidebar-footer">
          <div className="dashboard-user-chip"><span className="dashboard-avatar">{initials}</span><span className="dashboard-user-copy"><strong>{displayName ?? "Boarvest member"}</strong><small>{userEmail}</small></span></div>
          <SignOutButton />
        </div>
      </aside>
      {isMenuOpen && <button className="dashboard-overlay" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)} />}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <button className="dashboard-menu-button" aria-label="Open navigation" onClick={() => setIsMenuOpen(true)}><span /> <span /> <span /></button>
          <div className="dashboard-header-context"><span className="dashboard-eyebrow">Private workspace</span><h1>Overview</h1></div>
          <div className="dashboard-header-user"><span className="dashboard-avatar">{initials}</span><span><strong>{displayName ?? "Welcome"}</strong><small>{userEmail}</small></span></div>
        </header>
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}
