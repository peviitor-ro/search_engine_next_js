/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    let pathsToExport = { ...defaultPathMap };

    // Remove paths that use getServerSideProps
    delete pathsToExport["/rezultate"];
    // Add other pages as necessary

    return pathsToExport;
  },
};

export default nextConfig;
