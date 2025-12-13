/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
  },
}

module.exports = nextConfig




