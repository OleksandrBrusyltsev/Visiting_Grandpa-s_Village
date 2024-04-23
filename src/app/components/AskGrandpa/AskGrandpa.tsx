import { FC } from "react";
import Icon from "../ui/Icon/Icon";
import style from "./AskGrandpa.module.scss";

const AskGrandpa: FC = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.headline}>запитати дідуся</p>
      <div className={style.iconsWrapper}>
        <Icon name="ask" className={style.iconAsk} />
        <Icon name="arrow" className={style.iconArrow} />
      </div>
    </div>
  );
};

export default AskGrandpa;
