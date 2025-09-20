// src/components/Footer.tsx --- REFACTORED WITH SHADCN/UI

import Link from 'next/link';

export function Footer() {
  return (
    // Use theme-aware background and border colors
    <footer className="bg-background border-t border-border mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
        
        <div className="mb-4">
          <Link href="/terms-of-service" className="mx-2 hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          {/* Use a theme-aware border color for the separator */}
          <span className="text-border">|</span>
          <Link href="/privacy-policy" className="mx-2 hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>

        <p className="mb-4 max-w-3xl mx-auto">
          <strong>DISCLAIMER:</strong> PolyLeviathan is an independent, third-party data analysis tool and is not affiliated with Polymarket. All data is provided for informational purposes only and does not constitute financial or investment advice. Always verify information on the official Polymarket website before making any financial decisions.
        </p>

        <p>
          &copy; {new Date().getFullYear()} PolyLeviathan. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}