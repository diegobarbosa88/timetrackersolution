/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  distDir: '.next',
  images: {
    unoptimized: true,
    domains: ['localhost', 'timetracketeste.netlify.app'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  env: {
    NEXT_PUBLIC_RUNTIME_ENV: 'client',
  },
  transpilePackages: [],
}
