type GalleryItem = {
    id: number;
    title: string;
    images: {
        id: number;
        src: string;
        description: string;
    }[];
    description: string;
};