import React, { useRef, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';
import Booking from '@/components/House/Booking/Booking';
import HeroSection from '@/components/House/HeroSection/HeroSection';
import Map from '@/components/House/Map/Map';
import { useTranslations } from '@/hooks/useTranslations';
import { useMainStore } from '@/stores/store-provider';
import Services from '@/components/House/Services/Services';

import s from '@/components/House/House.module.scss';

type Props = {
    locale: Language;
    rooms: number;
};

export default function HousePage({ locale, rooms }: Props) {

    const houseData = useMainStore((state) => state.houseEditing);
    const setHouseData = useMainStore((state) => state.setHouseEditing);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const bookingRef = useRef<HTMLElement | null>(null);//только для совместимости с клиентским кодом

    const t = useTranslations("HouseItem", locale, true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setHouseData((houseData) => {
                if (houseData) {
                    houseData.photo[0] = file;
                    return houseData;
                }
                return houseData;
            });
        }
    }

    if (!houseData) return

    const {
        photo,
        rental_price,
        max_adults,
        extra_adults,
        extra_children,
        photoDecor,
        treesDecor,
        description,
        long_title,
        decor_text,
        coordinates,
    } = houseData;

    const bookingProps = {
        rental_price,
        max_adults,
        titleText: long_title[locale],
        extra_adults,
        extra_children,
        photoDecor,
        treesDecor,
        ref: bookingRef
    }

    return (
        <section className='col-span-2 mt-6 flex flex-col items-center'>

            {!!rooms && (
                <div className={`${s.apartmentGalleryWrapper} w-full`}>
                    <div className={s.imageWrapper} >
                        <Image
                            fill
                            alt={t('altText', { title: long_title[locale] })}
                            src={typeof photo[0] === 'string' ? photo[0] : URL.createObjectURL(photo[0])}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <input type="file" title='' accept='image/*' className={`absolute inset-0 opacity-0 cursor-pointer`} onChange={handleFileChange} tabIndex={0} />
                    </div>

                    <p className={s.grandpaQuote}>
                        {t('look')}
                    </p>

                    <div className={s.imageGrandpa}>
                        <Image
                            fill
                            alt=""
                            src="/images/grandpas/Grandpa2.png"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    <div className={s.imageDecor}
                        style={{ "--background-image-url": `url(${treesDecor})`, } as React.CSSProperties}>
                        <Image
                            fill
                            alt=""
                            src={photoDecor}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            )}

            <section className={`${s.contentWrapper} ${rooms ? s.apartment : ""} w-full`}>
                <div className={s.textWrapper}>
                    <Input
                        name={`long_title-${locale}`}
                        className={`${s.headline} font-['Mak'] text-base-green bg-transparent w-full px-1`}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHouseData((houseData) => {
                            if (houseData)
                                houseData.long_title = {
                                    ...houseData.long_title, [locale]: e.target.value
                                };
                            return houseData;
                        })}
                        value={long_title[locale]} />
                    <div className={`${s.text} relative`} >
                        <Input
                            name={`description-${locale}`}
                            className={`w-full px-1 ${isEditing ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0 z-10'}`}
                            value={description[locale]}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHouseData((houseData) => {
                                if (houseData)
                                    houseData.description = {
                                        ...houseData.description, [locale]: e.target.value
                                    };
                                return houseData;
                            })}
                            onFocus={() => setIsEditing(true)}
                            onBlur={() => setIsEditing(false)}
                        />
                        <MarkdownPreview className={`${isEditing ? 'opacity-0 absolute' : 'opacity-100 static'}`} markdown={description[locale]} />
                    </div>
                    {/* services icons */}
                    {rooms ? null : <Services />}
                </div>
                {/* booking block */}
                {rooms ? null : (
                    <Booking {...bookingProps} lang={locale} />
                )}
            </section>
            <HeroSection text={decor_text[locale]} lang={locale} />
            <Map locale={locale} coordinates={coordinates} />
        </section>
    )
}