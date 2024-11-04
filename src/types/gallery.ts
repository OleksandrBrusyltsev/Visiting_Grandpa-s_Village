type GalleryItem = {
    id: number;
    name: string;
    title: Record<Language, string>;
    cover: string;
    alt: Record<Language, string>;
    photo_urls: string[];
    description: Record<Language, string>;
};
