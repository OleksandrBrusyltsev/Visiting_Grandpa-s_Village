import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData } from '@/actions/getData';

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

    return {
        title: `Фото галерея розділу ${galleryTitle} | На селі у Дідуся`,
        description: `Неймовірні фото наших гостей та локацій еко-садиби - ${galleryTitle}. Тут вас завжди зустріне атмосфера затишку та щирі емоції, які ми збережемо на довгі роки в нашій галереї`,
    };
}
