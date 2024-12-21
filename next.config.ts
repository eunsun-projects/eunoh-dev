import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urtfszkmtgmcqrnchihz.supabase.co',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js', // React 컴포넌트로 처리
        },
      },
    },
  },
};

export default nextConfig;
