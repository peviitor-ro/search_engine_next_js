/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/search_engine_next_js",
  assetPrefix: "/search_engine_next_js/",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
