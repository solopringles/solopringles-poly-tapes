// src/components/Sidebar.tsx --- REFACTORED WITH SHADCN/UI

'use client'; // <-- IMPORTANT: Add this line to use the usePathname hook

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- NEW: Hook to detect active page
import { BarChart2, Bell, Star, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button'; // <-- NEW: Import the Button component
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // <-- NEW: For the user icon
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Trending', icon: BarChart2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Users },
  { href: '/under-construction', label: 'Watchlist', icon: Star },
  { href: '/under-construction', label: 'Alerts', icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname(); // Get the current URL path

  return (
    // Use theme-aware colors: bg-background and border-border
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-background">
      <div className="p-4">
        <Link href="/" className="text-2xl font-bold text-foreground">
          PolyLeviathan
        </Link>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.label}
              asChild // <-- CRITICAL: Lets the Button act as the Link
              variant={isActive ? 'secondary' : 'ghost'} // Style differently if active
              className="w-full justify-start gap-3"
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border p-2">
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  {/* The User icon can be placed inside the fallback if desired */}
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">anon</span>
            </div>
            
            <Button asChild variant="ghost" size="icon">
              <Link href="/under-construction">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
        </div>
      </div>
    </aside>
  );
}