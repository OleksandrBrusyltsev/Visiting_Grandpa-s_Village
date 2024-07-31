"use client";
import Image from "next/image";
import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import s from "./Booking.module.scss";
import { useTranslations } from "next-intl";
import NumberInput from "../../ui/NumberInput/NumberInput";
import { useEffect, useState } from "react";

type Props = {
  price: number;
  guests: number;
  addons: number;
  photoDecor: string;
  treesDecor: string;
  priceAddons:
    | boolean
    | {
        adult: number;
        child: number;
      };
  rooms: HouseItem[];
};
const initialState = {
  adultsCount: 0,
  childrenCount: 0,
};
function GuestsBlock({
  adults,
  setAdults,
  child,
  setChild,
  priceAddons,
  maxAddons,
}: {
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  child: number;
  setChild: React.Dispatch<React.SetStateAction<number>>;
  priceAddons: {
    adult: number;
    child: number;
  };
  maxAddons: number;
}) {
  const t = useTranslations("HouseItem");

  return (
    <>
      <NumberInput
        count={adults}
        setCount={setAdults}
        max={maxAddons - child}
        min={0}
      >
        <div className={s.guestsWrapper}>
          <Icon name="guests-houses" className={s.iconGuests} />
          <p className={s.textGuests}>
            {t("adultGuestAddons", { rate: priceAddons.adult })}
          </p>
        </div>
      </NumberInput>
      <NumberInput
        count={child}
        setCount={setChild}
        max={maxAddons - adults}
        min={0}
      >
        <div className={s.guestsWrapper}>
          <Icon name="guests-houses" className={s.iconGuests} />
          <p className={s.textGuests}>
            {t("childGuestAddons", { rate: priceAddons.child })}
          </p>
        </div>
      </NumberInput>
    </>
  );
}

export default function Booking({
  price,
  guests,
  addons,
  photoDecor,
  treesDecor,
  priceAddons,
  rooms,
}: Props) {
  const t = useTranslations("HouseItem");
  const [adultsCount, setAdultsCount] = useState<number>(
    initialState.adultsCount
  );
  const [childrenCount, setChildrenCount] = useState<number>(
    initialState.childrenCount
  );
  const [total, setTotal] = useState<number>(price);

  useEffect(() => {
    if (typeof priceAddons === "object") {
      setTotal(
        () =>
          price +
          adultsCount * priceAddons.adult +
          childrenCount * priceAddons.child
      );
    }
  }, [adultsCount, childrenCount]);

  return (
    <section className={s.sectionWrapper}>
      <div className={s.imageDecorWrapper}>
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
      {/* <div className={`${s.bookingWrapper} ${addons ? s.addons : s.simple}`}> */}
      <div className={`${s.bookingWrapper} ${s.simple}`}>
        <div className={s.priceWrapper}>
          <div className={s.iconPrice}>
            <Icon name="price-houses" />
          </div>
          <p className={s.textPrice}>
            {/* {priceAddons
              ? t("rateBaseExt", { price, guests })
              : t("rateBase", { price })} */}
            {t("rateBase", { price })}
          </p>
        </div>

        {/* {addons ? (
          <p className={s.addonsTitle}>
            {t("additionalGuests", { guests: addons })}
          </p>
        ) : null} */}

        {/* {addons ? (
          <>
            <GuestsBlock
              adults={adultsCount}
              setAdults={setAdultsCount}
              child={childrenCount}
              setChild={setChildrenCount}
              priceAddons={
                priceAddons as {
                  adult: number;
                  child: number;
                }
              }
              maxAddons={addons}
            />
            <p className={s.textTotal}>
              {t("total.text")}
              <span className={s.total}>{t("total.currency", { total })}</span>
            </p>
          </>
        ) : (
          <div className={s.guestsWrapper}>
            <div className={s.iconGuests}>
              <Icon name="guests-houses" />
            </div>
            <p className={s.textGuests}>{t("guests", { guests })}</p>
          </div>
        )} */}
        <div className={s.guestsWrapper}>
          <div className={s.iconGuests}>
            <Icon name="guests-houses" />
          </div>
          <p className={s.textGuests}>{t("guests", { guests })}</p>
        </div>

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
          <Button label={t("book")} size="large" type="button" />
        </div>
      </div>
    </section>
  );
}
