// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar"; // Import the new Sidebar

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
        <html lang="en">
            <body className={`${inter.className} bg-gray-800 text-gray-100`}>
                <div className="flex">
                    <Sidebar /> {/* The sidebar is now part of the layout */}
                    <main className="flex-1 p-8"> {/* The main content area */}
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
