type MealsItem = {
    id: number;
    title: {
        en: string;
        ru: string;
        uk: string;
    };
    description: {
        en: string;
        ru: string;
        uk: string;
    };
    photos: Array<string>;
};
