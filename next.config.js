/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_DEV_TOOLS_ENABLE: process.env.NEXT_PUBLIC_DEV_TOOLS_ENABLE,
  },
};

module.exports = nextConfig;
