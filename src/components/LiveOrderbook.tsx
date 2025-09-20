// /src/components/LiveOrderbook.tsx

'use client'; // This directive is CRUCIAL. It marks this as a client component.

import { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MarketSummary } from '@/types'; // Assuming this type includes yes_token_id and no_token_id

// Define the structure of the DOM data we expect from the backend
interface DomLevel {
  price: string;
  size: string;
  total: string;
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
  // Use state to store the live order book data for bids and asks
  const [bids, setBids] = useState<DomLevel[]>([]);
  const [asks, setAsks] = useState<DomLevel[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Live' | 'Disconnected'>('Connecting');

  // useRef to hold the WebSocket instance to prevent re-renders from recreating it
  const ws = useRef<WebSocket | null>(null);

  // --- ADD THIS LOG TO SEE IF THE COMPONENT IS RENDERING ---
  console.log("LiveOrderbook component is rendering.");

  // useEffect hook to manage the WebSocket lifecycle (connect, message, disconnect)
  useEffect(() => {
    // --- ADD THIS LOG TO SEE IF THE EFFECT IS RUNNING ---
    console.log("useEffect hook in LiveOrderbook is running.");

    const assetId = market.yes_token_id;
    if (!assetId) {
        // --- ADD THIS LOG FOR A COMMON FAILURE CASE ---
        console.error("No yes_token_id found on the market object. Cannot connect WebSocket.");
        return;
    };

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    // --- ADD THIS LOG TO VERIFY THE ENVIRONMENT VARIABLE ---
    console.log(`Attempting to connect WebSocket to URL: ${wsUrl}`);
    
    if (!wsUrl) {
        console.error("NEXT_PUBLIC_WS_URL is not defined! Check your .env.local file and restart the dev server.");
        setConnectionStatus('Disconnected');
        return;
    }

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected successfully to:', wsUrl);
      setConnectionStatus('Connecting'); // It is connecting, will switch to 'Live' on first message
      // Send subscription message to the backend
      ws.current?.send(JSON.stringify({ type: 'subscribe', assetId }));
      console.log('Sent subscription request for assetId:', assetId);
    };

    ws.current.onmessage = (event) => {
      try {
        const data: DomSnapshot = JSON.parse(event.data);
        // When a new snapshot arrives, update our state
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

    // Cleanup function: This is CRUCIAL to prevent memory leaks.
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log('Component unmounting. Unsubscribing and closing WebSocket.');
        ws.current.send(JSON.stringify({ type: 'unsubscribe', assetId }));
        ws.current.close();
      }
    };
  }, [market.yes_token_id]); // Dependency array is now cleaner and more stable

  // Helper to determine the badge variant based on connection status
  const getStatusBadgeVariant = () => {
    switch (connectionStatus) {
      case 'Live': return 'success';
      case 'Connecting': return 'secondary';
      case 'Disconnected': return 'destructive';
      default: return 'secondary';
    }
  };

  // --- Rendering Logic ---
  const maxRows = Math.max(bids.length, asks.length, 10); // Display at least 10 rows
  const rows = Array.from({ length: maxRows });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold leading-none tracking-tight">Live Orderbook</h3>
            <Badge variant={getStatusBadgeVariant()}>
                <span className={`relative flex h-2 w-2 mr-2 rounded-full ${connectionStatus === 'Live' ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {connectionStatus === 'Live' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                </span>
                {connectionStatus}
            </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="text-lg font-medium text-green-500 mb-2">Bids</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[33%]">Price</TableHead>
                            <TableHead className="w-[33%] text-right">Size</TableHead>
                            <TableHead className="w-[33%] text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((_, index) => {
                            const bid = bids[index];
                            return (
                                <TableRow key={`bid-${index}`}>
                                    <TableCell className="font-mono text-green-500">{bid?.price}</TableCell>
                                    <TableCell className="font-mono text-right">{bid?.size}</TableCell>
                                    <TableCell className="font-mono text-right text-muted-foreground">{bid?.total}</TableCell>
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
                            <TableHead className="w-[33%] text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((_, index) => {
                            const ask = asks[index];
                            return (
                                <TableRow key={`ask-${index}`}>
                                    <TableCell className="font-mono text-red-500">{ask?.price}</TableCell>
                                    <TableCell className="font-mono text-right">{ask?.size}</TableCell>
                                    <TableCell className="font-mono text-right text-muted-foreground">{ask?.total}</TableCell>
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