"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import IconBack from "../../../assets/icons/icon-telegram.svg";
import s from "./TelegramBotLink.module.scss";

const TelegramBotLink: FC = () => {
  return (
    <div className={s.telegramWrapper}>
      <h1 className={s.telegramTitle}>Зв’язатись з Дідусем</h1>
      <p className={s.telegramText}>
        Незважаючи на поважний вік твій Дідусь дуже сучасний, тому має
        <span className={s.telegramTextBolt}>&#x20;Telegram-bot&#x20;</span>,
        знаю як ти любиш корисні зручні сервіси.
      </p>
      <div className={s.telegramLinkWrapper}>
        <p className={s.telegramLinkText}>
          Скористайся, щоб забронювати будиночок, або запитати чат-бот
        </p>
        <Link href="#" className={s.telegramBotLink}>
          <Image src={IconBack} alt="back" className={s.telegramIcon} />
          <p className={s.telegramIconText}>Чат-Бот</p>
        </Link>
      </div>
    </div>
  );
};

export default TelegramBotLink;
