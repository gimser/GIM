/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  i18n: {
    locales: ['fr', 'ar'],
    defaultLocale: 'fr'
  }
};

export default nextConfig;
