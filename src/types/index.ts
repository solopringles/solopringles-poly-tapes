// src/types/index.ts --- FINAL CORRECTED & CLEANED

// This type is for future features (e.g., whale profiles) and is correct.
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

// This is the single, correct interface for our market dashboard.
// The old, duplicate definition has been removed.
export interface MarketSummary {
  condition_id: string;
  question: string | null;
  slug: string | null;
  parent_event_slug?: string | null;
  childMarketCount?: number;
  image_url: string | null;
  category: string | null;
  is_featured: number | null;
  is_new: number | null;
  volume_24h: number | null;
  volume_7d: number | null;
  volume_30d: number | null;
  total_volume: number | null;
  liquidity: number | null;
  price: number | null;
  price_change_1h: number | null;
  price_change_24h: number | null;
  start_date_ts: number | null;
  end_date_ts: number | null;
  unique_traders: number | null;
  last_updated: number | null;
}