'use client';

import { useEffect, useRef } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMainStore } from '@/stores/store-provider';

export function useRouteGuard(message: string = 'Вы уверены, что хотите покинуть страницу?') {
    const isDirtyPage = useMainStore((state) => state.isDirtyPage);
    /*const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);
    const router = useRouter();
    const pathname = usePathname();
    const previousPathname = useRef(pathname);*/

    useEffect(() => {
        /* Обработчик переходов с использованием кнопок браузера "вперёд/назад".
        Требует доработки: нужно все input/select в формах редактирования страниц meals, entertainments, gallery, home 
        перевести в управляемые и синхронизировать со стором.
        Механизм Nextjs не позволяет работать с событием popstate (при переходе по рутам некста оно не срабатывает) */
        /*if (previousPathname.current !== pathname && isDirtyPage) {
            if (!window.confirm(message)) {
                // Возвращаем пользователя на предыдущую страницу
                router.back();
            } else {
                setIsDirtyPage(false);
                previousPathname.current = pathname;
            }
        }

        if (!isDirtyPage && previousPathname.current !== pathname) {
            previousPathname.current = pathname;
        }*/

        // Обработчик перезагрузки страницы
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirtyPage) {
                event.preventDefault();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirtyPage, message /*, pathname, router*/]);
    return null;
}
