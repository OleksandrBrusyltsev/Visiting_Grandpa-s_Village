import React from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';

import s from "@/components/Gallery/Gallery.module.scss";

type GalleryHeroProps = Omit<EditPageProps<GalleryItem>, 'imagePreviews' | 'position' | 'ref'> & {
    coverPreview: string | File
}

export default function GalleryHero({
    item,
    coverPreview,
    lang,
    handleTextChange,
    handleFileChange
}: GalleryHeroProps) {

    const { title, description, } = item;

    return (
        <section className={s.hero}>
            {lang === 'uk' && <input type="hidden" value={item.id} name='id-0' />}
            <div className={`${s.heroWrapper} mt-[100px]`}>
                <Input name={`title-${lang}-0`}
                    className={`${s.descr1} bg-transparent relative`}
                    defaultValue={title[lang]}
                    onChange={handleTextChange} />
                <Input name={`description-${lang}-0`}
                    className={`${s.descr2} bg-transparent relative`}
                    defaultValue={description[lang]}
                    onChange={handleTextChange} />
                <div className={s.grandpa}>
                    <Image
                        fill
                        alt={title[lang]}
                        src={
                            typeof coverPreview === 'string'
                                ? coverPreview
                                : URL.createObjectURL(coverPreview)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`absolute inset-0 !z-10 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0}
                    />
                </div>
            </div>
        </section>
    )
};