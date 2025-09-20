// src/components/MarketTableSkeletonRow.tsx

import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

export function MarketTableSkeletonRow() {
  return (
    <TableRow>
      {/* Avatar */}
      <TableCell className="w-px">
        <Skeleton className="h-10 w-10 rounded-full" />
      </TableCell>
      {/* Question */}
      <TableCell className="max-w-sm font-medium">
        <Skeleton className="h-4 w-4/5" />
      </TableCell>
      {/* Outcomes */}
      <TableCell className="text-center">
        <Skeleton className="h-6 w-24 mx-auto" />
      </TableCell>
      {/* Price */}
      <TableCell className="text-right">
        <Skeleton className="h-4 w-12 ml-auto" />
      </TableCell>
      {/* The rest of the cells */}
      <TableCell className="text-right">
        <Skeleton className="h-4 w-12 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-16 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-16 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-16 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>
    </TableRow>
  );
}