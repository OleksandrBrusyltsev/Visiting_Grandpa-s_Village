type GalleryItem = {
    id: number;
    name: string;
    title: {
        language: string,
        text: string,
    }[];
    cover: {
        id: number,
        src: string,
        description: string,
    }[];
    gallery: {
        id: number,
        src: string,
        description: string,
    }[];
    description: {
        language: string,
        text: string,
    }[];
};