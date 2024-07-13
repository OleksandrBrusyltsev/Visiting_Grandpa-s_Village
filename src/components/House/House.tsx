import { getLocale } from "next-intl/server";
import { getData } from "@/actions/getData";
import Image from "next/image";
import Booking from "./Booking/Booking";
import Gallery from "./Gallery/Gallery";
import Pin from "./Pin/Pin";
import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "../../data/houses/MarkdownPreview";
import s from "./House.module.scss";
import HouseItem from "../Houses/HouseItem";
import HousesList from "../Houses/HousesList";

type Props = { id: string };

export default async function House({ id }: Props) {
  const locale = await getLocale();
  const data: HouseItem[] = await getData<HouseItem[]>("houses");
  const house = data.find((item) => item.name === id);

  if (!house) {
    return <p>House not found</p>;
  }

  const { photo, swiper, rental_price, max_adults, max_children, photoDecor, text, coordinates, price_addons, rooms } =
    house;
  const title = house.title.filter((item) => item.language === locale)[0].text;

  return (
    <div className={s.sectionWrapper}>
      {
        rooms.length ? null : <div className={`${s.arrowBlockWrapper} container`}>
          <p className={s.textDecor}>
            &quot;Гортай, щоб побачити більше фото.&quot;
          </p>
          <div className={s.arrowWrapper}>
            <Icon name="arrow-house-small" />
          </div>
        </div>
      }

      <div className={`${s.galleryWrapper} container`}>
        {
          rooms.length ? 
            <div className={s.apartmentGalleryWrapper}>

              <div className={s.imageWrapper}>
                <Image
                  fill
                  alt={title}
                  src={photo[0]}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>

              <p className={s.grandpaQuote}>&quot;Дивись, які гарні Хороми маю&quot;</p>

              <div className={s.imageGrandpa}>
                <Image
                  fill
                  alt="grandpa"
                  src='/images/grandpas/Grandpa2.png'
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className={s.imageDecor}>
                <Image
                  fill
                  alt="house decor"
                  src={photoDecor}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className={s.cloud}>
                <Icon name="house-cloud-decor" />
              </div>

            </div>: 
          <Gallery pictures={swiper} />
        }
      </div>

      <div className={`${s.contentWrapper} container`}>
        <div className={`${s.textWrapper}  ${rooms.length ? s.apartment : ''}`}>
          <h1 className={s.headline}>{title}</h1>
          <p className={s.text}>
            <MarkdownPreview markdown={text} />
          </p>
          {rooms.length ? null : 
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
         }
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

      {
        rooms.length ? 
          <HousesList data={rooms as HouseItem[]}>
            <>
              <p className={`${s.roomsTitle} ${rooms.length ? s.apartment : ''}`}>То ж маємо:</p>
              <div className={s.roomsWrapper}>
                {
                  rooms.map(room => <HouseItem data={room} key={room.id}/>)
                }
              </div>
            </>
          </HousesList> : 
        null
      }

      <div className={`${s.heroSectionWrapper} container`}>
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

      <div className={`${s.mapWrapper} container`}>
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
