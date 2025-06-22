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