// /src/components/LeaderboardColumn.tsx --- CORRECTED DATA FETCHING

'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry, LeaderboardApiResponse } from '@/types'; // --- MODIFICATION: Import the API response type
import LeaderboardRow from './LeaderboardRow';
import LeaderboardSkeletonRow from './LeaderboardSkeletonRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Zap } from 'lucide-react';

interface LeaderboardColumnProps {
  // --- MODIFICATION: Use the actual sortBy values for the category prop ---
  category: 'pq_score' | 'all_time_realized_pnl' | 'volume_90day';
  title: string;
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'pq_score':
      return <BarChart className="h-5 w-5 text-muted-foreground" />;
    case 'all_time_realized_pnl':
      return <TrendingUp className="h-5 w-5 text-muted-foreground" />;
    case 'volume_90day':
      return <Zap className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
};

const LeaderboardColumn: React.FC<LeaderboardColumnProps> = ({ category, title }) => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        // --- MODIFICATION START: Use the correct endpoint with a query parameter ---
        const params = new URLSearchParams({
            sortBy: category,
            limit: '15' // Fetch top 15 for the column
        });
        const response = await fetch(`${apiUrl}/api/leaderboard?${params.toString()}`);
        // --- MODIFICATION END ---

        if (!response.ok) {
          throw new Error(`Failed to fetch ${title} data`);
        }
        
        // --- MODIFICATION START: Expect and parse the paginated object ---
        const result: LeaderboardApiResponse = await response.json();
        setData(result.traders || []); // Set data from the 'traders' property
        // --- MODIFICATION END ---

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error(`Error fetching ${category} leaderboard:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, title]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIconForCategory(category)}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => <LeaderboardSkeletonRow key={i} />)
          ) : error ? (
            <p className="py-10 text-center text-sm text-destructive">{error}</p>
          ) : data.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No data available.</p>
          ) : (
            data.map((entry) => (
              <LeaderboardRow
                key={entry.address}
                // --- MODIFICATION: Pass rank directly from the API response ---
                entry={entry}
                rank={entry.rank}
                category={category}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardColumn;