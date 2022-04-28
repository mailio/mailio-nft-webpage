/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mailio.infura-ipfs.io", "mailio-nfts.infura-ipfs.io"],
    minimumCacheTTL: 86400,
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
