"use client";
import React, { forwardRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";

import s from "./HouseItem.module.scss";

type Props = { data: HouseItem; rooms: number };

// const FavoriteIcon = ({ className }: { className: string }) => {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 22 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M11 19C11 19 1 15.14 1 6.5C1 5.04131 1.57939 3.64241 2.61084 2.61096C3.64229 1.57951 5.04131 1 6.5 1C7.384 0.999705 8.25474 1.21323 9.03833 1.62244C9.82192 2.03164 10.4951 2.62436 11 3.34998C11.5055 2.62497 12.1785 2.03279 12.9619 1.62366C13.7454 1.21452 14.6162 1.00055 15.5 1C16.9587 1 18.3575 1.57951 19.3889 2.61096C20.4204 3.64241 21 5.04131 21 6.5C21 15.14 11 19 11 19Z"
//         stroke="currentColor"
//         fill="transparent"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };
const HouseItem = forwardRef<HTMLAnchorElement, Props>(function HouseItem(
  { data, rooms },
  ref
) {
  const locale = useLocale();
  const t = useTranslations("HouseItem");

  const { push } = useRouter();
  // const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { name, cover_photo, max_adults, extra_adults, house_type, rental_price } =
    data;
  const title = data.title[locale as keyof typeof data.title];

  const guestsString = (main: number, ad: number) => {
    const str = ad ? t("guests", { guests: 5 }) : t("guests", { guests: main });
    if (ad) return `${main}+${ad} ${str}`;
    return `${main} ${str}`;
  };

  return (
    <Link
      className={s.houseWrapper}
      ref={ref}
      href={
        house_type
          ? `/${locale}/houses/${house_type}/${name}`
          : `/${locale}/houses/${name}`
      }
    >
      <div
        className={s.imageWrapper}
      >
        <Image
          fill
          src={cover_photo}
          alt={t('altText', { title })}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className={s.content}>
        <div className={s.titleWrapper}>
          <Icon name="house" className={s.houseIcon} />
          <h3
            className={s.title}
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          ></h3>
        </div>
        {!!rental_price ? (
          <div className={s.priceWrapper}>
            <Icon name="pocket" className={s.pocketIcon} />
            <span className={s.price}>
              {t("rateBase", { price: rental_price })}
            </span>
          </div>
        ) : null}
        <div className={s.guestsWrapper}>
          {rooms ? (
            <span className={s.guests}>{t('roomsAmount', { amount: rooms })}</span>
          ) : (
            <>
              <Icon name="guests" className={s.guestsIcon} />
              {!!rental_price ? (
                <span className={s.guests}>
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
            tabIndex={-1}
          />
        </div>
      </div>
      {/* <button
        className={s.favoriteWrapper}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <FavoriteIcon
          className={`${s.favoriteIcon} ${isFavorite ? s.isFavorite : ""}`}
        />
      </button> */}
    </Link>
  );
});

export default HouseItem;
