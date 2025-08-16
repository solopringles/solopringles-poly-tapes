// src/app/page.tsx --- FINAL VERSION, CONFIRMED TO USE EnhancedMarketTable

'use client';

import { useState, useEffect, useCallback } from 'react';
import { MarketSummary } from "@/types";
import { MainFilterBar } from '@/components/MainFilterBar';
// --- CRITICAL: Ensure we import the NEW EnhancedMarketTable ---
import { EnhancedMarketTable } from '@/components/EnhancedMarketTable'; 

export default function Home() {
  const [displayMarkets, setDisplayMarkets] = useState<MarketSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  
  const [filters, setFilters] = useState({ main: 'Trending', search: '' });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('volume_24h');

  const fetchMarkets = useCallback(async (isNewFilterSet: boolean) => {
    if (isNewFilterSet) {
      setIsLoading(true);
      setDisplayMarkets([]);
    } else {
      setIsLoadingMore(true);
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL missing");
      setIsLoading(false);
      return;
    }

    const params = new URLSearchParams({ 
      page: String(isNewFilterSet ? 1 : page),
      sortBy: sortBy,
    });

    if (filters.search) {
      params.append('search', filters.search);
    } else {
      if (filters.main !== 'Trending' && filters.main !== 'New' && filters.main !== 'All') {
        params.append('category', filters.main);
      } else if (filters.main !== 'All') {
        params.append('filter', filters.main.toLowerCase());
      }
    }

    try {
      const res = await fetch(`${apiUrl}/api/markets?${params.toString()}`, { next: { revalidate: 60 } });
      const newMarkets = await res.json();
      
      if (isNewFilterSet) {
        setDisplayMarkets(newMarkets);
      } else {
        setDisplayMarkets(prev => [...prev, ...newMarkets]);
      }
      setCanLoadMore(newMarkets.length === 50);
    } catch (error) {
      console.error("Error fetching markets:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [page, filters, sortBy]);

  useEffect(() => {
    setPage(1);
    fetchMarkets(true);
  }, [filters, sortBy]);
  
  useEffect(() => {
    if (page > 1) {
      fetchMarkets(false);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setPage(prev => prev + 1);
    }
  };
  
  const handleSelectMainFilter = (filter: string) => {
    setFilters({ main: filter, search: '' });
  };
  
  const handleSearch = (query: string) => {
    setFilters({ main: 'Trending', search: query });
  };

  const handleSort = (column: string) => {
    setSortBy(column);
  };

  return (
    <div className="space-y-6">
      <MainFilterBar activeFilter={filters.main} onSelectFilter={handleSelectMainFilter} onSearch={handleSearch} />
      <div className="rounded-lg bg-gray-900 shadow-lg">
        {/* --- CRITICAL: Ensure we RENDER the NEW EnhancedMarketTable --- */}
        <EnhancedMarketTable 
          markets={displayMarkets}
          isLoading={isLoading}
          onSort={handleSort}
          currentSort={sortBy}
        />
      </div>
      {canLoadMore && !isLoading && (
        <div className="text-center py-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 w-40"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}