/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['abhicdn.netlify.app'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

