// src/components/Market/MarketMetrics.tsx

import { MarketSummary } from "@/types";
import { format } from 'date-fns';

// BEST PRACTICE: These helper functions should eventually be moved to a shared
// `src/utils/formatters.ts` file to be used by both this component and MarketTableRow.
const formatVolume = (num: number | null | undefined): string => {
    if (typeof num !== 'number' || num === 0) return '—';
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
};

const formatInteger = (num: number | null | undefined): string => {
    if (typeof num !== 'number' || num === 0) return '—';
    return num.toLocaleString();
}

const formatEndDate = (timestamp: number | null | undefined): string => {
    if (typeof timestamp !== 'number') return '—';
    try {
        const endDate = new Date(timestamp * 1000);
        return format(endDate, 'MMM d, yyyy');
    } catch {
        return '—';
    }
};

interface MetricProps {
  label: string;
  value: string;
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

interface MarketMetricsProps {
  marketData: MarketSummary;
}

export function MarketMetrics({ marketData }: MarketMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Metric label="24h Volume" value={formatVolume(marketData.volume_24h)} />
      <Metric label="Total Volume" value={formatVolume(marketData.total_volume)} />
      <Metric label="Open Interest" value={formatInteger(marketData.open_interest)} />
      <Metric label="Closes" value={formatEndDate(marketData.end_date_ts)} />
    </div>
  );
}