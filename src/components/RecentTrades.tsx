// /src/components/RecentTrades.tsx

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNowStrict } from 'date-fns';
import { formatCurrency } from '@/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

interface Trade {
  event_timestamp: number;
  action: 'BUY' | 'SELL';
  outcome: 'YES' | 'NO';
  value_usd: number;
  price: number;
  taker_nickname: string;
}

export function RecentTrades({ conditionId }: { conditionId: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/market/${conditionId}/trades?limit=20`);
      const tradesData = await res.json();
      setTrades(tradesData);
      setIsLoading(false);
    };

    fetchTrades();
  }, [conditionId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Side</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}><Skeleton className="h-6 w-full" /></TableCell>
                </TableRow>
              ))
            ) : (
              trades.map((trade, i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDistanceToNowStrict(new Date(trade.event_timestamp * 1000), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <span className={trade.action === 'BUY' ? 'text-green-500' : 'text-red-500'}>
                      {trade.action} {trade.outcome}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{trade.taker_nickname}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(trade.price, 2)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(trade.value_usd)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}