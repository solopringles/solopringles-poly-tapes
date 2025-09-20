// src/app/layout.tsx --- REFACTORED WITH SHADCN/UI & THEME AWARENESS

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // KEEP THIS IMPORT - IT'S CRITICAL!
// We will need to see Sidebar and Footer next, but for now, keep the imports
import { Sidebar } from "@/components/Sidebar"; 
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils"; // Import cn utility if you are using it elsewhere

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PolyLeviathan",
  description: "Polymarket Whale Tracking and Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. CRITICAL: Add className="dark" to activate the dark theme
    // 2. Use bg-background (defined by shadcn) instead of hardcoded bg-gray-950
    <html lang="en" className="h-full dark bg-background"> 
      
      {/* 
        We use the cn utility to combine the Inter font with the
        theme-aware body styles (font-sans, antialiased, etc.) 
      */}
      <body className={cn(
          "h-full flex flex-col font-sans antialiased",
          inter.className
      )}>
        
        {/* Main Content Area: Sidebar + Page */}
        <div className="flex flex-1">
          {/* Sidebar Area: Hidden on mobile (hidden), shown as a flexbox item on medium screens and up (md:flex) */}
          <div className="hidden md:flex sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
          
          {/* Main Page Content */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {/* You would also add a Mobile Header with a hamburger button here */}
            {children}
          </main>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}