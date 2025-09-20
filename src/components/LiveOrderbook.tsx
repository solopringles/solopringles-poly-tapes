// /src/components/LiveOrderbook.tsx --- COMPLETE & CORRECTED

'use client';

import { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MarketSummary } from '@/types';
import { cn } from '@/lib/utils';

// Define the structure of the DOM data we expect from the backend.
// This is aligned with the corrected orderbook_service.py
interface DomLevel {
  price: string;
  size: string;
  cumulative_size: string;
  cumulative_value: string;
}

interface DomSnapshot {
  assetId: string;
  bids: DomLevel[];
  asks: DomLevel[];
  timestamp: number;
}

// Define the component's props
interface LiveOrderbookProps {
  market: MarketSummary;
}

export function LiveOrderbook({ market }: LiveOrderbookProps) {
  const [bids, setBids] = useState<DomLevel[]>([]);
  const [asks, setAsks] = useState<DomLevel[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Live' | 'Disconnected'>('Connecting');

  // useRef to hold the WebSocket instance
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // The orderbook is typically for the 'YES' token
    const assetId = market.yes_token_id;
    if (!assetId) {
      console.error("No yes_token_id found on the market object. Cannot connect WebSocket.");
      setConnectionStatus('Disconnected');
      return;
    };

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.error("NEXT_PUBLIC_WS_URL is not defined! Check your .env file.");
      setConnectionStatus('Disconnected');
      return;
    }

    // Establish WebSocket connection
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected:', wsUrl);
      setConnectionStatus('Connecting');
      // Send subscription message to the backend
      ws.current?.send(JSON.stringify({ type: 'subscribe', assetId }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data: DomSnapshot = JSON.parse(event.data);
        // Ensure the message is for the asset we are subscribed to
        if (data.assetId === assetId) {
          setBids(data.bids);
          setAsks(data.asks);
          // Switch to 'Live' only after the first successful data message
          if (connectionStatus !== 'Live') {
            setConnectionStatus('Live');
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('Disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('Disconnected');
    };

    // Cleanup function to run when the component unmounts or dependencies change
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log('Component unmounting: Unsubscribing and closing WebSocket.');
        ws.current.send(JSON.stringify({ type: 'unsubscribe', assetId }));
        ws.current.close();
      }
    };
  }, [market.yes_token_id, connectionStatus]); // Rerun effect if the asset ID changes

  // --- Rendering Logic ---
  const maxRows = Math.max(bids.length, asks.length, 10); // Display at least 10 rows
  const rows = Array.from({ length: maxRows });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold leading-none tracking-tight">Live Orderbook</h3>
            
            {/* CORRECTED BADGE: Uses cn() for conditional styling */}
            <Badge
              variant={connectionStatus === 'Disconnected' ? 'destructive' : 'secondary'}
              className={cn(
                'transition-colors',
                connectionStatus === 'Live' && 'bg-green-600/90 text-primary-foreground border-transparent',
              )}
            >
                <span className={cn(
                  "relative flex h-2 w-2 mr-2 rounded-full",
                  connectionStatus === 'Live' ? 'bg-green-400' : 'bg-gray-400'
                )}>
                    {connectionStatus === 'Live' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                </span>
                {connectionStatus}
            </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="text-lg font-medium text-green-500 mb-2">Bids (Buy Orders)</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[33%]">Price</TableHead>
                            <TableHead className="w-[33%] text-right">Size</TableHead>
                            <TableHead className="w-[33%] text-right">Total Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((_, index) => {
                            const bid = bids[index];
                            return (
                                <TableRow key={`bid-${index}`}>
                                    <TableCell className="font-mono text-green-500">{bid?.price}</TableCell>
                                    <TableCell className="font-mono text-right">{bid?.size}</TableCell>
                                    <TableCell className="font-mono text-right text-muted-foreground">{bid?.cumulative_value}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div>
                <h4 className="text-lg font-medium text-red-500 mb-2">Asks (Sell Orders)</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[33%]">Price</TableHead>
                            <TableHead className="w-[33%] text-right">Size</TableHead>
                            <TableHead className="w-[33%] text-right">Total Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((_, index) => {
                            const ask = asks[index];
                            return (
                                <TableRow key={`ask-${index}`}>
                                    <TableCell className="font-mono text-red-500">{ask?.price}</TableCell>
                                    <TableCell className="font-mono text-right">{ask?.size}</TableCell>
                                    <TableCell className="font-mono text-right text-muted-foreground">{ask?.cumulative_value}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
  );
}