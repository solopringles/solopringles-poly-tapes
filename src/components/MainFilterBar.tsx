// src/components/MainFilterBar.tsx --- FINAL UPGRADED VERSION

'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

// 1. Update the props interface to accept the new onSearch function
interface MainFilterBarProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  onSearch: (query: string) => void;
}

// These categories are now defined inside the component
const mainCategories = [
  "Trending", "New", "Politics", "Crypto", "Sports", "Tech",
  "Culture", "World", "Economy", "Elections"
];

export function MainFilterBar({ activeFilter, onSelectFilter, onSearch }: MainFilterBarProps) {
  // 2. Add state to manage the text inside the search input
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Create a handler for the form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page
    onSearch(searchQuery); // Call the function passed down from page.tsx
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-700 pb-4">
      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {mainCategories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectFilter(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
              activeFilter === category
                ? 'bg-white text-gray-900'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 4. Add the new Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative flex-shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search markets..."
          className="bg-gray-800 border border-gray-600 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </form>
    </div>
  );
}