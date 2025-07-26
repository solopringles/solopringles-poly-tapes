// src/app/page.tsx
import { MarketSummary } from "@/types"; // Import the type we just defined

// This is an async function that Next.js will run on the server to fetch data
async function getTrendingMarkets(): Promise<MarketSummary[]> {
  // Use the environment variable for the API URL, which is set in Vercel for production
  // and in .env.local for local development.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not configured. Please set NEXT_PUBLIC_API_URL.");
    // In a real app, you might want a more graceful error state
    return []; 
  }

  try {
    // We will build this '/api/markets/trending' endpoint on our OCI server next
    const res = await fetch(`${apiUrl}/api/markets/trending`, {
      // 'no-store' ensures we always get the latest data and not a cached version
      cache: 'no-store' 
    });

    if (!res.ok) {
      // Log the error for debugging on the server (Vercel logs)
      console.error(`Failed to fetch trending markets: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching trending markets:", error);
    return [];
  }
}


export default async function Home() {
  // Call the data-fetching function. Next.js automatically awaits this.
  const markets = await getTrendingMarkets();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trending Markets</h1>
      
      {/* 
        This is where our new <MarketTable /> component will go.
        For now, we can just display the raw data to confirm it works.
      */}
      <pre className="mt-4 p-4 bg-gray-900 rounded-md text-sm">
        {JSON.stringify(markets, null, 2)}
      </pre>
    </div>
  );
}