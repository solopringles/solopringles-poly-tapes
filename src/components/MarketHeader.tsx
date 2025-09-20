// src/components/Market/MarketHeader.tsx

import { MarketSummary } from "@/types";

interface MarketHeaderProps {
  marketData: MarketSummary;
}

export function MarketHeader({ marketData }: MarketHeaderProps) {
  const price = marketData.price ?? 0;
  
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {marketData.question}
      </h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-mono text-blue-400">
          ${price.toFixed(4)}
        </div>
        {/* We can add 24h price change here later if desired */}
      </div>

      {marketData.tags && marketData.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {marketData.tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs font-semibold bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}