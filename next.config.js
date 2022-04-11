/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENDPOINT_SERVER: process.env.ENDPOINT_SERVER,
    MONGODB_URL: process.env.MONGODB_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com"],
  },
};

module.exports = nextConfig;
