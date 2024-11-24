import {
    errorValidationMessages,
    warningValidationMessages,
} from '@/data/admin/validationMessages';

export interface IValidateField {
    (
        nameAttr: keyof HouseItem,
        houseData: Omit<HouseItem, 'photo'> & { photo: (string | File)[] },
        min?: number,
    ): {
        error: boolean;
        color: 'warning' | undefined;
        errorText: string;
        warningText: string;
    };
}

export const validateField: IValidateField = (nameAttr, houseData, min = 0) => {
    let errorText = '',
        warningText = '';

    // валидация на минималках)) Пока для дополнительных гостей (детей)
    if (nameAttr === 'max_adults') {
        if (houseData.max_adults < min) {
            errorText = errorValidationMessages['max_adults'][0];
        }
    }
    if (nameAttr === 'extra_children') {
        if (
            houseData.extra_adults > 0 &&
            (houseData.extra_children === 1 || houseData.extra_children > 4)
        )
            errorText = errorValidationMessages['extra_children'][0];

        if (houseData.extra_adults === 0 && houseData.extra_children > 0)
            warningText = warningValidationMessages['extra_children'][0];
    }
    if (nameAttr === 'rental_price') {
        if (houseData.max_adults > 0 && houseData.rental_price == 0) {
            warningText = warningValidationMessages['rental_price'][0];
        }
    }
    if (nameAttr === 'extra_children_price') {
        if (houseData.extra_children > 0 && houseData.extra_children_price == 0) {
            warningText = warningValidationMessages['extra_children_price'][0];
        }
    }

    if (nameAttr === 'extra_adult_price') {
        if (houseData.extra_adults > 0 && houseData.extra_adult_price == 0) {
            warningText = warningValidationMessages['extra_adult_price'][0];
        }
    }

    return {
        error: Boolean(errorText),
        color: Boolean(warningText) ? 'warning' : undefined,
        errorText,
        warningText,
    };
};
