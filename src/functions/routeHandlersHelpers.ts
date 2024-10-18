export const getPhotos = (object: Record<string, any>, prefix: string) => {
    const result: Array<File | string> = [];
    for (let key in object) {
        if (key.startsWith(prefix) && (typeof object[key] === 'string' && object[key])) {
            result.push(object[key]);
        }
    }
    return result;
};

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
