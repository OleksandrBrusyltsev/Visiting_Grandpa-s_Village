import uk from '../../localization/uk.json';
import en from '../../localization/en.json';
import ru from '../../localization/ru.json';

export default function customTranslations(
    namespace: string,
    locale: Language,
): (key: string, params?: Record<string, any>) => string {
    const jsonWithTranslations = getTranslations(locale || 'uk');

    return (key: string, params?: Record<string, any>) => {
        let rawTranslation = '';

        if (key.includes('.')) {
            //составной ключ для перевода (checkOutTime.text или checkOutTime.time)
            rawTranslation = getNestedTranslation(jsonWithTranslations[namespace], key);
        } else {
            //простой ключ для перевода
            rawTranslation = jsonWithTranslations[namespace][key];
        }

        if (!rawTranslation) throw new Error(`No translation found for key: ${key}`);

        //простой перевод без переменных
        if (!params) return rawTranslation;

        // многовариантный перевод с переменными
        const isPlural = jsonWithTranslations[namespace][key].match(/plural/);
        const isSelect = jsonWithTranslations[namespace][key].match(/select/);

        if (isPlural || isSelect) {
            if (!params) return jsonWithTranslations[namespace][key];
            const formattedTranslation = parseTranslation(
                jsonWithTranslations[namespace][key],
                params,
            );

            return formattedTranslation;
        }

        //простой перевод с переменными
        return replaceTemplate(rawTranslation, params ?? {});
    };
}
//выбираем базовый файл с переводами
const getTranslations = (locale: 'uk' | 'en' | 'ru') => {
    switch (locale) {
        case 'uk':
            return uk as Record<string, any>;
        case 'en':
            return en as Record<string, any>;
        case 'ru':
            return ru as Record<string, any>;
    }
};

//заменяем в шаблоне перевода переменные на соответствующие значения
function replaceTemplate(template: string, params: Record<string, any>): string {
    return template.replace(/{(\w+)}/g, (_, key) => {
        return params[key] ?? `{${key}}`;
    });
}

//вытаскиваем из файла с переводами вложенные значения для namespace, которые соответствуют ключу path (например, checkOutTime.text)
function getNestedTranslation(translations: Record<string, any>, path: string): any {
    const keys = path.split('.');
    return keys.reduce((obj, key) => obj && obj[key], translations);
}

//многовариантный перевод с plural и select
function formatPlural(params: Record<string, number>, text: string): string {
    const regex = /{(\w+),\s*(plural|select),\s*(.+?})}/; // -> [match, variable, typeOfPlural, cases]
    const match = text.match(regex);

    if (!match) {
        return text;
    }
    const variable = match[1];
    const count = params[variable];
    const typeOfPlural = match[2];
    const cases = match[3];

    // Парсим варианты в словарь
    const casesMap: Record<string, string> = {};
    const caseItems = cases.split('}');
    caseItems.pop();
    for (const caseItem of caseItems) {
        const [condition, value] = caseItem.split(' {');
        const countCondition = condition.trim().replace(/=/, '');
        const pluralValue = value?.trim() || '';
        casesMap[countCondition] = pluralValue;
    }

    // Определяем правильный вариант и подставляем параметр #
    if (typeOfPlural === 'plural') {
        const result = casesMap[`${count}`]
            ? casesMap[`${count}`].replace(/#/, String(count))
            : (casesMap['other'] && casesMap['other'].replace(/#/, String(count))) || '';
        return replacePluralTemplate(text, result);
    }
    if (typeOfPlural === 'select') {
        const result = casesMap[`${count}`] || casesMap['other'];
        return replacePluralTemplate(text, result);
    }
    return text;
}

//заменяем в шаблоне перевода содержимое в {} на соответствующие значения
function replacePluralTemplate(template: string, chunk: string): string {
    return template.replace(/{(.+)}/g, chunk);
}

//
function parseTranslation(template: string, params: Record<string, number>): string {
    const pluralArr = template.match(/{(\w+),\s*(plural|select),\s*(.+?})}/g)!;
    const result = pluralArr.map((template) => formatPlural(params, template));
    const parsedTemplate = template.split(/{\w+,\s*(?:plural|select)\s*,\s*.+?}}/);

    return parsedTemplate
        .reduce((res, chunk, i) => {
            return res.concat(chunk, result[i] || '');
        }, [] as string[])
        .join(' ')
        .trim();
}
