/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pub-76c7e30af80c4680afe727176e703e78.r2.dev"],
    // path: "/_next/image",
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "pub-76c7e30af80c4680afe727176e703e78.r2.dev",
    //     port: "",
    //     pathname: "/*",
    //   },
    // ],
  },
  env: {
    ENV: process.env.NEXT_PUBLIC_ENV,
    API: process.env.NEXT_PUBLIC_API,
    DEV_API: process.env.NEXT_PUBLIC_API,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BASE_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  },
};

module.exports = nextConfig;
