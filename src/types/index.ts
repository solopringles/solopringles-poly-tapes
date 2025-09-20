// src/types/index.ts --- MODIFIED

// This type remains unchanged
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

// --- REPLACE the old MarketSummary with this one ---
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
  yes_token_id: string | null;
  no_token_id: string | null;
  open_interest: number | null;
  tags: string[];
}

// --- ADD THIS NEW INTERFACE ---
/**
 * Represents the structure of the API response from the /api/markets endpoint,
 * which will be used for searching and listing markets.
 */
export interface MarketsApiResponse {
  markets: MarketSummary[];
  total_pages: number;
  current_page: number;
}


// This interface remains unchanged
export interface LeaderboardEntry {
  address: string;
  display_name: string;
  pq_score: number | null;
  all_time_realized_pnl: number | null;
  volume_90day: number | null;
  lifetime_sharpe_ratio: number | null;
  trade_count_90day: number | null;
  isPnlDataIncomplete?: boolean; // Optional flag
}

// This interface remains unchanged
export interface TraderProfile extends LeaderboardEntry {
  date_added: number;
  last_trade_timestamp: number | null;
  is_high_activity: number; // Will be 0 or 1
  realized_pnl: number | null;
  unrealized_pnl: number | null;
  trade_count: number | null;
  profit_factor: number | null;
  win_loss_ratio: number | null;
  pnl_volatility: number | null;
  last_calculated: number | null;
}