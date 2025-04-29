
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'edge',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv', 'nb', 'da', 'de', 'es', 'pt', 'fr'],
  },
};

export default nextConfig;
