// src/app/api/trades/route.ts
import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// This tells Next.js to not cache this API route.
export const dynamic = 'force-dynamic';

// The _ tells TypeScript we are intentionally not using this parameter.
export async function GET() {
    // Find the database file.
    const dbPath = path.join(process.cwd(), 'db', 'polymarket_activity.db');

    try {
        const db = new Database(dbPath, { readonly: true });

        const stmt = db.prepare(`
            SELECT 
                event_timestamp, species_name, taker_nickname, 
                market_question, outcome, action, value_usd, 
                tx_hax, polymarket_link
            FROM activity_log 
            WHERE value_usd >= 1000
            ORDER BY event_timestamp DESC 
            LIMIT 50
        `);

        const trades = stmt.all();
        db.close();

        return NextResponse.json(trades);

    } catch (error: unknown) { // Use 'unknown' for better type safety.
        console.error("API Error fetching trades:", error);

        // Check if the error is an actual Error object before accessing .message
        const errorMessage = (error instanceof Error)
            ? error.message
            : "An unknown error occurred.";

        return NextResponse.json(
            { message: "Failed to fetch trades.", error: errorMessage },
            { status: 500 }
        );
    }
}