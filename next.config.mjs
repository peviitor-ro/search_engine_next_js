/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  basePath: "/search_engine_next_js",
  assetPrefix: "/search_engine_next_js/",
  trailingSlash: true,
};

export default nextConfig;
