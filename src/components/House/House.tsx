import { getLocale } from "next-intl/server";
import { getHouses } from "@/actions/getHouses";
import Image from "next/image";
import Booking from "./Booking";
// import Button from "../ui/Button/Button";
import s from "./House.module.scss";
import Icon from "../ui/Icon/Icon";

type Props = { id: string };

export default async function House({ id }: Props) {
  const locale = await getLocale();
  const data: HouseItem[] = await getHouses();
  const house = data.find((item) => item.name === id);
  // console.log(house);

  if (!house) {
    return <p>House not found</p>;
  }

  const { name, rental_price, max_adults } = house;
  const title = house.title.filter((item) => item.language === locale)[0].text;
  console.log(house);

  return (
    <section className={s.backgroundImages}>
      <p className={s.textDecor}>
        &quot;Гортай, щоб побачити більше фото.&quot;
      </p>
      <div className={s.arrowWrapper}>
        <Icon name="arrow-house-small" />
      </div>

      {/* slider */}
      <div
        style={{
          height: "270px",
          border: "1px solid black",
          marginTop: "21px",
        }}
      ></div>
      {/* slider */}

      <div className={s.textWrapper}>
        <h1 className={s.headline}>{title}</h1>
        <p className={s.text}>
          <span>
            Запрошую тебе в чарівну хатинку Діда Мороза. Це місце, де в
            справжній казці зливаються екологічність та відпочинок в комфортних
            умовах. В Хатинці є все, що потрібно : ванна кімната з душем та
            туалетом, холодильник і телевізор.
          </span>
          <span>
            Наша хатинка розташована серед природи, в обіймах пишних ялинок та
            зелених дерев. Фасад оформлений натуральними матеріалами, включаючи
            дерево та природні складники. Декорування відображає традиційний
            стиль українського села, що приваблює як маленьких так і великих
            гостей.
          </span>
          <span>
            Усередині хатинки тебе чекає затишне приміщення, розраховане на 2
            людей. Там кожна деталь наповнена моєю турботою.{" "}
          </span>
          <span>
            В зимовий період Хатинка Дідуся наповнюється особливо теплою
            атмосферою, бо я придумав створити в середині Баньку, щоб мої
            відвідувачі змогли розслабитись та сповна насолодитись часом,
            проведеним в Еко-садибі “На селі у Дідуся”.
          </span>
        </p>
        <div className={s.servicesWrapper}>
          <div className={s.iconWrapper}>
            <Icon name="house-bath" className={s.servicesIcon} />
          </div>
          <div className={s.iconWrapper}>
            <Icon name="house-tv" className={s.servicesIcon} />
          </div>
          <div className={s.iconWrapper}>
            <Icon name="house-car" className={s.servicesIcon} />
          </div>
          <div className={s.iconWrapper}>
            <Icon name="house-pan" className={s.servicesIcon} />
          </div>
        </div>
      </div>
      <div className={s.imageDecorWrapper}>
        <div className={s.imageDecor}>
          <Image
            // fill
            width={188}
            height={144}
            alt="house decor"
            src="/images/houses/house/house-decor.png"
            // sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
            className={s.image}
          />
        </div>
      </div>
      <Booking price={rental_price} guests={max_adults} />

      {/* ! */}
      {/* ! */}
      <section className={`${s.hero}`}>
        <div className={s.heroWrapper}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className={s.descr2}>"Побудував я Хатинку Діда Мороза тут."</p>
          <div className={s.grandpa}>
            <Image
              fill
              alt="Friendly Grandpa"
              src="/images/grandpas/Grandpa1.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <Icon name="curve-house" className={s.curve} />
          {/* <Icon name="curve-houses" className={s.curve} /> */}
        </div>
      </section>
      <section className={s.map}>
        <div className={s.mapWrapper}>
          <Image
            fill
            alt={
              locale === "en"
                ? "Map of Grandpa's houses"
                : "Карта еко садиби Дідуся"
            }
            src="/images/backgrounds/illustration-map.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
          />
        </div>
        <div className={s.cloudBackground}>
          <Icon name="house-cloud" className={s.cloud} />
          {/* <Icon name="pin" className={s.cloud} /> */}
        </div>
      </section>
      {/* ! */}
      {/* ! */}
    </section>
  );
}
