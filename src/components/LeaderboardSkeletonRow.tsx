// /src/components/LeaderboardSkeletonRow.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardSkeletonRow() {
  return (
    <div className="flex items-center p-2">
      <Skeleton className="flex-shrink-0 w-8 h-6" />
      <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full mx-3" />
      <Skeleton className="flex-grow h-6" />
      <Skeleton className="flex-shrink-0 w-24 h-6" />
    </div>
  );
}