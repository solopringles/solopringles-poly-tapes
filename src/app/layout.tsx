// src/app/layout.tsx --- CORRECTED HTML STRUCTURE

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

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
    <html lang="en" className="h-full bg-gray-950">
      {/* 
        The <body> is now a flex container that arranges its children in a column.
        This ensures the footer sits correctly at the bottom.
      */}
      <body className={`${inter.className} h-full flex flex-col`}>
        {/* 
          This wrapper div now takes up the main flexible space, allowing it to grow.
          It contains the sidebar and the main content.
        */}
        <div className="flex flex-1">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        
        {/* 
          The Footer is now correctly placed as the last element inside the <body>,
          outside of the main content's flex container.
        */}
        <Footer />
      </body>
    </html>
  );
}