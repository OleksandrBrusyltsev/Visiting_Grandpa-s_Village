type GalleryItem = {
    id: number;
    name: string;
    title: {
        en: string;
        ru: string;
        uk: string;
    };
    cover:  string;
    alt: {
        en: string;
        ru: string;
        uk: string;
    };
    photo_urls: string[];
    description: {
        en: string;
        ru: string;
        uk: string;
    };
};
