// src/components/TradeCard.tsx --- CORRECTED AND REFACTORED

import { Trade } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Helper to format large USD values
const formatValue = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
};

// Helper to build the correct Polymarket URL from slugs
const buildPolymarketUrl = (parentSlug?: string | null, marketSlug?: string | null): string => {
    const baseUrl = "https://polymarket.com/event/";
    if (parentSlug && marketSlug && parentSlug !== marketSlug) {
        return `${baseUrl}${parentSlug}/${marketSlug}`;
    }
    const slug = parentSlug || marketSlug;
    return slug ? `${baseUrl}${slug}` : '#';
};


export default function TradeCard({ trade }: { trade: Trade }) {
  // --- FIX: Construct the market link dynamically ---
  const marketUrl = buildPolymarketUrl(trade.parent_event_slug, trade.market_slug);

  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold">{trade.species_name}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {trade.taker_nickname || `${trade.species_name} Activity`}
          </p>
        </div>
        {/* --- FIX: Use `timestamp` instead of `event_timestamp` --- */}
        <div className="text-xs text-muted-foreground pt-1">
          {formatDistanceToNow(new Date(trade.timestamp * 1000), { addSuffix: true })}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* --- FIX: Use `question` instead of `market_question` --- */}
        <p className="text-sm text-foreground my-3">
            {trade.question}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
              <Badge variant={trade.action.includes('BUY') || trade.action.includes('UP') ? 'default' : 'destructive'}>
                {trade.action} {trade.outcome}
              </Badge>
              <span className="font-mono text-lg font-semibold">{formatValue(trade.value_usd)}</span>
          </div>
          <Link 
            href={marketUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View Market ↗
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}