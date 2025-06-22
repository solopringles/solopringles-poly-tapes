// src/app/api/trades/route.ts
import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// This tells Next.js to not cache this API route, so we get fresh data on each call.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Find the database file. process.cwd() is the root of your project folder.
    const dbPath = path.join(process.cwd(), 'db', 'polymarket_activity.db');
    
    try {
        // Open the database in read-only mode.
        const db = new Database(dbPath, { readonly: true });
        
        // This query fetches the 50 most recent trades.
        const stmt = db.prepare(`
            SELECT 
                event_timestamp, alert_category, species_name, taker_address, 
                taker_nickname, market_question, outcome, action, 
                value_usd, price, size_shares, tx_hash, polymarket_link
            FROM activity_log 
            ORDER BY event_timestamp DESC 
            LIMIT 50
        `);

        const trades = stmt.all();
        db.close();

        // Send the data back as a JSON response.
        return NextResponse.json(trades);

    } catch (error: any) {
        console.error("API Error fetching trades:", error);
        // If something goes wrong, send back an error message.
        return NextResponse.json(
            { message: "Failed to fetch trades. Is the database file present?", error: error.message }, 
            { status: 500 }
        );
    }
}