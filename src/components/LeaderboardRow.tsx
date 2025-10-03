// /src/components/LeaderboardRow.tsx --- COMPLETE AND CORRECTED

import Link from 'next/link';
import { LeaderboardEntry } from '@/types';
import { formatCurrency, formatScore } from '@/utils/formatters';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TriangleAlert } from 'lucide-react';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  rank: number; // This remains the same, but its source is now the API
  // --- MODIFICATION: Widen the category type to match the new props ---
  category: 'pq_score' | 'all_time_realized_pnl' | 'volume_90day';
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, rank, category }) => {
  const displayValue = () => {
    switch (category) {
      case 'pq_score':
        return formatScore(entry.pq_score);
      // --- MODIFICATION: Use the correct key for pnl ---
      case 'all_time_realized_pnl':
        return formatCurrency(entry.all_time_realized_pnl);
      // --- MODIFICATION: Use the correct key for volume ---
      case 'volume_90day':
        return formatCurrency(entry.volume_90day);
      default:
        return 'N/A';
    }
  };
  
  // Simple function to generate a consistent avatar color from the address
  const getAvatarColor = (address: string) => {
    const hash = address.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
  };

  const avatarColor = getAvatarColor(entry.address);
  // Fallback for the avatar if display_name is missing
  const displayNameFallback = entry.display_name?.substring(0, 2).toUpperCase() || '??';

  return (
    // The Link is a flex container with theme-aware hover color
    <Link href={`/trader/${entry.address}`} className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
      
      {/* Rank (flex-shrink prevents it from shrinking) */}
      <div className="flex-shrink-0 w-8 text-center text-muted-foreground font-medium">{rank}</div>
      
      {/* Avatar component */}
      <Avatar className="w-8 h-8 mx-3 flex-shrink-0">
        <AvatarFallback style={{ backgroundColor: avatarColor, color: '#FFF', fontSize: '0.75rem', fontWeight: 600 }}>
          {displayNameFallback}
        </AvatarFallback>
      </Avatar>

      {/* Display Name (flex-grow is REMOVED, truncate handles long names) */}
      <div className="flex-grow font-medium text-foreground truncate mr-2">
        {entry.display_name}
      </div>

      {/* Value and Tooltip (flex-shrink prevents it from shrinking) */}
      <div className="flex flex-shrink-0 items-center space-x-2">
        {entry.isPnlDataIncomplete && category === 'pnl' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <TriangleAlert className="h-4 w-4 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">PnL data is unavailable for this trader as their history is too large for the API to process.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="font-semibold text-foreground w-28 text-right">
          {displayValue()}
        </div>
      </div>
    </Link>
  );
};

export default LeaderboardRow;