import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['uk', 'en', 'ru'],
    defaultLocale: 'uk',
    // localeDetection: true,
});

export const config = {
    matcher: ['/', '/(uk|en|ru)/:path*'],
};
