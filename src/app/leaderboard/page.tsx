// /src/app/leaderboard/page.tsx --- UPDATED PROPS

import LeaderboardColumn from "@/components/LeaderboardColumn";

export default function LeaderboardPage() {
  return (
    <main className="p-6"> 
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Whale Leaderboard</h1>
        <p className="text-muted-foreground">
          Top traders ranked by performance, profit, and volume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* --- MODIFICATION START: Pass the correct sortBy values as the category prop --- */}
        <LeaderboardColumn 
          category="pq_score" 
          title="PQ Score" 
        />
        
        <LeaderboardColumn 
          category="all_time_realized_pnl" 
          title="Profit" 
        />
        
        <LeaderboardColumn 
          category="volume_90day" 
          title="Volume" 
        />
        {/* --- MODIFICATION END --- */}
      </div>
    </main>
  );
}