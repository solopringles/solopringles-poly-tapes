// src/components/MainFilterBar.tsx
'use client';

import { useState, useEffect } from 'react';

interface MainFilterBarProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

export function MainFilterBar({ activeFilter, onSelectFilter }: MainFilterBarProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await fetch(`${apiUrl}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch main categories", error);
        setCategories(["Trending", "New", "Crypto", "Politics"]); // Fallback
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex space-x-2 border-b border-gray-700 pb-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectFilter(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            activeFilter === category
              ? 'bg-white text-gray-900'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}