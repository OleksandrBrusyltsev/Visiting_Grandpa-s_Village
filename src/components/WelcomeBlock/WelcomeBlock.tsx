import Image from "next/image";
import Button from "../ui/Button/Button";
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
  );
};

export default WelcomeBlock;
