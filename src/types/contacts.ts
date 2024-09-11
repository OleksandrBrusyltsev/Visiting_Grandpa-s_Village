type ContactItem = {
    id: number;
    address: Record<Language, string>;
    phone: string;
    email: string;
    facebook_link: string;
    instagram_link: string;
    telegram_link: string;
    linkedin_link: string;
    faq: Record<Language, { question: string; answer: string }[]>;
    directions_from_city: Record<Language, string>;
    routeInfo1: Record<Language, string>;
    routeInfo2: Record<Language, string>;
}

type Language = 'en' | 'ru' | 'uk';
