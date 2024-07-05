/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude pages with getServerSideProps from static export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Example: Exclude "/rezultate" page from static export
    delete defaultPathMap["/rezultate"];
    // Return the modified path map
    return defaultPathMap;
  },
};

export default nextConfig;
