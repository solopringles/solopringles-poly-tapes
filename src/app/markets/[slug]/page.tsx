// /src/app/markets/[slug]/page.tsx --- COMPLETE & FINAL VERSION

import { JSX } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MarketSummary } from '@/types';

// Import all necessary UI components
import { MarketStats } from '@/components/MarketStats';
import { PriceChart } from '@/components/PriceChart';
import { RecentTrades } from '@/components/RecentTrades';
// --- 1. IMPORT THE NEW COMPONENT ---
import { LiveOrderbook } from '@/components/LiveOrderbook';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/formatters';
import React from 'react';


// Define the shape of the page's props
interface MarketDetailPageProps {
  params: { slug: string };
  searchParams: { [key:string]: string | string[] | undefined };
}

// --- Data Fetching Functions (No changes needed) ---
async function getMarketDetails(conditionId: string): Promise<MarketSummary | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/market/${conditionId}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch market details:", error);
    return null;
  }
}

async function getMarketGroup(slug: string): Promise<{ groupName: string, childMarkets: MarketSummary[] } | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/market-group/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch market group:", error);
    return null;
  }
}

// --- UI COMPONENT: View for a SINGLE market (with CID) ---
function SingleMarketView({ market }: { market: MarketSummary }) {
  return (
    <div className="space-y-8">
      {/* Image Banner Section */}
      {market.image_url && (
        <div className="relative w-full h-56 rounded-xl overflow-hidden">
          <Image
            src={market.image_url}
            alt={market.question}
            layout="fill"
            objectFit="cover"
            className="bg-muted"
          />
        </div>
      )}
      
      {/* Page Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{market.question}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{market.category}</Badge>
          <span className="text-sm text-muted-foreground">
            Resolves: {format(new Date(market.end_date_ts * 1000), 'MMM d, yyyy')}
          </span>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PriceChart market={market} />
          
          {/* --- 2. PLACE THE LIVE ORDERBOOK COMPONENT HERE --- */}
          {/* It receives the 'market' object to access the necessary token IDs. */}
          <LiveOrderbook market={market} />
          
          <RecentTrades conditionId={market.condition_id} />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <MarketStats market={market} />
        </div>
      </div>
    </div>
  );
}

// --- UI COMPONENT: View for a GROUP of markets (no CID) (No changes needed) ---
function MultiMarketView({ group }: { group: { groupName: string, childMarkets: MarketSummary[] } }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{group.groupName}</h1>
        <p className="text-muted-foreground">Select an outcome below to see more details.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Outcome</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.childMarkets.map((market) => (
            <TableRow key={market.condition_id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link href={`/markets/${market.slug}?cid=${market.condition_id}`} className="hover:underline">
                  {market.question.split(' - ')[1] || market.question}
                </Link>
              </TableCell>
              <TableCell className="text-right font-mono">{formatCurrency(Number(market.price), 2)}</TableCell>
              <TableCell className="text-right font-mono">{formatCurrency(Number(market.volume_24h))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}



type MarketDetailPageProps = {
  params: { slug: string };
  searchParams: { cid?: string };
};

export default async function MarketDetailPage({
  params,
  searchParams,
}: MarketDetailPageProps): Promise<JSX.Element> {
  const conditionId = searchParams?.cid;
  const slug = params.slug;

  if (conditionId) {
    // SCENARIO 1: We have a CID, fetch and render the single market view.
    const market = await getMarketDetails(conditionId);
    if (!market) notFound();
    return <SingleMarketView market={market} />;
  } else {
    // SCENARIO 2: No CID, use the slug to fetch the group and render the multi-market view.
    const group = await getMarketGroup(slug);
    if (!group) notFound();
    return <MultiMarketView group={group} />;
  }
}