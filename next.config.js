/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', '164.90.252.239:8055'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '164.90.252.239',
        port: '8055',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
