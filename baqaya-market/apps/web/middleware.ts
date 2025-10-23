import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
