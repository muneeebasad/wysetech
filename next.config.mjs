/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack: (config) => {
    // Prevent HMR from triggering when CMS content JSON files are saved.
    // Without this, every CMS save causes a webpack rebuild that briefly breaks the page.
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /[\\/](\.git|node_modules|content)[\\/]/,
    };
    return config;
  },
};

export default nextConfig;
