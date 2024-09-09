type GalleryItem = {
    id: number;
    name: string;
    title: {
        en: string;
        ru: string;
        uk: string;
    };
    cover: {
        id: number;
        src: string;
        description: {
            en: string;
            ru: string;
            uk: string;
        };
    }[];
    gallery: {
        id: number;
        src: string;
        description: string;
    }[];
    description: {
        en: string;
        ru: string;
        uk: string;
    };
};
