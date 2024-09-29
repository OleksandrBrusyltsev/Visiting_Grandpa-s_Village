import createMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './actions/admin/auth';

const url = process.env.SERV_URL;

// 1. Указываем защищенные и публичные маршруты
const adminRoutes = ['/dyadus_adm1n_hub', '/dyadus_adm1n_hub/:path*'];
const protectedClientRoutes = ['/booking/payment', '/booking/option'];
const publicRoutes = [
    '/',
    '/meals',
    '/entertainment',
    '/gallery',
    '/gallery/:path*',
    '/contacts',
    '/houses',
    '/houses/:path*',
    '/booking',
    '/booking/rules',
    '/dyadus_adm1n_hub/login',
];

// 2. Middleware для обработки локалей (создаем на основе next-intl/middleware)
const localeMiddleware = createMiddleware({
    locales: ['uk', 'en', 'ru'],
    defaultLocale: 'uk',
    localeDetection: false,
});

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const localeMatch = pathname.match(/^\/(uk|en|ru)/);
    const currentLocale = localeMatch ? localeMatch[1] : 'uk';

    const isAdminRoute = adminRoutes.includes(pathname.replace(`/${currentLocale}`, ''));
    const isProtectedClientRoute = protectedClientRoutes.includes(
        pathname.replace(`/${currentLocale}`, ''),
    );
    const isPublicRoute = publicRoutes.includes(pathname.replace(`/${currentLocale}`, ''));

    let refresh: string | undefined,
        resp: Response,
        newRefreshToken: string | null = '',
        newAccessToken: string | undefined = '';
    
    //если публичный путь, то просто обрабатываем локаль
    if (isPublicRoute) {
        return localeMiddleware(req);
    }
    //если не публичный путь, то ищем access-token
    if (isAdminRoute || isProtectedClientRoute) {
        const accessToken = cookies().get('access_token')?.value;
        //если нет access-token, то проверяем наличие refresh-token
        if (!accessToken) {
            refresh = cookies().get('refresh_token')?.value;

            //если также нет refresh-token, то редиректим на логин, в зависимости от роута, на который пытался перейти юзер
            if (!refresh) {
                if (isAdminRoute) {
                    return NextResponse.redirect(
                        new URL(`/${currentLocale}/dyadus_adm1n_hub/login`, req.nextUrl.origin),
                    );
                } else if (isProtectedClientRoute) {
                    return NextResponse.redirect(
                        new URL(`/${currentLocale}/login`, req.nextUrl.origin),
                    );
                }
            }
            //если есть refresh-token, то обновляем access-token
            resp = await fetch(`${url}/api/v1/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    Cookie: `refresh_token=${refresh}`,
                },
            });

            if (!resp.ok) {
                const errorData = await resp.json();
                console.log('errorData: ', errorData);
                return NextResponse.json(
                    { error: errorData.error || 'Refresh token failed' },
                    { status: 403 },
                );
            }

            //если обновление прошло успешно, то получаем новый access-token и новый refresh-token
            newRefreshToken = resp.headers.get('set-cookie');
            newAccessToken = (await resp.json())?.access_token;
            if (!newRefreshToken || !newAccessToken) {
                return NextResponse.json({ error: 'Refresh token failed' }, { status: 403 });
            }
        }

        //декодируем имеющийся или вновь полученный access-token для получения типа юзера
        const session = await decrypt(newAccessToken || accessToken);
        //если тип юзера не соответствует маршруту, то редиректим на логин
        if (
            isAdminRoute &&
            session &&
            session.user_type !== 'admin' &&
            session?.user_type !== 'superadmin'
        ) {
            return NextResponse.redirect(
                new URL(`/${currentLocale}/dyadus_adm1n_hub/login`, req.nextUrl.origin),
            );
        }

        if (isProtectedClientRoute && session && session.user_type !== 'client') {
            return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.nextUrl.origin));
        }
        const response = localeMiddleware(req);
        
        //если есть access-token и refresh-token, то добавляем их в куки
        if (newRefreshToken && newAccessToken) {
            const exp = (await decrypt(newAccessToken))!.exp;
            response.headers.set(
                'set-cookie',
                `access_token=${newAccessToken}; path=/; expires=${new Date(
                    exp * 1000,
                ).toUTCString()}`,
            );
            response.headers.append('set-cookie', newRefreshToken);
        }
        

        //если access-token и refresh-token есть, то обрабатываем локаль
        return response;
    }
}

export const config = {
    matcher: [
        '/',
        '/(uk|en|ru)/:path*',
        '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$).*)'
    ],
};
