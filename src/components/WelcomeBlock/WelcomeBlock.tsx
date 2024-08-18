import Image from "next/image";
import Button from "../ui/Button/Button";
<<<<<<< HEAD
import s from "./WelcomeBlock.module.scss";

const image = "/images/home/welcomeBlock-70.jpg";
const alt = "Landscape picture";

const WelcomeBlock: React.FC = () => {
  return (
    <>
      {" "}
    
      <div className={s.blockWrapper}>
        <div className={s.textWrapper}>
          <p>Найкращий час для відпочинку - зараз</p>
        </div>
        <div className={s.imageWrapper}>
          <Image
            src={image}
            alt={alt}
            fill={true}
            priority
            className={s.image}
          />
        </div>

        <div className={s.buttonWrapper}>
          <Button size="large" label="Завітати" className={s.button} />
        </div>
      </div>
    </>
=======
import WelcomeBlockType from "../../types/welcomeBlock";
import style from "./WelcomeBlock.module.scss";
import Link from "next/link";
import { useLocale } from "next-intl";

const image = "/images/home/welcomeBlock.jpg";
const alt = "Landscape picture";

const WelcomeBlock: React.FC<WelcomeBlockType> = ({ text }) => {
  const locale = useLocale();
  return (
    <div className={style.blockWrapper}>
      <div className={style.textWrapper}>
        <p>{text}</p>
      </div>
      <div className={style.imageWrapper}>
        <Image
          src={image}
          alt={alt}
          sizes='(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw'
          fill={true}
          priority
          className={style.image}
        />
        <div className={style.buttonWrapper}>
          <Link href={`/${locale}/booking`}>
            <Button size="large" label="Завітати" className={style.button} />
          </Link>
        </div>
      </div>
    </div>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  );
};

export default WelcomeBlock;
