// /src/components/PriceChart.tsx --- FINAL VERSION WITH DATA AUGMENTATION

'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { MarketSummary } from '@/types'; // Import your MarketSummary type

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface PriceHistoryPoint {
  timestamp: number;
  price: number;
  date: string;
}

const chartConfig = {
  price: {
    label: 'Price',
    color: 'var(--color-primary)',
  },
} satisfies ChartConfig;

// The component now accepts the full market object
export function PriceChart({ market }: { market: MarketSummary }) {
  const { condition_id: conditionId, price: currentPrice, start_date_ts: marketStartDate } = market;

  const [data, setData] = React.useState<PriceHistoryPoint[]>([]);
  const [timeframe, setTimeframe] = React.useState('7d');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/market/${conditionId}/price-history?timeframe=${timeframe}`);
      const historyData: { timestamp: number, price: number }[] = await res.json();
      
      const now = new Date();
      
      // --- THIS IS THE FIX ---
      let augmentedData = historyData;

      if (historyData.length === 0) {
        // SCENARIO A: No data returned. Create a flat line.
        let startTime = new Date();
        switch (timeframe) {
          case '24h': startTime.setDate(now.getDate() - 1); break;
          case '7d': startTime.setDate(now.getDate() - 7); break;
          case '30d': startTime.setDate(now.getDate() - 30); break;
          case 'all': startTime = new Date(marketStartDate * 1000); break;
        }
        
        // Create two points for the flat line using the market's current price
        augmentedData = [
          { timestamp: startTime.getTime() / 1000, price: currentPrice },
          { timestamp: now.getTime() / 1000, price: currentPrice },
        ];
      } else {
        // SCENARIO B: Data was returned. Extend the line to "now".
        const lastPoint = historyData[historyData.length - 1];
        augmentedData.push({
          timestamp: now.getTime() / 1000,
          price: lastPoint.price, // Use the last known price
        });
      }

      const formattedData = augmentedData.map((point) => ({
        ...point,
        date: new Date(point.timestamp * 1000).toISOString(),
      }));

      setData(formattedData);
      setIsLoading(false);
    };

    fetchHistory();
  }, [conditionId, timeframe, currentPrice, marketStartDate]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>Price History</CardTitle>
          <CardDescription>
            Historical price data for the 'YES' outcome.
          </CardDescription>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px] rounded-lg" aria-label="Select a time range">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7d</SelectItem>
            <SelectItem value="30d">Last 30d</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-80 w-full">
          {isLoading ? ( <Skeleton className="h-full w-full" /> ) : (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${Number(value).toFixed(2)}`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" formatter={(value) => formatCurrency(Number(value), 4)} />} />
                <Area dataKey="price" type="natural" fill="url(#fillPrice)" stroke="var(--color-foreground)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const formatCurrency = (value: number, digits = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
};