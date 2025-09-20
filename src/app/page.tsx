// src/app/page.tsx --- WITH "END OF RESULTS" MESSAGE

'use client';

import { useState, useEffect } from 'react';
import { MarketSummary, MarketsApiResponse } from "@/types";
import { MainFilterBar } from '@/components/MainFilterBar';
import { EnhancedMarketTable } from '@/components/EnhancedMarketTable';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Adjust this value to match your backend's pagination size.
const PAGE_SIZE = 20;

export default function Home() {
  const [displayMarkets, setDisplayMarkets] = useState<MarketSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  
  const [activeFilters, setActiveFilters] = useState({ main: 'Trending', search: '' });
  const [activeSortBy, setActiveSortBy] = useState('volume_24h');

  const [debouncedFilters, setDebouncedFilters] = useState(activeFilters);
  const [debouncedSortBy, setDebouncedSortBy] = useState(activeSortBy);
  
  const [page, setPage] = useState(1);

  // Debouncing effect (no changes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(activeFilters);
      setDebouncedSortBy(activeSortBy);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeFilters, activeSortBy]);

  // Fetching effect (no changes)
  useEffect(() => {
    if (page === 1) {
      setIsLoading(true);
      setDisplayMarkets([]);
    }

    const controller = new AbortController();
    const fetchMarkets = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const params = new URLSearchParams({ page: String(page), sortBy: debouncedSortBy });

      if (debouncedFilters.search) {
        params.append('search', debouncedFilters.search);
      } else if (debouncedFilters.main !== 'Trending' && debouncedFilters.main !== 'New' && debouncedFilters.main !== 'All') {
        params.append('category', debouncedFilters.main);
      } else if (debouncedFilters.main !== 'All') {
        params.append('filter', debouncedFilters.main.toLowerCase());
      }

      try {
        const res = await fetch(`${apiUrl}/api/markets?${params.toString()}`, { cache: 'no-store', signal: controller.signal });
        const data: MarketsApiResponse | MarketSummary[] = await res.json();
        
        const newMarkets = Array.isArray(data) 
          ? data 
          : (Array.isArray(data?.markets) ? data.markets : []);

        if (page === 1) {
          setDisplayMarkets(newMarkets);
        } else {
          setDisplayMarkets(prev => [...prev, ...newMarkets]);
        }
        
        const hasPaginationData = data && typeof data === 'object' && !Array.isArray(data);
        if (hasPaginationData) {
          setCanLoadMore(data.current_page < data.total_pages);
        } else {
          setCanLoadMore(newMarkets.length === PAGE_SIZE);
        }

      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Fetch error:", error);
          setCanLoadMore(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };

    fetchMarkets();

    return () => controller.abort();
  }, [debouncedFilters, debouncedSortBy, page]);


  // Handlers (no changes)
  const handleSelectMainFilter = (filter: string) => {
    setActiveFilters({ main: filter, search: '' });
  };
  const handleSearch = (query: string) => {
    setActiveFilters({ main: 'All', search: query });
  };
  const handleSort = (column: string) => {
    setActiveSortBy(column);
  };
  const handleLoadMore = () => {
    if (!isLoadingMore && canLoadMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <MainFilterBar activeFilter={activeFilters.main} onSelectFilter={handleSelectMainFilter} onSearch={handleSearch} />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <EnhancedMarketTable 
          markets={displayMarkets}
          isLoading={isLoading && page === 1}
          onSort={handleSort}
          currentSort={activeSortBy}
        />
      </div>

      {/* --- THIS IS THE UPDATED SECTION --- */}

      {/* Condition 1: Show the "Load More" button if we CAN load more */}
      {canLoadMore && !isLoading && (
        <div className="flex justify-center py-4">
          <Button onClick={handleLoadMore} disabled={isLoadingMore} className="w-40">
            {isLoadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* Condition 2: Show the "End of results" message if we CANNOT load more */}
      {!canLoadMore && !isLoading && displayMarkets.length > PAGE_SIZE && (
        <div className="flex justify-center py-4">
          <p className="text-sm text-muted-foreground">
            You've reached the end of the results.
          </p>
        </div>
      )}
    </div>
  );
}