export type MultiLangFieldsType = 'title' | 'long_title' | 'decor_text' | 'description';
export type NumberFieldsType =
    | 'max_adults'
    | 'rental_price'
    | 'extra_adults'
    | 'extra_adult_price'
    | 'extra_children'
    | 'extra_children_price'
    | 'discount_percent';

export const fieldsetData: Array<{
    legend: string;
    nameAttr: MultiLangFieldsType;
    multiLang: boolean;
    multiline?: boolean;
}> = [
    {
        legend: 'Назва будинку на карточці',
        nameAttr: 'title',
        multiLang: true,
    },
    {
        legend: 'Назва будинку в заголовку сторінки',
        nameAttr: 'long_title',
        multiLang: true,
    },
    {
        legend: 'Назва будинку біля Дідуся, де він вказує на карту)',
        nameAttr: 'decor_text',
        multiLang: true,
    },
    {
        legend: 'Опис будинку (для виділення тексту жирним шрифтом необхідно використати зірочки: **текст**)',
        nameAttr: 'description',
        multiLang: true,
        multiline: true,
    },
];

export const extraFieldsetData: Array<{
    label: string;
    nameAttr: NumberFieldsType;
    defaultValue?: number;
    min?: number;
}> = [
    {
        label: 'Кількість основних гостей',
        nameAttr: 'max_adults',
        defaultValue: 2,
        min: 0,
    },
    {
        label: 'Вартість проживання (грн)',
        nameAttr: 'rental_price',
    },
    {
        label: 'Кількість додаткових гостей (дорослих)',
        nameAttr: 'extra_adults',
        defaultValue: 0,
    },
    {
        label: 'Вартість додаткового місяця (для дорослого) (грн)',
        nameAttr: 'extra_adult_price',
        defaultValue: 0,
    },
    {
        label: 'Кількість додаткових гостей (дітей)',
        nameAttr: 'extra_children',
        defaultValue: 0,
        min: 0,
    },
    {
        label: 'Вартість додаткового місяця (для дітей) (грн)',
        nameAttr: 'extra_children_price',
        defaultValue: 0,
    },
    {
        label: 'Знижка у відсотках (%)',
        nameAttr: 'discount_percent',
        defaultValue: 0,
    },
];
