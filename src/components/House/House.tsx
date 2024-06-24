// import Image from "next/image";
// import {gallery} from '@/data/gallery/gallery.js'
import s from "./House.module.scss";
// import GalleryItem from "./GalleryItem";
// import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";

type Props = {};

export default async function House({}: Props) {
  // const data: GalleryItem[] = await getMemories();

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
        style={{ width: "329px", height: "270px", border: "1px solid black" }}
      ></div>
      {/* slider */}

      <div className={s.textWrapper}>
        <h1 className={s.headline}>Хатинка Діда Мороза</h1>
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
      </div>

      <div className={s.servicesWrapper}>
        <Icon name="bath" className={s.servicesIcon} />
        <Icon name="tv" className={s.servicesIcon} />
        <Icon name="parking" className={s.servicesIcon} />
        <Icon name="kitchen" className={s.servicesIcon} />
      </div>

      <div className={s.hero}>
        <div className={s.heroWrapper}>
          {/* <p className={s.descr2}>
            &quot;Побудував я Хатинку Діда Мороза тут.&quot;
          </p> */}
          {/* <div className={s.grandpa}>
            <Image
              fill
              alt="Friendly Grandpa"
              src="/images/memories/Grandpa1.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div> */}
        </div>
      </div>
      <div className={s.main}>
        <div className={s.callToAction}>
          {/* <div className={s.cloud}>
            <Icon name="cloud" />
          </div> */}
          <p className={s.slogan}>
            А далі створимо нові щасливі спогади разом.
          </p>
          {/* <Button
            label="Забронювати"
            type={"button"}
            className={s.btnCallToAction}
          /> */}
        </div>
      </div>
    </section>
  );
}
