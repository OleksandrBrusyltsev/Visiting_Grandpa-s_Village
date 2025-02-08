export function getActivePromoData(
    data: AdvToaster[],
    locale: string,
): {
    isPromoActive: boolean;
    promoText: string;
    timeout: number;
} {
    const timeNow = Date.now();
    const activePromoObj = data.find((promo) => {
        const startDateString = promo.start_date.trim().replace(/[,\/-]/g, '.');
        const [dayS, monthS, yearS] = startDateString.split('.');
        const startDate = new Date(`${yearS}-${monthS}-${dayS} 23:59:59`);

        const endDateString = promo.end_date.trim().replace(/[,\/-]/g, '.');
        const [dayE, monthE, yearE] = endDateString.split('.');
        const endDate = new Date(`${yearE}-${monthE}-${dayE} 23:59:59`);

        const moreThanStartDate = new Date(startDate) && new Date(startDate).getTime() < timeNow;
        const lessThanEndDate = new Date(endDate) && new Date(endDate).getTime() > timeNow;

        return moreThanStartDate && lessThanEndDate;
    });

    if (!activePromoObj || !activePromoObj.is_active) {
        // Нет действующей акции или для действующей акции тостер не активен 
        return { isPromoActive: false, promoText: '', timeout: 0 };
    } else {
        // Есть действующая акция и тостер активен
        return {
            isPromoActive: true,
            promoText:
                activePromoObj.translations[locale as Language],
            //переводим минуты менеджера в миллисекунды
            timeout: activePromoObj?.timeout! * 60 * 1000,
        };
    }
}

// Проверяем наличие остатка времени до показа тостера
export function getRemainingToasterDelay(): number {
    const timeNow = Date.now();
    const savedToasterShowTime =
        typeof window !== 'undefined' ? localStorage.getItem('nextToasterShowTime') : null;

    if (!savedToasterShowTime) return 0;
    const nextToasterShowTime = +savedToasterShowTime;

    return nextToasterShowTime - timeNow;
}