import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getData } from '@/actions/getData';
import { metaData } from '@/data/meta';

export async function generateGalleryMetadata({
    params,
}: {
    params: { chapter: string; locale: string };
}): Promise<Metadata> {
    const { chapter } = params;
    const galleryItem = await getData<GalleryItem[]>('gallery', chapter);

    if (!galleryItem.length) notFound();

    const galleryTitle =
        galleryItem[0].title[params.locale as keyof (typeof galleryItem)[0]['title']];
    const title =
        metaData['galleryChapter'].title[
            params.locale as keyof (typeof metaData)['galleryChapter']['title']
        ](galleryTitle);
    const description =
        metaData['galleryChapter'].description[
            params.locale as keyof (typeof metaData)['galleryChapter']['description']
        ](galleryTitle);
    return {
        title,
        description,
    };
}
