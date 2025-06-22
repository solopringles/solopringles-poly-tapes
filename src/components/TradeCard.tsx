// src/components/TradeCard.tsx
import { Trade } from '@/types';
import { formatDistanceToNow } from 'date-fns';

// A helper to format the large USD values
const formatValue = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
};

export default function TradeCard({ trade }: { trade: Trade }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-white hover:border-blue-500 transition-colors duration-200">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-lg">
          {trade.species_name}
          <span className="text-gray-400 font-normal ml-2">
            {trade.taker_nickname || `${trade.species_name} Activity`}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(trade.event_timestamp * 1000), { addSuffix: true })}
        </div>
      </div>

      <p className="text-gray-300 my-3">{trade.market_question}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                trade.action === 'BUY' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
            }`}>
            {trade.action} {trade.outcome}
            </span>
            <span className="font-mono text-xl">{formatValue(trade.value_usd)}</span>
        </div>
        <a 
          href={trade.polymarket_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          View Market ↗
        </a>
      </div>
    </div>
  );
}