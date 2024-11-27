import { FC } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Icon from "../../ui/Icon/Icon";
import { useTranslations } from "@/hooks/useTranslations";

import s from "./HeroSection.module.scss";

type Props = { text: string; lang?: Language };

const HeroSection: FC<Props> = ({ text, lang }) => {
  
  //допнастройки для того, чтобы обеспечить поддержку перевода в админке
  const pathName = usePathname();
  const isAdmin = pathName.includes("dyadus_adm1n_hub");
  const t = useTranslations("HouseItem", lang, isAdmin);
  
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