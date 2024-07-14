import { FC } from "react";
import Image from "next/image";
import Pin from "./Pin/Pin";
import Icon from "../../ui/Icon/Icon";
import s from "./Map.module.scss";

type Props = {
  locale: string;
  coordinates: {
    topSmall: number;
    leftSmall: number;
    topSmallDifference: number;
    leftSmallDifference: number;
    topMedium: number;
    leftMedium: number;
    topMediumDifference: number;
    leftMediumDifference: number;
    topLarge: number;
    leftLarge: number;
  };
};

const Map: FC<Props> = ({ locale, coordinates }) => {
  return (
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
      {coordinates ? (
        <Pin
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
