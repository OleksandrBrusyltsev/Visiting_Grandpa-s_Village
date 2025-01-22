import Image from "next/image";
import Button from "../ui/Button/Button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import style from "./WelcomeBlock.module.scss";
import { main } from "@/data/main";

const alt = "CTA picture";

const WelcomeBlock: React.FC<WelcomeBlockType> = ({ text }) => {
  const locale = useLocale();
  const tGlobal = useTranslations('UI');

  return (
    <div className={style.blockWrapper}>
      <div className={style.textWrapper}>
        <p>{text}</p>
      </div>
      <div className={style.imageWrapper}>
        <Image
          src={main[4].photos[0]}
          alt={alt}
          sizes='(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw'
          fill={true}
          priority
          className={style.image}
        />
        <div className={style.buttonWrapper}>
          <Link href={`/${locale}/booking`}>
            <Button size="large" label={tGlobal('visit')} className={style.button} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlock;
