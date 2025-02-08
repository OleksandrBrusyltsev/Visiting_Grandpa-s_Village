import Image from "next/image";
import { useContext } from "react";

import Icon from "../ui/Icon/Icon";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import MarkdownPreview from "../ui/MarkdownPreview/MarkdownPreview";

import s from "./MealsBlock.module.scss";
import { useLocale } from "next-intl";

type Props = {
  item: MealsItem;
  position: number;
};

export default function MealsBlock({ item, position }: Props) {
  const locale = useLocale() as Language;
  const { title, description, photos } = item;
  const { isMobile } = useContext(MatchMediaContext);

  return (
    <div className={s.mealsBlockWrapper}>
      <h2 className={s.mealsTitle}
        dangerouslySetInnerHTML={{ __html: title[locale] }}
      />
      <div className={s.mealsDescriptionWrapper}>
        {position !== 0 && isMobile ? (
          <div className={s.mainPhoto}>
            <Image
              src={photos[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
              fill
            />
          </div>
        ) : null}
        <div className={s.mealsDescription}>
          <MarkdownPreview markdown={description[locale]} />
        </div>
      </div>
      {position === 0 || !isMobile ? (
        <div className={s.mainPhoto}>
          <Image
            src={photos[0]}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
            fill
          />
        </div>
      ) : null}
      <div className={s.topPhoto}>
        <Image
          src={photos[1]}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
        />
      </div>
      <div className={s.bottomPhoto}>
        <Image
          src={photos[2]}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
        />
      </div>
      {position !== 2 ? (
        <Icon
          name={position === 0 ? "curve-meals-middle" : "curve-meals-768"}
          className={s.mealsCurve}
        />
      ) : null}
    </div>
  );
}
