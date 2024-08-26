import Image from "next/image";
import { useContext } from "react";

import Icon from "../ui/Icon/Icon";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import MarkdownPreview from "../../functions/MarkdownPreview";

import s from "./MealsBlock.module.scss";

type Props = {
  item: MealsItem;
  position: number;
};

export default function MealsBlock({ item, position }: Props) {
  const { title, description, photo } = item;
  const { isMobile } = useContext(MatchMediaContext);

  return (
    <div className={s.mealsBlockWrapper}>
      <h2 className={s.mealsTitle}>{title}</h2>
      <div className={s.mealsDescriptionWrapper}>
        {position !== 0 && isMobile ? (
          <div className={s.mainPhoto}>
            <Image
              src={photo[0]}
              alt={`${photo[0]} image`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
              fill
            />
          </div>
        ) : null}
        {/* <p
          className={s.mealsDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        /> */}
        <p className={s.mealsDescription}>
          <MarkdownPreview markdown={description} />
        </p>
      </div>
      {position === 0 || !isMobile ? (
        <div className={s.mainPhoto}>
          <Image
            src={photo[0]}
            alt={`${photo[0]} image`}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
            fill
          />
        </div>
      ) : null}
      <div className={s.topPhoto}>
        <Image
          src={photo[1]}
          alt={`${photo[1]} image`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
        />
      </div>
      <div className={s.bottomPhoto}>
        <Image
          src={photo[2]}
          alt={`${photo[2]} image`}
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
