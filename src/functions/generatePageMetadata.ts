import { Metadata } from 'next';
import { metaData } from '@/data/meta';

export function generatePageMetadata(
    locale: string,
    page: keyof typeof metaData): Metadata {
    
    const { title, description } = metaData[page];

    return {
        title: title[locale as keyof typeof title] as Metadata['title'],
        description: description[locale as keyof typeof description] as Metadata['description'],
    };
}
