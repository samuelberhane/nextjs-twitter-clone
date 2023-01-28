/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "cdn.cnn.com",
      "media.cnn.com",
      "randomuser.me",
      "www.datafeedwatch.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
