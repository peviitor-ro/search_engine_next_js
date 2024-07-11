/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/search_engine_next_js",
  assetPrefix: "/search_engine_next_js/",
  metadataBase: new URL("https://peviitor-ro.github.io/search_engine_next_js/"),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
