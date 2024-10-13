/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'zenith-next-ecommerce.s3.amazonaws.com',
      'www.google.com',
      'plus.unsplash.com'
    ],
  }
}

module.exports = nextConfig
