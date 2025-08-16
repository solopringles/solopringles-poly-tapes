// src/components/EnhancedMarketTable.tsx --- FINAL SYNCHRONIZED VERSION

import { MarketSummary } from '@/types';
import { MarketTableRow } from './MarketTableRow';
import { ChevronsUpDown } from 'lucide-react';
import clsx from 'clsx';

interface EnhancedMarketTableProps {
  markets: MarketSummary[];
  isLoading: boolean;
  onSort: (column: string) => void;
  currentSort: string;
}

const SortableHeader = ({ title, columnId, onSort, currentSort }: { title: string, columnId: string, onSort: (column: string) => void, currentSort: string }) => {
  const isActive = currentSort === columnId;
  return (
    <th 
      className="p-4 font-semibold text-right cursor-pointer group hover:bg-gray-800 transition-colors"
      onClick={() => onSort(columnId)}
    >
      <div className="flex items-center justify-end gap-1">
        <span className={clsx(isActive && "text-white")}>{title}</span>
        <ChevronsUpDown className={clsx("h-4 w-4 text-gray-500 group-hover:text-white transition-colors", isActive && "text-white")} />
      </div>
    </th>
  );
};

export function EnhancedMarketTable({ markets, isLoading, onSort, currentSort }: EnhancedMarketTableProps) {
  if (isLoading && markets.length === 0) {
    return <div className="text-center p-20 text-gray-400">Loading Markets...</div>;
  }

  if (markets.length === 0) {
    return <div className="text-center p-20 text-gray-400">No markets found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-left">
        <thead className="border-b border-gray-700 text-sm text-gray-400">
          <tr className="table-row">
            {/* Defines the first 2 columns: Image + Question */}
            <th className="p-4 font-semibold" colSpan={2}>Market</th> 
            {/* Defines the 3rd column */}
            <th className="p-4 font-semibold text-center w-36">Outcomes</th> 
            {/* Defines the 4th column */}
            <th className="p-4 font-semibold text-right">Price</th> 
            {/* Defines the remaining 5 sortable columns */}
            <SortableHeader title="24h Change" columnId="price_change_24h" onSort={onSort} currentSort={currentSort} />
            <SortableHeader title="24h Volume" columnId="volume_24h" onSort={onSort} currentSort={currentSort} />
            <SortableHeader title="7d Volume" columnId="volume_7d" onSort={onSort} currentSort={currentSort} />
            <SortableHeader title="Liquidity" columnId="liquidity" onSort={onSort} currentSort={currentSort} />
            <SortableHeader title="Ends" columnId="end_date_ts" onSort={onSort} currentSort={currentSort} />
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