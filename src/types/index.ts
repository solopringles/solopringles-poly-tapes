// src/types/index.ts
export type Trade = {
  tx_hash: string;
  taker_nickname: string | null;
  species_name: string;
  market_question: string;
  action: 'BUY' | 'SELL';
  outcome: 'YES' | 'NO';
  value_usd: number;
  event_timestamp: number;
  polymarket_link: string;
  price: number;
  size_shares: number;
};



// This defines the structure for a single market in our trending dashboard
export interface MarketSummary {
  condition_id: string;
  question: string;
  slug: string;
  image_url: string;
  volume_24h: number;
  txns_24h: number; // Note: This will be 0 for now until we add the logic
  liquidity: number;
  price: number;
  price_change_1h: number;
  price_change_24h: number;
  last_updated: number;
}