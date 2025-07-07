import type { NextConfig } from "next";
import path from "path";

// Use __dirname directly in CommonJS context

const nextConfig: NextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
