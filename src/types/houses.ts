type HouseItem = {
    id: number;
    name: string;
    title: Record<Language, string>;
    long_title: Record<Language, string>;
    decor_text: Record<Language, string>;
    description: Record<Language, string>;
    photo: string[];
    rental_price: number;
    max_adults: number;
    is_available: boolean;
    discount_percent: number;
    extra_adults: number;
    extra_children: number;
    extra_adult_price: number;
    extra_children_price: number;
    house_type: string | null;
    photoDecor: string;
    treesDecor: string;
    coordinates: {
        bottom: number;
        left: number;
    };
};

type SingleHousesListType = {
    id: number;
    name: string;
    title: string;
}[];
