/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables lint errors from breaking builds
  },
};

module.exports = nextConfig;
