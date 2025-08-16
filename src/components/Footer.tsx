// src/components/Footer.tsx

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
        
        <div className="mb-4">
          <Link href="/terms-of-service" className="mx-2 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span className="text-gray-700">|</span>
          <Link href="/privacy-policy" className="mx-2 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>

        <p className="mb-4 max-w-3xl mx-auto">
          **DISCLAIMER:** PolyLeviathan is an independent, third-party data analysis tool and is not affiliated with Polymarket. All data is provided for informational purposes only and does not constitute financial or investment advice. Always verify information on the official Polymarket website before making any financial decisions.
        </p>

        <p>
          &copy; {new Date().getFullYear()} PolyLeviathan. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}