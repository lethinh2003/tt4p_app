/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  env: {
    NODE_ENV: process.env.NODE_ENV,
    ENDPOINT_SERVER: process.env.ENDPOINT_SERVER,
    MONGODB_URL: process.env.MONGODB_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TINGMP3_URL: process.env.TINGMP3_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com", "source.unsplash.com"],
  },
};

module.exports = nextConfig;
