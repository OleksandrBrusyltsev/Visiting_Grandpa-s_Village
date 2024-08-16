import { FC } from "react";
import Image from "next/image";
import Pin from "./Pin/Pin";
import Icon from "../../ui/Icon/Icon";
import PinProps from "../../../types/pin";
import s from "./Map.module.scss";

type Props = {
  locale: string;
  coordinates: PinProps;
};

const Map: FC<Props> = ({ locale, coordinates }) => {
  return (
    <div className={`${s.mapWrapper}`}>
      <div className={s.map}>
        <Image
          fill
          alt={
            locale === "en"
              ? "Map of Grandpa's houses"
              : "Карта еко садиби Дідуся"
          }
          src="/images/backgrounds/illustration-map.png"
          sizes="100vw"
          className={s.mapImage}
        />
      </div>
      <div className={s.cloudBackground}>
        <Icon name="house-cloud" className={s.cloud} />
      </div>
      {coordinates ? (
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
      ) : null}
    </div>
  );
};

export default Map;
