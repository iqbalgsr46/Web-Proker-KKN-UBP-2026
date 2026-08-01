import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from local IP (mobile phone testing)
  allowedDevOrigins: ["10.233.82.121"],
};

export default nextConfig;
