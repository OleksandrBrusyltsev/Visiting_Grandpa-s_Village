"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Icon from "../../ui/Icon/Icon";
import Map from "../../../../public/images/contacts/map.png";
import s from "./TelegramBlock.module.scss";

const TelegramBlock: FC = () => {
  const telegramTitle = useRef<HTMLHeadingElement>(null);
  const telegramText = useRef<HTMLParagraphElement>(null);
  const map = useRef<HTMLImageElement>(null);
  const telegramLinkWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      telegramTitle.current,
      { x: "-100%" },
      { x: "0%", clearProps: "transform" }
    );
    gsap.fromTo(
      telegramText.current,
      { x: "-100%" },
      { x: "0%", duration: 1, clearProps: "transform" }
    );
    gsap.fromTo(
      map.current,
      { x: "100%" },
      { x: "0%", duration: 1, clearProps: "transform" }
    );
    gsap.fromTo(
      telegramLinkWrapper.current,
      { x: "-100%" },
      { x: "0%", duration: 1, clearProps: "transform" }
    );
  });

  return (
    <>
      <h1 className={s.telegramTitle} ref={telegramTitle}>
        Зв’язатись з Дідусем
      </h1>
      <div className={s.telegramWrapper}>
        <p className={s.telegramText} ref={telegramText}>
          Незважаючи на поважний вік твій Дідусь дуже сучасний, тому має
          <span className={s.telegramTextBold}>&#x20;Telegram-bot&#x20;</span>,
          знаю як ти любиш корисні зручні сервіси.
        </p>
        <Image src={Map} alt="map" className={s.map} ref={map} />
        <div className={s.telegramLinkWrapper} ref={telegramLinkWrapper}>
          <p className={s.telegramLinkText}>
            Скористайся, щоб забронювати будиночок, або запитати
          </p>
          <Link href="#" className={s.telegramBotLink}>
            <Icon name="telegram" className={s.telegramIcon} />
            <p className={s.telegramIconText}>Чат-Бот</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TelegramBlock;
