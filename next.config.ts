import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable specific caches that struggle on SMB networks like os error 45 */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // Disable webpack cache entirely in dev
    }
    return config;
  },
};

export default nextConfig;
