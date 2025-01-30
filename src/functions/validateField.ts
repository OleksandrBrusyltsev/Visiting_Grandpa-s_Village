import {
    errorValidationMessages,
    warningValidationMessages,
} from '@/data/admin/validationMessages';

export type ValidateFieldType = (
    nameAttr: keyof HouseItem,
    houseData: Omit<HouseItem, 'photo'>,
    min?: number,
) => {
    error: boolean;
    color: 'warning' | undefined;
    errorText: string;
    warningText: string;
};

export const validateField: ValidateFieldType = (nameAttr, houseData, min = 0) => {
    let errorText = '',
        warningText = '';

    // валидация на минималках)) Пока для дополнительных гостей (детей)
    switch (nameAttr) {
        case 'max_adults':
            if (houseData.max_adults < min) {
                errorText = errorValidationMessages['max_adults'][0];
            }
            break;
        case 'extra_children':
            errorText = isExtraChildrenOutOfRange(houseData);
            warningText = isExtraChildrenExhausted(houseData);
            break;
        case 'rental_price':
            warningText = isEmptyAdultPrice(houseData);
            break;
        case 'extra_children_price':
            warningText = isEmptyExtraChildrenPrice(houseData);
            break;
        case 'extra_adult_price':
            warningText = isEmptyExtraAdultPrice(houseData);
            break;
    }

    return {
        error: Boolean(errorText),
        color: warningText ? 'warning' : undefined,
        errorText,
        warningText,
    };
};
const isEmptyAdultPrice = (houseData: Omit<HouseItem, 'photo'>) => {
    if (houseData.max_adults > 0 && houseData.rental_price == 0) {
        return warningValidationMessages['rental_price'][0];
    }
    return '';
};

const isEmptyExtraChildrenPrice = (houseData: Omit<HouseItem, 'photo'>) => {
    if (houseData.extra_children > 0 && houseData.extra_children_price == 0) {
        return warningValidationMessages['extra_children_price'][0];
    }
    return '';
};
const isEmptyExtraAdultPrice = (houseData: Omit<HouseItem, 'photo'>) => {
    if (houseData.extra_adults > 0 && houseData.extra_adult_price == 0) {
        return warningValidationMessages['extra_adult_price'][0];
    }
    return '';
};
const isExtraChildrenExhausted = (houseData: Omit<HouseItem, 'photo'>) => {
    if (houseData.extra_adults === 0 && houseData.extra_children > 0)
        return warningValidationMessages['extra_children'][0];
    return '';
};
const isExtraChildrenOutOfRange = (houseData: Omit<HouseItem, 'photo'>) => {
    if (
        houseData.extra_adults > 0 &&
        (houseData.extra_children === 1 || houseData.extra_children > 4)
    )
        return errorValidationMessages['extra_children'][0];
    return '';
};
