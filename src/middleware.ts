import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { decrypt, getSession, updateSession } from './actions/admin/auth';

import { locales } from '@/data/locales';

// Указываем защищенные и публичные маршруты
const adminRoutes = ['/admin_hub', '/admin_hub/:path*'];
const protectedClientRoutes = ['/booking/payment', '/booking/options', '/profile'];
const publicRoutes = [
    '/',
    '/login',
    '/meals',
    '/entertainment',
    '/gallery',
    '/gallery/:path*',
    '/contacts',
    '/houses',
    '/houses/:path*',
    '/booking',
    '/booking/rules',
    '/admin_hub/login',
];

// Middleware для обработки локалей (создаем на основе next-intl/middleware)
const localeMiddleware = createMiddleware({
    locales,
    defaultLocale: 'uk',
    localeDetection: false,
});

export default async function middleware(req: NextRequest) {
    // Обрабатываем локаль
    const pathname = req.nextUrl.pathname;
    const localeMatch = pathname.match(/^\/(uk|en|ru)/);
    const currentLocale = localeMatch ? localeMatch[1] : 'uk';

    const isAdminRoute = adminRoutes.includes(pathname.replace(`/${currentLocale}`, ''));
    const isProtectedClientRoute = protectedClientRoutes.includes(
        pathname.replace(`/${currentLocale}`, ''),
    );
    const isPublicRoute = publicRoutes.includes(pathname.replace(`/${currentLocale}`, ''));
    const isLoginPage =
        pathname === `/${currentLocale}/admin_hub/login` ||
        pathname === `/${currentLocale}/login`;

    let refreshTokenCookie: string = '',
        newAccessToken: string = '';
    //если публичный путь (но не страница логина), то просто обрабатываем локаль
    if (isPublicRoute && !isLoginPage) {
        return localeMiddleware(req);
    }
    // получаем сессию
    const { user_role } = await getSession(req);

    //если сессия не найдена, то пытаемся обновить access-token и refresh-token
    if (!user_role) {
        const session = await updateSession(req);

        //ошибка обновления access-token
        if (session.error) return NextResponse.json({ error: session.error }, { status: 403 });

        //если нет refresh-token, то редиректим на логин, в зависимости от роута, на который пытался перейти юзер
        if (!session.access_token || !session.refreshTokenCookie) {
            if (isAdminRoute) {
                return NextResponse.redirect(
                    new URL(`/${currentLocale}/admin_hub/login`, req.nextUrl.origin),
                );
            } else if (isProtectedClientRoute) {
                return NextResponse.redirect(
                    new URL(`/${currentLocale}/login`, req.nextUrl.origin),
                );
            }
        }

        newAccessToken = session.access_token || '';
        refreshTokenCookie = session.refreshTokenCookie || '';
    }

    //декодируем имеющийся или вновь полученный access-token для получения типа юзера
    const userRole = user_role || (await decrypt(newAccessToken))?.user_type;

    // редиректим аутентифицированного юзера cо страницы логина
    // на соответствующую стартовую страницу
    if (
        pathname.replace(`/${currentLocale}`, '') === '/admin_hub/login' &&
        (user_role === 'admin' || user_role === 'superadmin')
    ) {
        return NextResponse.redirect(
            new URL(`/${currentLocale}/admin_hub`, req.nextUrl.origin),
        );
    }
    if (pathname.replace(`/${currentLocale}`, '') === '/login' && user_role === 'client') {
        return NextResponse.redirect(new URL(`/${currentLocale}/profile`, req.nextUrl.origin));
    }

    //если тип юзера не соответствует маршруту, то редиректим на логин
    if (isAdminRoute && userRole && userRole !== 'admin' && userRole !== 'superadmin') {
        return NextResponse.redirect(
            new URL(`/${currentLocale}/admin_hub/login`, req.nextUrl.origin),
        );
    }
    if (isProtectedClientRoute && userRole && userRole !== 'client') {
        return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.nextUrl.origin));
    }

    const response = localeMiddleware(req);

    //если есть новые access-token и refresh-token, то добавляем их в куки
    if (refreshTokenCookie && newAccessToken) {
        const exp = (await decrypt(newAccessToken))!.exp;
        response.headers.set(
            'set-cookie',
            `access_token=${newAccessToken}; path=/; expires=${new Date(
                exp * 1000,
            ).toUTCString()}; HttpOnly; SameSite=Lax`,
        );
        response.headers.append('set-cookie', refreshTokenCookie);
    }

    return response;
}

export const config = {
    matcher: [
        '/',
        '/(uk|en|ru)/:path*',
        '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
    ],
};
