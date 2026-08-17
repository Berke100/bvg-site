import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Instagram Graph API media_url'leri bu CDN'lerden geliyor — /haberler
    // sayfası canlı gönderi görsellerini gösterebilsin diye izinli.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
