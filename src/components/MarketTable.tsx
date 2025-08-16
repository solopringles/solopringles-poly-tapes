// src/components/MarketTable.tsx --- Diagnostic Version

import { MarketSummary } from '@/types';
import { MarketTableRow } from './MarketTableRow';

interface MarketTableProps {
  markets: MarketSummary[];
}

export function MarketTable({ markets }: MarketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-left">
        <thead className="border-b border-gray-600 text-sm text-gray-400">
          <tr className="table-row">
            <th className="p-4 font-semibold">Market</th>
            <th className="p-4 font-semibold text-right">Price</th>
            <th className="p-4 font-semibold text-right">24h Change</th>
            <th className="p-4 font-semibold text-right">24h Volume</th>
            <th className="p-4 font-semibold text-right">7d Volume</th>
            <th className="p-4 font-semibold text-right">Age</th>
            <th className="p-4 font-semibold text-right">Ends</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market) => (
            <MarketTableRow key={market.condition_id} market={market} />
          ))}
        </tbody>
      </table>
    </div>
  );
}