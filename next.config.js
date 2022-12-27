/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "cdn.cnn.com",
      "media.cnn.com",
      "randomuser.me",
    ],
  },
};

module.exports = nextConfig;
