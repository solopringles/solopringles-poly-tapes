// /src/components/MarketStats.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/utils/formatters"; // Assuming you have these formatters
import { MarketSummary } from "@/types";

interface MarketStatsProps {
  market: MarketSummary;
}

const StatRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

export function MarketStats({ market }: MarketStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatRow label="Current Price" value={formatCurrency(market.price, 4)} />
        <StatRow label="24h Change" value={formatPercent(market.price_change_24h)} />
        <StatRow label="24h Volume" value={formatCurrency(market.volume_24h)} />
        <StatRow label="Total Volume" value={formatCurrency(market.total_volume)} />
        <StatRow label="Liquidity" value={formatCurrency(market.liquidity)} />
        <StatRow label="Open Interest" value={formatCurrency(market.open_interest)} />
      </CardContent>
    </Card>
  );
}