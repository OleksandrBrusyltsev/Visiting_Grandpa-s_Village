import React, { memo, useRef, useState } from 'react'
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

const HousePage = memo(function HousePage({ locale, rooms }: Props) {
    const coordinates = useMainStore((state) => state.houseEditing?.coordinates);
    if (!coordinates) return;

    return (
        <section className='col-span-2 mt-6 flex flex-col items-center'>
            <MultiRoomGalleryBlock locale={locale} room={rooms} />
            <section className={`${s.contentWrapper} ${rooms ? s.apartment : ""} w-full`}>
                <div className={s.textWrapper}>
                    <MainTitle locale={locale} />
                    <HouseDescription locale={locale} />

                    {/* services icons */}
                    {rooms ? null : <Services />}
                </div>
                <BookingBlock locale={locale} rooms={rooms} />
            </section>
            <HouseHeroSection locale={locale} />
            <Map locale={locale} coordinates={coordinates} />
        </section>
    )
});

const MainTitle = memo(function MainTitle({ locale }: { locale: Language }) {
    const setHouseData = useMainStore((state) => state.setHouseEditing);

    const long_title = useMainStore((state) => state.houseEditing?.long_title);
    if (long_title === undefined) return;
    return (
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
    )
});

const HouseDescription = memo(function MainTitle({ locale }: { locale: Language }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const setHouseData = useMainStore((state) => state.setHouseEditing);
    const description = useMainStore((state) => state.houseEditing?.description);

    if (description === undefined) return;

    return (
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
    )
});

const BookingBlock = memo(function BookingBlock({ locale, rooms }: { locale: Language, rooms: number }) {
    const bookingRef = useRef<HTMLElement | null>(null);//только для совместимости с клиентским кодом
    const {
        rental_price,
        max_adults,
        long_title,
        extra_adults,
        extra_children,
        photoDecor,
        treesDecor,
    } = useMainStore((state) => state.houseEditing) ?? {};

    if (rental_price === undefined
        || max_adults === undefined
        || extra_adults === undefined
        || extra_children === undefined
        || !long_title
        || !photoDecor
        || !treesDecor
    ) return;

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

    return rooms ? null : <Booking {...bookingProps} lang={locale} />;
});

const HouseHeroSection = memo(function HouseHeroSection({ locale }: { locale: Language }) {
    const decor_text = useMainStore((state) => state.houseEditing?.decor_text);
    if (!decor_text) return;
    return (
        <HeroSection text={decor_text[locale]} lang={locale} />
    );
});

const MultiRoomGalleryBlock = memo(function MultiRoomGalleryBlock({ locale, room }: { locale: Language, room: number }) {
    const t = useTranslations("HouseItem", locale, true);

    const photo = useMainStore((state) => state.houseEditing?.photo[0]);
    const long_title = useMainStore((state) => state.houseEditing?.long_title);
    const treesDecor = useMainStore((state) => state.houseEditing?.treesDecor);
    const photoDecor = useMainStore((state) => state.houseEditing?.photoDecor);
    const setHouseData = useMainStore((state) => state.setHouseEditing);

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
    if (!room || photo === undefined || !long_title || !treesDecor || !photoDecor) return null;
    return (
        <div className={`${s.apartmentGalleryWrapper} w-full`}>
            <div className={s.imageWrapper} >
                <Image
                    fill
                    alt={t('altText', { title: long_title[locale] })}
                    src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
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
    );
});

export default HousePage;