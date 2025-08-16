// src/components/Sidebar.tsx

import Link from 'next/link';
import { BarChart2, Bell, Star, User, Settings } from 'lucide-react';

// The href for non-functional items now points to the new page
const navItems = [
  { href: '/', label: 'Trending', icon: BarChart2 },
  { href: '/under-construction', label: 'Watchlist', icon: Star },
  { href: '/under-construction', label: 'Alerts', icon: Bell },
];

export function Sidebar() {
  // ... rest of the component is unchanged
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-700 bg-gray-900 text-white">
      <div className="p-4">
        <Link href="/" className="text-2xl font-bold">
          PolyLeviathan
        </Link>
      </div>
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-gray-700 p-2">
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                <User className="h-6 w-6 rounded-full bg-gray-600 p-1" />
                <span className="text-sm">anon</span>
            </div>
            {/* Also point settings to under-construction for now */}
            <Link href="/under-construction" className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
            </Link>
        </div>
      </div>
    </div>
  );
}