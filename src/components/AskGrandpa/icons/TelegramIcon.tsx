import { FC } from "react";
import telegramIcon from "../../../assets/icons/askGrandpa/telegramIcon";
import style from "../AskGrandpa.module.scss";

const TelegramIcon: FC = () => {
  return <div className={style.iconTelegram}>{telegramIcon}</div>;
};

export default TelegramIcon;
