// src/components/EnhancedMarketTable.tsx --- FINAL VERSION WITH SKELETONS

import { MarketSummary } from '@/types';
import { MarketTableRow } from './MarketTableRow';
import { ChevronsUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketTableSkeletonRow } from './MarketTableSkeletonRow'; // Import the new skeleton row
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import clsx from 'clsx';

interface EnhancedMarketTableProps {
  markets: MarketSummary[];
  isLoading: boolean;
  onSort: (column: string) => void;
  currentSort: string;
}

export function EnhancedMarketTable({ markets, isLoading, onSort, currentSort }: EnhancedMarketTableProps) {
  
  // A helper function for creating sortable headers to reduce repetition.
  const createSortableHeader = (title: string, columnId: string) => {
    const isActive = currentSort === columnId;
    return (
      <TableHead 
        className="text-right cursor-pointer group"
        onClick={() => onSort(columnId)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-end gap-1">
                <span className={clsx(isActive && "text-foreground")}>{title}</span>
                <ChevronsUpDown className={clsx("h-4 w-4 text-muted-foreground group-hover:text-foreground", isActive && "text-foreground")} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort by {title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableHead>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>Market</TableHead>
          <TableHead className="text-center w-36">Outcomes</TableHead>

          {/* Non-sortable Price Header */}
          <TableHead className="text-right">Price</TableHead>
          
          {/* Sortable Headers */}
          {createSortableHeader("24h Change", "price_change_24h")}
          {createSortableHeader("24h Volume", "volume_24h")}
          {createSortableHeader("7d Volume", "volume_7d")}
          {createSortableHeader("Liquidity", "liquidity")}
          {createSortableHeader("Ends", "end_date_ts")}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          // If loading, show 10 skeleton rows to fill the screen
          Array.from({ length: 15 }).map((_, index) => (
            <MarketTableSkeletonRow key={index} />
          ))
        ) : markets.length === 0 ? (
          // If not loading and no markets, show the "No markets found" message
          <TableRow>
            <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
              No markets found.
            </TableCell>
          </TableRow>
        ) : (
          // Otherwise, map over and display the actual market data
          markets.map((market) => (
            <MarketTableRow key={market.condition_id} market={market} />
          ))
        )}
      </TableBody>
    </Table>
  );
}