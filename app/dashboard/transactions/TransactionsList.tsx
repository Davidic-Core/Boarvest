"use client";
import { useEffect, useState } from "react";

type Deposit = { id: string; reference: string; asset: string; network: string; requested_usd: number; estimated_token_amount: number | null; status: string; created_at: string; review_note: string | null };
export default function TransactionsList() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { fetch("/api/deposits/mine").then(async (r) => { const body = await r.json(); if (!r.ok) throw new Error(body.error); setDeposits(body.deposits ?? []); }).catch((e) => setError(e instanceof Error ? e.message : "Transactions are unavailable.")); }, []);
  if (error) return <div className="dashboard-empty-state"><h3>Transactions unavailable</h3><p>{error}</p></div>;
  if (!deposits.length) return <div className="dashboard-empty-state"><h3>No deposit requests yet</h3><p>Confirmed deposit requests will appear here with their review status.</p></div>;
  return <div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr><th>Reference</th><th>Asset</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>{deposits.map((deposit) => <tr key={deposit.id}><td>{deposit.reference}</td><td>{deposit.asset} <small>{deposit.network}</small></td><td>${Number(deposit.requested_usd).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td><td>{new Date(deposit.created_at).toLocaleDateString()}</td><td><span className={`dashboard-status-badge dashboard-status-${deposit.status}`}>{deposit.status}</span>{deposit.review_note && <small>{deposit.review_note}</small>}</td></tr>)}</tbody></table></div>;
}
