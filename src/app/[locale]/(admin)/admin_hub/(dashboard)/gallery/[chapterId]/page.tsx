import { getGallery } from '@/actions/getGallery';
import EditGalleryChapter from '@/components/Admin/Gallery/EditChapter/EditChapter';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = Readonly<{ params: { chapterId: string } }>

export default async function Page({ params }: Props) {
    const { chapterId } = params;

    const galleryChapter = await getGallery(chapterId);
    if (!galleryChapter.length) notFound();

    return (
        <div className='p-8'>
            <h1 className='text-3xl text-center mb-10'>
                Редагування розділу <span className='uppercase font-bold'>
                    {galleryChapter[0].title.uk}
                </span>
            </h1>
            <EditGalleryChapter data={galleryChapter[0]} />
        </div>
    )
}