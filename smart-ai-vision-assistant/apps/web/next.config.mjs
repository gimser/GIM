/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ["@sava/ui", "@sava/api", "@sava/utils"],
};
export default nextConfig;
