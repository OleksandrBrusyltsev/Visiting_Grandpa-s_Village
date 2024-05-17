import { FC } from "react";
// import Icon from "../../ui/Icon/Icon";
import iconAsk from "../../../assets/icons/askGrandpa/askIcon";
import style from "../AskGrandpa.module.scss";

const AskIcon: FC = () => {
  return <div className={style.iconAsk}>{iconAsk}</div>;
  // another way - using Icon + sprite
  // return <Icon name="ask" className={style.iconAsk} />;
};

export default AskIcon;
