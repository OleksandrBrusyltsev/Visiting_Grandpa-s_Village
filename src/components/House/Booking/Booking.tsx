"use client";
import Image from "next/image";
import { forwardRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import NumberInput from "../../ui/NumberInput/NumberInput";

import s from "./Booking.module.scss";

// type Props = {
//   rental_price: number;
//   max_adults: number;
//   titleText: string;
//   extra_adults: number;
//   extra_children: number;
//   extra_adult_price: number;
//   extra_children_price: number;
//   photoDecor: string;
//   treesDecor: string;
//   rental_price: number;
//   max_adults: number;
//   titleText: string;
// };
type CommonProps = Pick<HouseItem,
  'rental_price' |
  'max_adults' |
  'extra_adults' |
  'extra_children' |
  'extra_adult_price' |
  'extra_children_price' |
  'photoDecor' |
  'treesDecor'>;
type Props = CommonProps  & {
  titleText: string
}

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
  rental_price,
  max_adults,
  titleText,
  extra_adults,
  extra_children,
  extra_adult_price,
  extra_children_price,
  photoDecor,
  treesDecor,
}, ref) {
  const t = useTranslations("HouseItem");
  const { push } = useRouter();
  const locale = useLocale();
  const params = useParams();
  const isRoom = "room" in params;
  
  const getGuestaObj = () => {
    let guests: {
      extra_guests?: number;
      extra_adults?: number;
      extra_children?: number;
    } = {};
    
    extra_children ? guests = { extra_children, extra_guests: 0, extra_adults } : guests = { extra_children: 0, extra_guests: extra_adults, extra_adults:0 }
    
    return guests
  }

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
          <p className={s.textPrice}>{t("rateBase", { price: rental_price })}</p>
        </div>
        <div className={s.guestsWrapper}>
          <div className={s.iconGuests}>
            <Icon name="guests-houses" />
          </div>
          <p className={s.textGuests}>{max_adults}{" "}{t('guests', {guests: max_adults})}</p>
        </div>
        {extra_adults ? (
          <p className={s.textGuestsNote}>{t('guestsNote', getGuestaObj())}</p>
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
            onClick={() => push(`/${locale}/booking?house=${titleText}`)}
          />
        </div>
      </div>
    </section>
  );
})
export default Booking;