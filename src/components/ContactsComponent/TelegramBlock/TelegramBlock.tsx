"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../ui/Icon/Icon";
import Map from "../../../../public/images/contacts/map.png";
import s from "./TelegramBlock.module.scss";

const TelegramBlock: FC = () => {
  return (
    <div className={s.telegramWrapper}>
      <h1 className={s.telegramTitle}>Зв’язатись з Дідусем</h1>
      <p className={s.telegramText}>
        Незважаючи на поважний вік твій Дідусь дуже сучасний, тому має
        <span className={s.telegramTextBold}>&#x20;Telegram-bot&#x20;</span>,
        знаю як ти любиш корисні зручні сервіси.
      </p>
      <Image src={Map} alt="map" className={s.map} />
      <div className={s.telegramLinkWrapper}>
        <p className={s.telegramLinkText}>
          Скористайся, щоб забронювати будиночок, або запитати
        </p>
        <Link href="#" className={s.telegramBotLink}>
          <Icon name="telegram" className={s.telegramIcon} />
          <p className={s.telegramIconText}>Чат-Бот</p>
        </Link>
      </div>
    </div>
  );
};

export default TelegramBlock;
