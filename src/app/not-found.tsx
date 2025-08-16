// src/app/not-found.tsx

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full mt-24">
      <AlertTriangle className="w-24 h-24 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold text-white mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}