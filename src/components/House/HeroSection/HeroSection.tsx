import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Icon from "../../ui/Icon/Icon";

import s from "./HeroSection.module.scss";

type Props = { text: string };

const HeroSection: FC<Props> = ({ text }) => {
  const t = useTranslations("HouseItem");
  return (
    <div className={`${s.heroSectionWrapper}`}>
      <div className={s.hero}>
        <p className={s.description}>{t('heroQuote', { text })}</p>
        <div className={s.curve}>
          <Icon name="curve-house" />
        </div>
        <div className={s.grandpa}>
          <Image
            fill
            alt=""
            src="/images/grandpas/Grandpa1.png"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
export default HeroSection;