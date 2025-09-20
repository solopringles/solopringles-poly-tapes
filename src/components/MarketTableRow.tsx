// src/components/MarketTableRow.tsx --- FINAL VERSION WITH TRANSITIONS

'use client';

import Link from 'next/link';
import { MarketSummary } from '@/types';
import { formatDistanceToNowStrict, format, differenceInDays } from 'date-fns';

// shadcn/ui component imports
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Helper function to format large numbers into human-readable volume strings (e.g., $1.23M).
const formatVolume = (num: number | null | undefined): string => {
  if (num === null || typeof num === 'undefined') return '—';
  if (num === 0) return '$0';
  if (Math.abs(num) >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(num) >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
};

// Helper function to format a Unix timestamp into a readable end date string.
const formatEndDate = (timestamp: number | null | undefined): string => {
  if (!timestamp) return '—';
  const endDate = new Date(timestamp * 1000);
  const now = new Date();
  const daysUntilEnd = differenceInDays(endDate, now);

  if (daysUntilEnd < 0) return 'Ended';
  if (daysUntilEnd <= 14) {
    return formatDistanceToNowStrict(endDate, { addSuffix: true });
  }
  return format(endDate, 'MMM d, yyyy');
};

// Helper function to format a decimal into a signed percentage string (e.g., +5.23%).
const formatPercent = (num: number | null | undefined): string => {
  if (num === null || typeof num === 'undefined') return '—';
  if (num === 0) return '0.00%';
  const percentage = num * 100;
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};


interface MarketTableRowProps { market: MarketSummary; }

export function MarketTableRow({ market }: MarketTableRowProps) {
  const priceChange = market.price_change_24h ?? 0;
  const priceChange24hColor = priceChange > 0 ? 'text-green-500' : priceChange < 0 ? 'text-red-500' : 'text-muted-foreground';
  const isGroup = (market.childMarketCount || 0) > 1;

  const isLinkable = !!market.slug;
  let internalUrl = '#';
  if (isLinkable) {
    internalUrl = isGroup
      ? `/markets/${market.slug}`
      : `/markets/${market.slug}?cid=${market.condition_id}`;
  }

  // Generate a fallback for the avatar from the first two letters of the market question
  const avatarFallback = market.question?.substring(0, 2).toUpperCase() || 'M';

  return (
    // NEW: Added transition classes for smooth fade-in/out and a theme-aware hover effect.
    <TableRow className="transition-opacity duration-300 ease-in-out hover:bg-muted/50">
      
      {/* Cell 1: Image Avatar */}
      <TableCell className="w-px">
        <Link href={internalUrl} className={!isLinkable ? 'pointer-events-none' : ''}>
          <Avatar>
            <AvatarImage src={market.image_url} alt={market.question || 'Market image'} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </Link>
      </TableCell>

      {/* Cell 2: Question */}
      <TableCell className="max-w-sm font-medium">
        <Link href={internalUrl} className={`hover:underline ${!isLinkable ? 'pointer-events-none' : ''}`}>
          {market.question}
        </Link>
      </TableCell>

      {/* Cell 3: Outcomes Badge */}
      <TableCell className="text-center">
        {isGroup && (
          <Badge variant="outline">{market.childMarketCount} Outcomes</Badge>
        )}
      </TableCell>

      {/* Cell 4: Price */}
      <TableCell className="text-right font-mono">{isGroup ? '—' : `$${(market.price ?? 0).toFixed(4)}`}</TableCell>

      {/* Data Cells */}
      <TableCell className={`text-right font-mono ${priceChange24hColor}`}>{formatPercent(market.price_change_24h)}</TableCell>
      <TableCell className="text-right font-mono text-muted-foreground">{formatVolume(market.volume_24h)}</TableCell>
      <TableCell className="text-right font-mono text-muted-foreground">{formatVolume(market.volume_7d)}</TableCell>
      <TableCell className="text-right font-mono text-muted-foreground">{formatVolume(market.liquidity)}</TableCell>
      <TableCell className="text-right font-mono text-muted-foreground">{formatEndDate(market.end_date_ts)}</TableCell>
    </TableRow>
  );
}