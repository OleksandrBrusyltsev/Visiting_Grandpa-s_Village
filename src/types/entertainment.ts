type EntertainmentItem = {
    id: number;
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    description: Record<Language, string>;
    quote: Record<Language, string>;
    photos: string[];
};
