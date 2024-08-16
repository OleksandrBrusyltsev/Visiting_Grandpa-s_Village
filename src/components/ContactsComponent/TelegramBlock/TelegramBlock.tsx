"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import IconTelegram from "../../../assets/icons/icon-telegram.svg";
import Map from "../../../../public/images/contacts/map.png";
import s from "./TelegramBlock.module.scss";

type TelegramBlockProps = {
  telegramTitleRef: React.RefObject<HTMLHeadingElement>;
  telegramTextRef: React.RefObject<HTMLParagraphElement>;
  mapRef: React.RefObject<HTMLImageElement>;
  telegramLinkWrapperRef: React.RefObject<HTMLDivElement>;
};

const TelegramBlock: FC<TelegramBlockProps> = ({
  telegramTitleRef,
  telegramTextRef,
  mapRef,
  telegramLinkWrapperRef,
}) => {
  return (
    <>
      <h1 className={s.telegramTitle} ref={telegramTitleRef}>
        Зв’язатись з Дідусем
      </h1>
      <div className={s.telegramWrapper}>
        <p className={s.telegramText} ref={telegramTextRef}>
          Незважаючи на поважний вік твій Дідусь дуже сучасний, тому має
          <span className={s.telegramTextBold}>&#x20;Telegram-bot&#x20;</span>,
          знаю як ти любиш корисні зручні сервіси.
        </p>
        <Image src={Map} alt="map" className={s.map} ref={mapRef} />
        <div className={s.telegramLinkWrapper} ref={telegramLinkWrapperRef}>
          <p className={s.telegramLinkText}>
            Скористайся, щоб забронювати будиночок, або запитати
          </p>
          <Link
            href="https://t.me/VisitingGrandpasVillage_Operator"
            className={s.telegramBotLink}
          >
            <svg className={s.telegramIcon}>
              <use xlinkHref="/sprite.svg#telegram" />
            </svg>
            <p className={s.telegramIconText}>Чат-Бот</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TelegramBlock;
