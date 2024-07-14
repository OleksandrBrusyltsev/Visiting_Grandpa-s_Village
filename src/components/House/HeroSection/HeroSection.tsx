import { FC } from "react";
import Image from "next/image";
import Icon from "../../ui/Icon/Icon";
import s from "./HeroSection.module.scss";

const HeroSection: FC = () => {
  return (
    <div className={`${s.heroSectionWrapper} container`}>
      <div className={s.hero}>
        <p className={s.description}>
          &quot;Побудував я Хатинку Діда Мороза тут.&quot;
        </p>
        <div className={s.curve}>
          <Icon name="curve-house" />
        </div>
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
  );
};

export default HeroSection;
