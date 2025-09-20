// /src/components/LeaderboardColumn.tsx --- COMPLETE AND CORRECTED

'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types';
import LeaderboardRow from './LeaderboardRow';
import LeaderboardSkeletonRow from './LeaderboardSkeletonRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Zap } from 'lucide-react';

interface LeaderboardColumnProps {
  category: 'pq-score' | 'pnl' | 'volume';
  title: string;
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'pq-score':
      return <BarChart className="h-5 w-5 text-muted-foreground" />;
    case 'pnl':
      return <TrendingUp className="h-5 w-5 text-muted-foreground" />;
    case 'volume':
      return <Zap className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
};

const LeaderboardColumn: React.FC<LeaderboardColumnProps> = ({ category, title }) => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- THIS IS THE CRITICAL DATA FETCHING LOGIC ---
  useEffect(() => {
    const fetchData = async () => {
      // Reset state for each fetch
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/leaderboard/${category}?limit=15`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${title} data`);
        }
        const result: LeaderboardEntry[] = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error(`Error fetching ${category} leaderboard:`, err);
      } finally {
        // This line is essential. It ensures the skeletons are hidden after the fetch.
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, title]); // Re-fetch if props change

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
            data.map((entry, index) => (
              <LeaderboardRow
                key={entry.address}
                entry={entry}
                rank={index + 1}
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