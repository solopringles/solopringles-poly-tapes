// /src/components/LiveOrderbook.tsx

'use client'; // This directive is CRUCIAL. It marks this as a client component.

import { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MarketSummary } from '@/types'; // Assuming this type includes yes_token_id and no_token_id
interface DomLevel {
  price: string;
  size: string;
  // --- This should be cumulative_value or cumulative_size from your backend fix ---
  cumulative_value?: string; 
  cumulative_size?: string;
  // Deprecated, but keeping for compatibility until backend is fully updated
  total?: string; 
}

interface DomSnapshot {
  assetId: string;
  bids: DomLevel[];
  asks: DomLevel[];
  timestamp: number;
}

interface LiveOrderbookProps {
  market: MarketSummary;
}


export function LiveOrderbook({ market }: LiveOrderbookProps) {
  const [bids, setBids] = useState<DomLevel[]>([]);
  const [asks, setAsks] = useState<DomLevel[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Live' | 'Disconnected'>('Connecting');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const assetId = market.yes_token_id;
    if (!assetId) {
      console.error("No yes_token_id found on the market object. Cannot connect WebSocket.");
      setConnectionStatus('Disconnected');
      return;
    };

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.error("NEXT_PUBLIC_WS_URL is not defined! Check your .env.local file.");
      setConnectionStatus('Disconnected');
      return;
    }

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setConnectionStatus('Connecting');
      ws.current?.send(JSON.stringify({ type: 'subscribe', assetId }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data: DomSnapshot = JSON.parse(event.data);
        if (data.assetId === assetId) {
          setBids(data.bids);
          setAsks(data.asks);
          if (connectionStatus !== 'Live') {
            setConnectionStatus('Live');
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.current.onclose = () => setConnectionStatus('Disconnected');
    ws.current.onerror = (error) => {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('Disconnected');
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'unsubscribe', assetId }));
        ws.current.close();
      }
    };
  }, [market.yes_token_id]);


  // --- RENDERING LOGIC ---
  const maxRows = Math.max(bids.length, asks.length, 10);
  const rows = Array.from({ length: maxRows });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold leading-none tracking-tight">Live Orderbook</h3>
        
        {/* --- MODIFIED BADGE LOGIC --- */}
        <Badge
          className={cn(
            'transition-colors', // For smooth color changes
            connectionStatus === 'Live' && 'bg-green-600 text-green-50', // Custom class for Live status
            connectionStatus === 'Disconnected' && 'bg-destructive text-destructive-foreground' // Use standard destructive colors
          )}
          // Use a variant that doesn't conflict, or no variant if className is enough
          variant={connectionStatus === 'Disconnected' ? 'destructive' : 'secondary'}
        >
          <span className={cn(
            "relative flex h-2 w-2 mr-2 rounded-full",
            connectionStatus === 'Live' ? 'bg-green-400' : 'bg-gray-400'
          )}>
            {connectionStatus === 'Live' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
          </span>
          {connectionStatus}
        </Badge>
        {/* --- END MODIFIED BADGE LOGIC --- */}

      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-medium text-green-500 mb-2">Bids</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%]">Price</TableHead>
                <TableHead className="w-[33%] text-right">Size</TableHead>
                {/* Updated based on backend DOM snapshot fix */}
                <TableHead className="w-[33%] text-right">Cum. Value</TableHead> 
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((_, index) => {
                const bid = bids[index];
                return (
                  <TableRow key={`bid-${index}`}>
                    <TableCell className="font-mono text-green-500">{bid?.price}</TableCell>
                    <TableCell className="font-mono text-right">{bid?.size}</TableCell>
                    <TableCell className="font-mono text-right text-muted-foreground">{bid?.cumulative_value || bid?.total}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div>
          <h4 className="text-lg font-medium text-red-500 mb-2">Asks</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%]">Price</TableHead>
                <TableHead className="w-[33%] text-right">Size</TableHead>
                <TableHead className="w-[33%] text-right">Cum. Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((_, index) => {
                const ask = asks[index];
                return (
                  <TableRow key={`ask-${index}`}>
                    <TableCell className="font-mono text-red-500">{ask?.price}</TableCell>
                    <TableCell className="font-mono text-right">{ask?.size}</TableCell>
                    <TableCell className="font-mono text-right text-muted-foreground">{ask?.cumulative_value || ask?.total}</TableCell>
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