//вытаскивает из объекта все поля, которые начинаются с prefix
export const getPhotos = (object: Record<string, any>, prefix: string) => {
    const result: Array<File | string> = [];
    for (let key in object) {
        if (key.startsWith(prefix) && object[key]) {
            result.push(object[key]);
        }
    }
    return result;
};

// формирует основу объекта соответствующего типу HouseItem из поля с переводами
//(например: title-uk, title-en, title-ru -> title: { uk: '...', en: '...', ru: '...' })
export const combineProperty = (object: Record<string, any>, prefixes: string[]) => {
    return prefixes.reduce((accu, prefix) => {
        const propertiesWithPrefix = Object.entries(object).filter((item) =>
            item[0].startsWith(prefix),
        );

        const newObject = propertiesWithPrefix.reduce((accu, item) => {
            const [key, value] = item;
            const [property, locale] = key.split('-');
            accu[property] = {
                ...accu[property],
                [locale]: value,
            };
            return accu;
        }, {} as Record<string, Record<Language, string>>);

        return { ...accu, ...newObject };
    }, {} as Record<string, Record<Language, string>>);
};
