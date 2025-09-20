// /src/app/leaderboard/page.tsx --- REFACTORED

import LeaderboardColumn from "@/components/LeaderboardColumn";

export default function LeaderboardPage() {
  return (
    // REMOVED: Redundant classes like `flex-1`, `bg-gray-950`, `text-white`.
    // The main layout (`layout.tsx`) already handles the background color and flex properties.
    <main className="p-6"> 
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Whale Leaderboard</h1>
        <p className="text-muted-foreground">
          Top traders ranked by performance, profit, and volume over the last 30 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Each column is a self-contained component that fetches its own data */}
        
        <LeaderboardColumn 
          category="pq-score" 
          title="PQ Score" 
        />
        
        <LeaderboardColumn 
          category="pnl" 
          title="Profit" 
        />
        
        <LeaderboardColumn 
          category="volume" 
          title="Volume" 
        />

      </div>
    </main>
  );
}