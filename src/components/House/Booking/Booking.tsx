"use client";
import Image from "next/image";
import { forwardRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import NumberInput from "../../ui/NumberInput/NumberInput";

import s from "./Booking.module.scss";

type Props = {
  price: number;
  guests: number;
  addGuests: {
    adult: number;
    twoChildAsAdult: boolean;
  };
  title: string;
  photoDecor: string;
  treesDecor: string;
  priceAddons:
    | boolean
    | {
        adult: number;
        child: number;
      };
  rooms: HouseItem[];
  isRoom?: boolean;
};

// function GuestsBlock({
//   adults,
//   setAdults,
//   child,
//   setChild,
//   priceAddons,
//   maxAddons,
// }: {
//   adults: number;
//   setAdults: React.Dispatch<React.SetStateAction<number>>;
//   child: number;
//   setChild: React.Dispatch<React.SetStateAction<number>>;
//   priceAddons: {
//     adult: number;
//     child: number;
//   };
//   maxAddons: number;
// }) {
//   const t = useTranslations("HouseItem");
//   return (
//     <>
//       <NumberInput
//         count={adults}
//         setCount={setAdults}
//         max={maxAddons - child}
//         min={0}
//       >
//         <div className={s.guestsWrapper}>
//           <Icon name="guests-houses" className={s.iconGuests} />
//           <p className={s.textGuests}>
//             {t("adultGuestAddons", { rate: priceAddons.adult })}
//           </p>
//         </div>
//       </NumberInput>
//       <NumberInput
//         count={child}
//         setCount={setChild}
//         max={maxAddons - adults}
//         min={0}
//       >
//         <div className={s.guestsWrapper}>
//           <Icon name="guests-houses" className={s.iconGuests} />
//           <p className={s.textGuests}>
//             {t("childGuestAddons", { rate: priceAddons.child })}
//           </p>
//         </div>
//       </NumberInput>
//     </>
//   );
// }

const Booking = forwardRef<HTMLDivElement, Props>(function Booking({
  price,
  guests,
  addGuests,
  title,
  photoDecor,
  treesDecor,
  priceAddons,
  rooms,
  isRoom = false,
}, ref) {
  const t = useTranslations("HouseItem");
  const { push } = useRouter();
  const locale = useLocale();
  
  const note = `*можливо додати ${addGuests.adult}${addGuests.adult < 2 && addGuests.twoChildAsAdult ?
     ' дорослого' : 
     addGuests.adult < 2 && !addGuests.twoChildAsAdult ?
                   ' гостя' : 'х гостей'}${addGuests.twoChildAsAdult ?
                             ` або ${addGuests.adult * 2}х дітей` : ''}`;

  return (
    <section className={s.sectionWrapper} ref={ref}>
      <div className={`${s.imageDecorWrapper} ${isRoom ? s.apartment : ""}`}>
        <div
          className={s.imageDecor}
          style={
            {
              "--background-image-url": `url(${treesDecor})`,
            } as React.CSSProperties
          }
        >
          <Image
            width={188}
            height={144}
            alt="house decor"
            src={photoDecor}
            className={s.image}
          />
        </div>
      </div>
      <div className={`${s.bookingWrapper} ${s.simple}`}>
        <div className={s.priceWrapper}>
          <div className={s.iconPrice}>
            <Icon name="price-houses" />
          </div>
          <p className={s.textPrice}>{t("rateBase", { price })}</p>
        </div>
        <div className={s.guestsWrapper}>
          <div className={s.iconGuests}>
            <Icon name="guests-houses" />
          </div>
          <p className={s.textGuests}>{guests}{" "}{t('guests', {guests})}</p>
        </div>
        {addGuests.adult ? (
          <p className={s.textGuestsNote}>{note}</p>
        ) : null}

        <div className={s.timeWrapper}>
          <div>
            <p>{t("checkInTime.text")}</p>
            <p>{t("checkInTime.time")}</p>
          </div>
          <div>
            <p>{t("checkOutTime.text")}</p>
            <p>{t("checkOutTime.time")}</p>
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <Button
            label={t("book")}
            size="large"
            type="button"
            onClick={() => push(`/${locale}/booking?house=${title}`)}
          />
        </div>
      </div>
    </section>
  );
})
export default Booking;