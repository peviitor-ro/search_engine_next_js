/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  distDir: "out",
  images: {
    unoptimized: true,
  },
  basePath: "/search_engine_next_js",
  assetPrefix: "/search_engine_next_js/",
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath: "/search_engine_next_js",
  },
};

export default nextConfig;
