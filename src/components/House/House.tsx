import { getLocale } from "next-intl/server";
import { getData } from "@/actions/getData";
import Image from "next/image";
import Booking from "./Booking/Booking";
import Gallery from "./Gallery/Gallery";
import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "../../functions/MarkdownPreview";
import s from "./House.module.scss";
import HouseItem from "../Houses/HouseItem";
import HousesList from "../Houses/HousesList";
import HeroSection from "./HeroSection/HeroSection";
import Map from "./Map/Map";

type Props = { id: string; isRoom?: boolean };

export default async function House({ id, isRoom = false }: Props) {
  const locale = await getLocale();

  const data: HouseItem[] = await getData<HouseItem[]>("houses");

  let house = data.find((item) => item.name === id);
  if (!house) {
    for (const item of data) {
      house = item.rooms.find((room) => room.name === id);
      if (house) {
        break;
      }
    }
  }

  if (!house) {
    return <p>House not found</p>;
  }

  const {
    photo,
    swiper,
    rental_price,
    guests,
    add_guests_variants,
    photoDecor,
    treesDecor,
    text,
    coordinates,
    price_addons,
    rooms,
  } = house;

  const title =  house.title.filter((item) => item.language === locale)[0].text;

  const decorText =  house.title.filter((item) => item.language === locale)[0].decorText;

  return (
    <div className={s.sectionWrapper}>
      {rooms.length ? null : (
        <div className={`${s.arrowBlockWrapper}`}>
          <p className={s.textDecor}>
            {/* &quot;Гортай, щоб побачити більше фото.&quot; */}
            &quot;Клікай на фото, щоб подивитись більше.&quot;
          </p>
          <div className={s.arrowWrapper}>
            <Icon name="arrow-house-small" />
          </div>
        </div>
      )}

      {rooms.length ? (
        <div className={s.apartmentGalleryWrapper}>
          <div className={s.imageWrapper}>
            <Image
              fill
              alt={title}
              src={photo[0]}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <p className={s.grandpaQuote}>
            &quot;Дивись, які гарні Хороми маю&quot;
          </p>

          <div className={s.imageGrandpa}>
            <Image
              fill
              alt="grandpa"
              src="/images/grandpas/Grandpa2.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div
            className={s.imageDecor}
            style={
              {
                "--background-image-url": `url(${treesDecor})`,
              } as React.CSSProperties
            }
          >
            <Image
              fill
              alt="house decor"
              src={photoDecor}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      ) : (
        <Gallery pictures={swiper} />
      )}

      <div className={`${s.contentWrapper} ${rooms.length ? s.apartment : ""}`}>
        <div className={s.textWrapper}>
          <h1 className={s.headline}>{title}</h1>
          <p className={s.text}>
            <MarkdownPreview markdown={text} />
          </p>
          {/* services icons */}
          {rooms.length ? null : (
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
          )}
        </div>
        {/* booking block */}
        {rooms.length ? null : (
          <Booking
            price={rental_price}
            priceAddons={price_addons}
            rooms={rooms}
            isRoom={isRoom}
            guests={guests}
            addGuests={add_guests_variants}
            title={title}
            photoDecor={photoDecor}
            treesDecor={treesDecor}
          />
        )}
      </div>

      {rooms.length ? (
        <HousesList data={rooms as HouseItem[]} patternOffset={false}>
          <>
            <p className={`${s.roomsTitle} ${rooms.length ? s.apartment : ""}`}>
              То ж маємо:
            </p>
            <div className={s.roomsWrapper}>
              {rooms.map((room: any) => (
                <HouseItem data={room} key={room.id} />
              ))}
            </div>
          </>
        </HousesList>
      ) : null}

      <HeroSection text={decorText} />
      <Map locale={locale} coordinates={coordinates} />
    </div>
  );
}
