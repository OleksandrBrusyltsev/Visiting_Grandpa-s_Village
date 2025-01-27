"use client";
import React from "react";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import Icon from "@/components/ui/Icon/Icon";
import { useTranslations } from "@/hooks/useTranslations";
import { useMainStore } from "@/stores/store-provider";

import s from "@/components/Houses/HouseCard.module.scss";

type Props = Readonly<{
    locale: Language;
    rooms: number
}>;

export default function HouseCard({ locale, rooms }: Props) {

    const t = useTranslations("HouseItem", locale, true);
    const data = useMainStore((state) => state.houseEditing);
    const photosEditing = useMainStore((state) => state.photosEditing);
    if (!data || !photosEditing) return;

    const { max_adults, extra_adults, rental_price } = data;

    const photo = photosEditing[0]?.raw;
    const title = data.title[locale];

    const guestsString = (main: number, ad: number) => {
        const str = ad ? t("guests", { guests: 5 }) : t("guests", { guests: main });
        if (ad) return `${main}+${ad} ${str}`;
        return `${main} ${str}`;
    };

    const getImageUrl = (photo: string | File) => {
        if (photo) {
            return typeof photo === "string" ? photo : URL.createObjectURL(photo);
        }
        return 'https://via.placeholder.com/500x400?text=No+Image';
    };

    return (
        <div className={s.houseWrapper} style={{ visibility: 'visible' }}>
            <div className={s.imageWrapper}>
                <Image
                    fill
                    src={getImageUrl(photo)}
                    alt={t('altText', { title })}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
            </div>
            <div className={s.content}>
                <div className={s.titleWrapper}>
                    <Icon name="house" className={s.houseIcon} />
                    <h3
                        className={`${s.title} font-['Mak'] text-base-green`}
                        dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
                    ></h3>
                </div>
                {rental_price ? (
                    <div className={s.priceWrapper}>
                        <Icon name="pocket" className={s.pocketIcon} />
                        <span className={`${s.price} font-['Mak']`}>
                            {t("rateBase", { price: rental_price })}
                        </span>
                    </div>
                ) : null}
                <div className={s.guestsWrapper}>
                    {rooms ? (
                        <span className={`${s.guests} font-['Mak']`}>{t('roomsAmount', { amount: rooms })}</span>
                    ) : (
                        <>
                            <Icon name="guests" className={s.guestsIcon} />
                            {rental_price ? (
                                <span className={`${s.guests} font-['Mak']`}>
                                    {guestsString(max_adults, extra_adults)}
                                </span>
                            ) : null}
                        </>
                    )}
                </div>
                <div className={s.servicesWrapper}>
                    <Icon name="bath" className={s.servicesIcon} />
                    <Icon name="tv" className={s.servicesIcon} />
                    <Icon name="parking" className={s.servicesIcon} />
                    <Icon name="kitchen" className={s.servicesIcon} />
                </div>
                <div className={s.btnWrapper}>
                    <Button
                        label={t('visit', { isPlural: !rental_price })}
                        className={""}
                        type="button"
                    />
                </div>
            </div>
        </div>
    );
};

