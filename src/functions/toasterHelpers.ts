import dayjs from "dayjs";

export function getActivePromoData(
    data: AdvToaster[],
    locale: string,
): {
    isPromoActive: boolean;
    promoText: string;
    timeout: number;
} {
    const now = dayjs();
    const activePromoObj = data.find((promo) => {
        const start = dayjs(promo.start_date);
        const end = dayjs(promo.end_date);
        const shouldBeStarted = now.isAfter(start);
        const shouldBeFinished = now.isBefore(end);

        return shouldBeStarted && shouldBeFinished && promo.is_active;
    });

    if (!activePromoObj) {
        // Нет действующей акции или для действующей акции тостер не активен 
        return { isPromoActive: false, promoText: '', timeout: 0 };
    } else {
        // Есть действующая акция и тостер активен
        return {
            isPromoActive: true,
            promoText:
                activePromoObj.translations[locale as Language],
            //переводим минуты менеджера в миллисекунды
            timeout: activePromoObj.timeout * 60 * 1000,
        };
    }
}

// Проверяем наличие остатка времени до показа тостера
export function getRemainingToasterDelay(): number {
    const savedToasterShowTime =
        typeof window !== 'undefined' ? localStorage.getItem('nextToasterShowTime') : null;

    return !savedToasterShowTime ? 0 : +savedToasterShowTime - Date.now();
}