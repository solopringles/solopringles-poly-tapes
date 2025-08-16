// next.config.ts

import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'polymarket-upload.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // --- START OF FIX ---
      // Add a new object to the array for the new hostname.
      {
        protocol: 'https',
        hostname: 'sambadenglish.com',
        port: '',
        pathname: '/**',
      },
      // --- END OF FIX ---
    ],
  },
};

export default config;