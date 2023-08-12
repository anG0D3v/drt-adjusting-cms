/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENV: process.env.NEXT_PUBLIC_ENV,
    API: process.env.NEXT_PUBLIC_API,
    DEV_API: process.env.NEXT_API,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
