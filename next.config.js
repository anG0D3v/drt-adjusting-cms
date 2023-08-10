/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENV: process.env.NEXT_PUBLIC_ENV,
    API: process.env.NEXT_PUBLIC_API,
    DEV_API: process.env.NEXT_API,
  },
};

module.exports = nextConfig;
