/** @type {import('next').NextConfig} */
const nextConfig = {
  generateStaticParams() {
    // Generate static parameters for pages here
    return {
      "/": {
        /* Static parameters for root */
      },
    };
  },
};

export default nextConfig;
