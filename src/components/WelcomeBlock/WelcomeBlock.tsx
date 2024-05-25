import Image from "next/image";
import Button from "../ui/Button/Button";
import WelcomeBlockType from "../../types/welcomeBlock";
import style from "./WelcomeBlock.module.scss";

const image = "/images/home/welcomeBlock-70.jpg";
const alt = "Landscape picture";

const WelcomeBlock: React.FC<WelcomeBlockType> = ({ text }) => {
  return (
    <div className={style.blockWrapper}>
      <div className={style.textWrapper}>
        <p>{text}</p>
      </div>
      <div className={style.imageWrapper}>
        <Image
          src={image}
          alt={alt}
          fill={true}
          priority
          className={style.image}
        />
      </div>
      <div className={style.buttonWrapper}>
        <Button size="large" label="Завітати" className={style.button} />
      </div>
    </div>
  );
};

export default WelcomeBlock;
