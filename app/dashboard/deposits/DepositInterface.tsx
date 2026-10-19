"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Asset = "SOL" | "ETH" | "BNB";
type AssetInfo = { name: string; network: string; address: string; warning: string; icon: string };

const assets: Record<Asset, AssetInfo> = {
  SOL: { name: "Solana", network: "Solana", address: "HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT", warning: "Only send SOL on the Solana network to this address.", icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  ETH: { name: "Ethereum", network: "Ethereum", address: "0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62", warning: "Only send ETH on the Ethereum network to this address.", icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  BNB: { name: "BNB", network: "BNB Smart Chain", address: "0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62", warning: "Only send BNB on BNB Smart Chain to this address.", icon: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png" },
};

export default function DepositInterface() {
  const [asset, setAsset] = useState<Asset>("SOL");
  const [amount, setAmount] = useState("300");
  const [prices, setPrices] = useState<Partial<Record<Asset, number>>>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [priceState, setPriceState] = useState<"loading" | "ready" | "error">("loading");
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const requestActive = useRef(false);
  const selected = assets[asset];
  const numericAmount = Number(amount);
  const validation = amount.trim() === "" || !Number.isFinite(numericAmount) ? "Enter a valid USD amount." : numericAmount < 10 ? "Minimum deposit is $10." : numericAmount > 5000 ? "Maximum deposit is $5,000." : null;
  const price = prices[asset];
  const estimate = price && !validation ? numericAmount / price : null;

  const loadPrices = useCallback(async () => {
    if (requestActive.current) return;
    requestActive.current = true;
    setPriceState((current) => (Object.keys(prices).length ? current : "loading"));
    try {
      const response = await fetch("/api/market-prices", { cache: "no-store" });
      if (!response.ok) throw new Error("price request failed");
      const data = await response.json();
      setPrices(data.prices ?? {});
      setUpdatedAt(data.updatedAt ?? new Date().toISOString());
      setPriceState("ready");
    } catch {
      setPriceState("error");
    } finally {
      requestActive.current = false;
    }
  }, [prices]);

  useEffect(() => { const initial = window.setTimeout(() => void loadPrices(), 0); const timer = window.setInterval(() => void loadPrices(), 60000); return () => { window.clearTimeout(initial); window.clearInterval(timer); }; }, [loadPrices]);

  async function copyAddress() {
    try { await navigator.clipboard.writeText(selected.address); setCopyState("success"); } catch { setCopyState("error"); }
  }

  const formattedPrice = price ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: price < 1 ? 4 : 2 }).format(price) : "Unavailable";
  const formattedUpdate = updatedAt ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(updatedAt)) : null;

  return <div className="deposit-page">
    <div className="deposit-intro"><div><span className="dashboard-eyebrow">Funding</span><h2>Make a deposit</h2><p>Choose an asset, enter your USD amount, and send funds to the matching wallet address.</p></div><span className="dashboard-badge">Secure wallet details</span></div>
    <div className="deposit-layout">
      <section className="dashboard-card deposit-card"><div className="deposit-card-heading"><div><h3>1. Choose an asset</h3><p>Select the network you intend to use.</p></div><span className="deposit-step">01</span></div><div className="asset-grid">{(Object.keys(assets) as Asset[]).map((key) => <button type="button" key={key} className={`asset-option ${asset === key ? "asset-option-active" : ""}`} onClick={() => { setAsset(key); setCopyState("idle"); setNotice(null); }} aria-pressed={asset === key}><img src={assets[key].icon} alt="" /><span><strong>{key}</strong><small>{assets[key].name}</small></span><i>{asset === key ? "Selected" : ""}</i></button>)}</div><div className={`market-price market-price-${priceState}`}><span><small>Current {asset} price</small><strong>{formattedPrice}</strong></span><span>{priceState === "loading" ? "Loading live price…" : priceState === "error" ? "Live pricing unavailable" : `Updated ${formattedUpdate}`}</span></div></section>
      <section className="dashboard-card deposit-card"><div className="deposit-card-heading"><div><h3>2. Enter deposit amount</h3><p>Deposit between $10 and $5,000. This does not start an investment.</p></div><span className="deposit-step">02</span></div><label className="deposit-label" htmlFor="deposit-amount">USD amount</label><div className="deposit-amount-wrap"><span>$</span><input id="deposit-amount" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-invalid={Boolean(validation)} /><span>USD</span></div>{validation && <p className="deposit-validation" role="alert">{validation}</p>}<div className="amount-presets" aria-label="Suggested deposit amounts">{[10, 50, 100, 300, 500].map((value) => <button type="button" key={value} onClick={() => setAmount(String(value))}>${value}</button>)}</div><div className="conversion-row"><span>Estimated {asset} amount <small>at current market price</small></span><strong>{estimate ? estimate.toLocaleString("en-US", { maximumFractionDigits: 8 }) : "—"} {asset}</strong></div><p className="deposit-disclaimer">Estimate only. Your execution price may differ. No funds are recorded until a future deposit service verifies payment.</p></section>
      <section className="dashboard-card deposit-card deposit-wallet-card"><div className="deposit-card-heading"><div><h3>3. Send {asset}</h3><p>Use the exact network and address below.</p></div><span className="deposit-step">03</span></div><div className="network-pill"><span>Network</span><strong>{selected.network}</strong></div><div className="wallet-address"><code>{selected.address}</code><button type="button" className="button button-secondary" onClick={copyAddress}>{copyState === "success" ? "Copied" : "Copy address"}</button></div>{copyState === "success" && <p className="copy-feedback" role="status">Address copied to clipboard.</p>}{copyState === "error" && <p className="deposit-validation" role="alert">Could not copy automatically. Please copy the address manually.</p>}<div className="network-warning" role="note"><strong>Network warning</strong><span>{selected.warning}</span></div><button type="button" className="button button-primary deposit-confirm" disabled={Boolean(validation) || !price || priceState !== "ready" || submitting} onClick={async () => { setSubmitting(true); setNotice(null); try { const response = await fetch("/api/deposits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ asset, network: selected.network, amount: numericAmount, estimatedTokenAmount: estimate }) }); const body = await response.json(); if (!response.ok) throw new Error(body.error ?? "The deposit request could not be saved."); setNotice(`Deposit request ${body.deposit.reference} created and is pending administrator review.`); } catch (error) { setNotice(error instanceof Error ? error.message : "The deposit request could not be saved."); } finally { setSubmitting(false); } }}>{submitting ? "Saving request…" : "Confirm Deposit"}</button>{notice && <p className="deposit-notice" role="status">{notice}</p>}</section>
    </div>
  </div>;
}
