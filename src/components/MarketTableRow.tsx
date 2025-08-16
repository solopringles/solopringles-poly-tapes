// src/components/MarketTableRow.tsx --- FINAL ROBUST IMAGE HANDLING

import Image from 'next/image';
import Link from 'next/link';
import { MarketSummary } from '@/types';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { useState } from 'react'; // Import useState for error handling

const formatVolume = (num: number | null | undefined): string => { if (typeof num !== 'number' || num === 0) return '—'; if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`; if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`; return `$${num.toFixed(0)}`; };
const formatEndDate = (timestamp: number | null | undefined): string => { if (typeof timestamp !== 'number') return '—'; try { const endDate = new Date(timestamp * 1000); const now = new Date(); if (endDate < now) return format(endDate, 'MMM d, yyyy'); const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); if (endDate > sevenDaysFromNow) return format(endDate, 'MMM d'); return formatDistanceToNowStrict(endDate, { addSuffix: true }); } catch { return '—'; } };
const formatPercent = (num: number | null | undefined): string => { if (typeof num !== 'number') return '—'; return `${(num * 100).toFixed(1)}%`; };

interface MarketTableRowProps { market: MarketSummary; }

export function MarketTableRow({ market }: MarketTableRowProps) {
  const [imageError, setImageError] = useState(false); // State to track image loading errors

  const priceChange = market.price_change_24h ?? 0;
  const priceChange24hColor = priceChange > 0 ? 'text-green-400' : priceChange < 0 ? 'text-red-400' : 'text-gray-400';
  const isGroup = (market.childMarketCount || 1) > 1;

  let eventUrl = "https://polymarket.com/event/";
  if (market.parent_event_slug && market.parent_event_slug !== market.slug) {
    eventUrl += `${market.parent_event_slug}/${market.slug}`;
  } else {
    eventUrl += market.slug;
  }

  const hasValidImageUrl = typeof market.image_url === 'string' && market.image_url.trim().startsWith('http');
  const displayImage = hasValidImageUrl && !imageError;

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
      {/* Cell 1: Image */}
      <td className="p-4 w-px">
        <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
          {/* --- THIS IS THE FIX --- */}
          {/* This wrapper provides the consistent background and shape. */}
          <div className="relative w-10 h-10 rounded-full bg-gray-700 flex-shrink-0">
            {displayImage && (
              <Image 
                src={market.image_url!} 
                alt={market.question || 'Market image'} 
                fill // Use `fill` to make the image adapt to the parent div
                className="rounded-full object-cover" // Style the image itself
                onError={() => setImageError(true)} // Handle broken links
              />
            )}
          </div>
          {/* --- END OF FIX --- */}
        </Link>
      </td>
      {/* Cell 2: Question */}
      <td className="p-4 max-w-sm">
        <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:underline">
          {market.question}
        </Link>
      </td>
      {/* ... rest of the cells are unchanged ... */}
      <td className="p-4 text-center">
        {isGroup && (<span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">{market.childMarketCount} Outcomes</span>)}
      </td>
      <td className="p-4 text-right font-mono text-white">{isGroup ? '—' : `$${(market.price ?? 0).toFixed(4)}`}</td>
      <td className={`p-4 text-right font-mono ${priceChange24hColor}`}>{formatPercent(market.price_change_24h)}</td>
      <td className="p-4 text-right font-mono text-gray-300">{formatVolume(market.volume_24h)}</td>
      <td className="p-4 text-right font-mono text-gray-300">{formatVolume(market.volume_7d)}</td>
      <td className="p-4 text-right font-mono text-gray-300">{formatVolume(market.liquidity)}</td>
      <td className="p-4 text-right font-mono text-gray-300">{formatEndDate(market.end_date_ts)}</td>
    </tr>
  );
}