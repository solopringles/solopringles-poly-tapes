// src/app/under-construction/page.tsx

import { GanttChartSquare } from 'lucide-react';

export default function UnderConstructionPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full mt-24">
      <GanttChartSquare className="w-24 h-24 text-blue-500 mb-4" />
      <h1 className="text-4xl font-bold text-white mb-2">Feature Under Construction</h1>
      <p className="text-lg text-gray-400">
        This page is coming soon. We're working hard to bring you this feature.
      </p>
    </div>
  );
}