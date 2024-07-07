import { getLocale } from "next-intl/server";
import { getData } from "@/actions/getData";
import Image from "next/image";
import Booking from "./Booking";
// import Button from "../ui/Button/Button";
import Swiper from "./Swiper";
import s from "./House.module.scss";
import Icon from "../ui/Icon/Icon";
// import Houses from "@/components/Houses/Houses";

type Props = { id: string };

export default async function House({ id }: Props) {
  const locale = await getLocale();
  const data: HouseItem[] = await getData<HouseItem[]>("houses");
  const house = data.find((item) => item.name === id);
  // console.log(house);

  if (!house) {
    return <p>House not found</p>;
  }

  const { swiper, rental_price, max_adults } = house;
  const title = house.title.filter((item) => item.language === locale)[0].text;
  // console.log(house);

  return (
    <section className={s.sectionWrapper}>
      <div className={s.arrowBlockWrapper}>
        <p className={s.textDecor}>
          &quot;Гортай, щоб побачити більше фото.&quot;
        </p>
        <div className={s.arrowWrapper}>
          <Icon name="arrow-house-small" />
        </div>
      </div>

      <Swiper pictures={swiper} />
      {/* <div
        style={{
          height: "550px",
          border: "1px solid black",
          // margin: "21px 40px 0px",
        }}
      ></div> */}

      <div className={s.contentWrapper}>
        <div className={s.textWrapper}>
          <h1 className={s.headline}>{title}</h1>
          <p className={s.text}>
            <span>
              Запрошую тебе в чарівну хатинку Діда Мороза. Це місце, де в
              справжній казці зливаються екологічність та відпочинок в
              комфортних умовах. В Хатинці є все, що потрібно : ванна кімната з
              душем та туалетом, холодильник і телевізор.
            </span>
            <span>
              Наша хатинка розташована серед природи, в обіймах пишних ялинок та
              зелених дерев. Фасад оформлений натуральними матеріалами,
              включаючи дерево та природні складники. Декорування відображає
              традиційний стиль українського села, що приваблює як маленьких так
              і великих гостей.
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
        <Booking price={rental_price} guests={max_adults} />
      </div>

      <div className={s.heroSectionWrapper}>
        <div className={s.hero}>
          <p className={s.description}>
            &quot;Побудував я Хатинку Діда Мороза тут.&quot;
          </p>
          <Icon name="curve-house" className={s.curve} />
          <div className={s.grandpa}>
            <Image
              fill
              alt="Friendly Grandpa"
              src="/images/grandpas/Grandpa1.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div className={s.mapWrapper}>
        <div className={s.map}>
          <Image
            fill
            alt={
              locale === "en"
                ? "Map of Grandpa's houses"
                : "Карта еко садиби Дідуся"
            }
            src="/images/houses/house/illustration-map.png"
            className={s.mapImage}
          />
        </div>
        <div className={s.cloudBackground}>
          <Icon name="house-cloud" className={s.cloud} />
        </div>
        <div className={s.pin}>
          <Image
            fill
            alt={locale === "en" ? "pin" : "мітка"}
            src="/images/houses/house/Shape.png"
          />
        </div>
      </div>
    </section>
  );
}
