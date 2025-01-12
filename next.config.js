/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['abhicdn.netlify.app', 'https://placehold.co/'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

