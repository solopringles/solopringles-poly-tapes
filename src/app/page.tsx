// src/app/page.tsx
import TradeCard from '@/components/TradeCard';
import { Trade } from '@/types';

// This function runs on the server to get the initial data for the page.
async function getTrades(): Promise<Trade[]> {
    // This line now reads the API URL from an environment variable.
    // This is the standard way to handle different URLs for development vs. production.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // We add a check to make sure the URL is actually set. This helps with debugging.
    if (!apiUrl) {
        throw new Error("API URL is not configured. Please set NEXT_PUBLIC_API_URL in your Vercel project settings.");
    }

    // The fetch call now uses the live API URL and asks for the '/api/trades' endpoint.
    const res = await fetch(`${apiUrl}/api/trades`, {
        // We use 'no-store' to make sure we ALWAYS get the latest data from our live API
        // and never a cached (old) version.
        cache: 'no-store'
    });

    if (!res.ok) {
        console.error("Failed to fetch from live API. Response:", await res.text());
        throw new Error('Failed to fetch trades from the live API.');
    }
    return res.json();
}

export default async function HomePage() {
    const trades = await getTrades();

    return (
        // Using TailwindCSS classes for styling our dark mode layout
        <div className="bg-gray-900 min-h-screen">
            <main className="container mx-auto max-w-2xl p-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white text-center">Poly-Tape</h1>
                    <p className="text-gray-400 text-center mt-2">Live Whale & Leviathan Trade Feed</p>
                </header>
                <div className="space-y-4">
                    {trades.map((trade) => (
                        <TradeCard key={trade.tx_hash} trade={trade} />
                    ))}
                </div>
            </main>
        </div>
    );
}