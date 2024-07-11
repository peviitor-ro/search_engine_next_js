/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/search_engine_next_js",
  assetPrefix: "/search_engine_next_js/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
