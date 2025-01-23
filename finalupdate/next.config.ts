// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "next-ecommerce-template-4.vercel.app",
        pathname: "/**",
      },
      // You can add more remote patterns as needed
    ],
  },
  // ... any other configuration you have
};

module.exports = nextConfig;
