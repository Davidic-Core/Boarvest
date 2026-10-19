export type DepositAsset = "SOL" | "ETH" | "BNB";

export const DEPOSIT_ASSETS = {
  SOL: { network: "Solana", wallet: "HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT" },
  ETH: { network: "Ethereum", wallet: "0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62" },
  BNB: { network: "BNB Smart Chain", wallet: "0x41eb9c5dcaaf1090bc371b5a462bc5cc66c21d62" },
} as const;

export function isDepositAsset(value: unknown): value is DepositAsset {
  return value === "SOL" || value === "ETH" || value === "BNB";
}
