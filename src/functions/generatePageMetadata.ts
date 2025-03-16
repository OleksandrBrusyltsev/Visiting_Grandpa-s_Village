import { Metadata } from 'next';
import { metaData } from '@/data/meta';

export function generatePageMetadata(
    locale: string,
    page: keyof typeof metaData): Metadata {
    
    const { title, description } = metaData[page];

    return {
        title: title[locale as Language] as Metadata['title'],
        description: description[locale as Language] as Metadata['description'],
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: page === "home"
                ? `https://ecousadba.in.ua/${locale}`
                : `https://ecousadba.in.ua/${locale}/${page}`,
        }
    };
}
