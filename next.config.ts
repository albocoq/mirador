import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        port: "",
        pathname: "/api/mcp/asset/**",
      },
      {
        protocol: "https",
        hostname: "fufxnzokukqvbypakpdn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/altalaya-images/**",
      },
    ],
  },
};

export default nextConfig;
