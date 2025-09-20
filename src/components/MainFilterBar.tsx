// src/components/MainFilterBar.tsx --- REFACTORED WITH SHADCN/UI

'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

// NEW: Import the shadcn/ui components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface MainFilterBarProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  onSearch: (query: string) => void;
}

const mainCategories = [
  "Trending", "New", "Politics", "Crypto", "Sports", "Tech",
  "Culture", "World", "Economy", "Elections"
];

export function MainFilterBar({ activeFilter, onSelectFilter, onSearch }: MainFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Category Filters -> Converted to Tabs */}
      <Tabs value={activeFilter} onValueChange={onSelectFilter}>
        <TabsList>
          {mainCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search Input -> Converted to Input */}
      <form onSubmit={handleSearchSubmit} className="relative flex-shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search markets..."
          className="pl-10 w-64" // Add padding for the icon
        />
      </form>
    </div>
  );
}