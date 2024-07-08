import Image from "next/image";
import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import s from "./Booking.module.scss";

type Props = { price: number; guests: number; photoDecor: string };

export default async function Booking({ price, guests, photoDecor }: Props) {
  return (
    <section className={s.sectionWrapper}>
      <div className={s.imageDecorWrapper}>
        <div className={s.imageDecor}>
          <Image
            width={188}
            height={144}
            alt="house decor"
            // src="/images/houses/house/house-decor.svg"
            src={photoDecor}
            className={s.image}
          />
        </div>
      </div>
      <div className={s.bookingWrapper}>
        <div className={s.info}>
          <div className={s.priceWrapper}>
            <Icon name="price-houses" className={s.iconPrice} />
            <p className={s.textPrice}>{price}</p>
            <p>грн/ніч</p>
          </div>
          <div className={s.guestsWrapper}>
            <Icon name="guests-houses" className={s.iconGuests} />
            <p className={s.textGuests}>{guests}</p>
            <p>людини</p>
          </div>
          <div className={s.timeWrapper}>
            <div>
              <p>Час заїзду:</p>
              <p>14:00</p>
            </div>
            <div>
              <p>Час виїзду:</p>
              <p>12:00</p>
            </div>
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <Button label={"Забронювати"} type="button" />
        </div>
      </div>
    </section>
  );
}
