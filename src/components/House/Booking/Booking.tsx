"use client";
import Image from "next/image";
import { forwardRef } from "react";
import { useLocale } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";

import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import { useTranslations } from "@/hooks/useTranslations";

import s from "./Booking.module.scss";

type CommonProps = Pick<HouseItem,
  'rental_price' |
  'max_adults' |
  'extra_adults' |
  'extra_children' |
  'photoDecor' |
  'treesDecor'>;
type Props = CommonProps & {
  titleText: string;
  lang?: Language
}

const getGuestsObj = (extra_adults: number, extra_children: number) => {
  let guests: {
    extra_guests?: number;
    extra_adults?: number;
    extra_children?: number;
  } = {};
  //По просьбе заказчика логика (тут + в файлах с переводами) построена таким образом, что допместа для детей не могут быть сами по себе. 
  //Только как альтернатива для замены 1 взрослого допместа на 2 детских. И только в некоторых домиках, которые известны заказчику
  //Для этого в таком домике необходимо указать 1 взрослое допместо и 2 допместа для детей, или 2 и 4 соответственно
  guests = extra_children ? { extra_children, extra_guests: 0, extra_adults } :
    { extra_children: 0, extra_guests: extra_adults, extra_adults: 0 }

  return guests
}

const Booking = forwardRef<HTMLElement, Props>(function Booking({
  rental_price,
  max_adults,
  titleText,
  extra_adults,
  extra_children,
  photoDecor,
  treesDecor,
  lang,
}, ref) {
  const { push } = useRouter();
  const locale = useLocale();
  const params = useParams();
  const isRoom = "room" in params;

  //допнастройки для того, чтобы: 
  //1) убрать обработку клика на [Забронювати] в версии для админки;
  //2) обеспечить поддержку перевода в админке 
  const pathName = usePathname();
  const isAdmin = pathName.includes("dyadus_adm1n_hub");

  const t = useTranslations("HouseItem", lang, isAdmin);

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
          <p className={s.textGuests}>{max_adults}{" "}{t('guests', { guests: max_adults })}</p>
        </div>
        {extra_adults ? (
          <p className={s.textGuestsNote}>{extra_adults && t('guestsNote', getGuestsObj(extra_adults, extra_children))}</p>
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
            onClick={() => {
              if (isAdmin) return
              push(`/${locale}/booking?house=${titleText}`)
            }}
          />
        </div>
      </div>
    </section>
  );
})
export default Booking;