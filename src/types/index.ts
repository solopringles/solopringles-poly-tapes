// src/types/index.ts --- FULLY CORRECTED AND COMPREHENSIVE

// Represents a single trade or mover event from the live activity feed
export type Trade = {
  type: 'trade' | 'mover'; // Distinguishes between event types
  timestamp: number;
  taker_address: string | null;
  taker_nickname: string | null;
  species_name: string;
  value_usd: number;
  action: 'BUY' | 'SELL' | 'UP' | 'DOWN';
  outcome: 'YES' | 'NO' | null;
  price: number;
  condition_id: string;
  question: string;
  market_slug: string | null;
  parent_event_slug: string | null;
  // Legacy fields, can be phased out
  tx_hash?: string;
  polymarket_link?: string;
};

// Represents the summary of a market, used in lists
export interface MarketSummary {
  condition_id: string;
  question: string | null;
  slug: string | null;
  parent_event_slug?: string | null;
  image_url: string | null;
  category: string | null;
  price: number | null;
  volume_24h: number | null;
  volume_7d: number | null;
  liquidity: number | null;
  price_change_24h: number | null;
  end_date_ts: number | null;
  start_date_ts: number | null; // Added for sorting 'new' markets
  open_interest: number | null;
  is_featured: number | null;
  is_new: number | null;
  // Fields for grouped markets
  childMarketCount?: number;
  isGroupSummary?: boolean;
  // Fields from the full detail endpoint that might be useful
  tags?: string[];
  total_volume?: number;
  yes_token_id?: string | null;
  no_token_id?: string | null;
}

// Represents the full API response for the /api/markets endpoint
export interface MarketsApiResponse {
  markets: MarketSummary[];
  total_pages: number;
  current_page: number;
}

// Represents a single entry on the leaderboard
export interface LeaderboardEntry {
  rank: number;
  address: string;
  display_name?: string;
  avatar_url_optimized?: string;
  pq_score: number | null;
  all_time_realized_pnl: number | null;
  volume_90day: number | null;
  sortino_ratio: number | null;
  trade_count_90day: number | null;
  profit_factor: number | null;
  avg_pnl_per_trade: number | null;
  herding_contrarian_index: number | null;
  outcome_bias_index: number | null;
  first_mover_volume_percent: number | null;
  isPnlDataIncomplete?: boolean;
}

// --- THIS IS THE MISSING TYPE THAT CAUSED THE BUILD FAILURE ---
// Represents the full API response for the /api/leaderboard endpoint
export interface LeaderboardApiResponse {
  traders: LeaderboardEntry[];
  total_pages: number;
  current_page: number;
}
// ---

// Represents the detailed profile of a single trader
export interface TraderProfile {
  profile: {
    address: string;
    display_name?: string;
    avatar_url_optimized?: string;
    date_added: number;
  };
  stats: {
    pq_score: number | null;
    all_time_realized_pnl: number | null;
    volume_90day: number | null;
    trade_count_90day: number | null;
    sortino_ratio: number | null;
    profit_factor: number | null;
    avg_pnl_per_trade: number | null;
    herding_contrarian_index: number | null;
    outcome_bias_index: number | null;
    first_mover_volume_percent: number | null;
    category_concentration: Record<string, number> | null;
  };
  open_positions: {
    condition_id: string;
    question: string;
    outcome: 'Yes' | 'No';
    size: number;
    avg_price: number;
    current_value: number;
    unrealized_pnl: number;
  }[];
  recent_activity: {
    event_timestamp: number;
    condition_id: string;
    question: string;
    outcome: 'YES' | 'NO';
    action: 'BUY' | 'SELL';
    value_usd: number;
    price: number;
  }[];
}