// Проверяем наличие остатка времени до показа тостера
export function doesTimerHaveLeftTime(): boolean {
    const currentTime = Date.now();
    const savedToasterShowTime =
        typeof window !== 'undefined' ? localStorage.getItem('nextToasterShowTime') : null;

    if (!savedToasterShowTime) return false;
    const nextToasterShowTime = +savedToasterShowTime;

    const timeDifference = nextToasterShowTime - currentTime;
    return timeDifference > 0;
}

// Проверяем, нужно ли показывать тостер (учитываем наличие действующих акций)
export function shouldToasterBeShown(isPromoActive: boolean): boolean {
    return !doesTimerHaveLeftTime() && isPromoActive;
}

// Проверяем, действительна ли промоакция, используя серверное время
export function getPromoData(
    data: AdvToaster[],
    serverTime: number,
    locale: string,
): {
    isPromoActive: boolean;
    promoText: string;
    timeout: number;
} {
    const activePromoObj = data.find((promo) => {
        const startDateString = promo.startDate.trim().replace(/[,\/-]/g, '.');
        const [dayS, monthS, yearS] = startDateString.split('.');
        const startDate = new Date(`${yearS}-${monthS}-${dayS} 23:59:59`);

        const endDateString = promo.endDate.trim().replace(/[,\/-]/g, '.');
        const [dayE, monthE, yearE] = endDateString.split('.');
        const endDate = new Date(`${yearE}-${monthE}-${dayE} 23:59:59`);

        const moreThanStartDate = new Date(startDate) && new Date(startDate).getTime() < serverTime;
        const lessThanEndDate = new Date(endDate) && new Date(endDate).getTime() > serverTime;

        return moreThanStartDate && lessThanEndDate;
    });

    const isPromoActive = activePromoObj ? true : false;
    const promoText = isPromoActive
        ? activePromoObj?.translations.find((item) => item.language === locale)?.text!
        : '';
    //переводим минуты менеджера в миллисекунды
    const timeout = isPromoActive ? activePromoObj?.timeout! * 60 * 1000 : 0;

    return {
        isPromoActive,
        promoText,
        timeout,
    };
}
