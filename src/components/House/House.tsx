import { getLocale } from "next-intl/server";
import { getData } from "@/actions/getData";
import Image from "next/image";
import Booking from "./Booking/Booking";
import Gallery from "./Gallery/Gallery";
import Pin from "./Pin/Pin";
import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "../../data/houses/MarkdownPreview";
import s from "./House.module.scss";

type Props = { id: string };

export default async function House({ id }: Props) {
  const locale = await getLocale();
  const data: HouseItem[] = await getData<HouseItem[]>("houses");
  const house = data.find((item) => item.name === id);

  if (!house) {
    return <p>House not found</p>;
  }

  const { swiper, rental_price, max_adults, max_children, photoDecor, text, coordinates, price_addons, rooms } =
    house;
  const title = house.title.filter((item) => item.language === locale)[0].text;

  return (
    <div className={s.sectionWrapper}>
      <div className={s.arrowBlockWrapper}>
        <p className={s.textDecor}>
          &quot;Гортай, щоб побачити більше фото.&quot;
        </p>
        <div className={s.arrowWrapper}>
          <Icon name="arrow-house-small" />
        </div>
      </div>

      <div className={s.galleryWrapper}>
        <Gallery pictures={swiper} />
      </div>

      <div className={s.contentWrapper}>
        <div className={s.textWrapper}>
          <h1 className={s.headline}>{title}</h1>
          <p className={s.text}>
            <MarkdownPreview markdown={text} />
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
        {rooms.length ? null : 
          <Booking
          price={rental_price}
          priceAddons={price_addons}
          rooms={rooms}
          guests={max_adults}
          addons={max_children}
          photoDecor={photoDecor}/>
        }
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
        <Pin
          top={coordinates.top}
          left={coordinates.left}
          topSmall={coordinates.topSmall}
          leftSmall={coordinates.leftSmall}
          topSmallDifference={coordinates.topSmallDifference}
          leftSmallDifference={coordinates.leftSmallDifference}
          topMedium={coordinates.topMedium}
          leftMedium={coordinates.leftMedium}
          topMediumDifference={coordinates.topMediumDifference}
          leftMediumDifference={coordinates.leftMediumDifference}
          topLarge={coordinates.topLarge}
          leftLarge={coordinates.leftLarge}
        />
      </div>
    </div>
  );
}
