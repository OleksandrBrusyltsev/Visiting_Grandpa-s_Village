"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Map from "../../../../public/images/contacts/map.png";
import MarkdownPreview from "@/components/ui/MarkdownPreview/MarkdownPreview";

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
  const t = useTranslations('Contacts');

  return (
    <>
      <h1 className={s.telegramTitle} ref={telegramTitleRef}
        dangerouslySetInnerHTML={{
          __html: t('title'),
        }}
      >
      </h1>
      <div className={s.telegramWrapper}>
        <div className={s.telegramText} ref={telegramTextRef}>
          <MarkdownPreview markdown={
            t('text1')
          } />
        </div>
        <Image src={Map} alt="" className={s.map} ref={mapRef} />
        <div className={s.telegramLinkWrapper} ref={telegramLinkWrapperRef}>
          <div className={s.telegramLinkText}>
            <MarkdownPreview markdown={
              t('text2')
            } />
          </div>
          <Link
            href="https://t.me/VisitingGrandpasVillage_Operator"
            className={s.telegramBotLink}
          >
            <svg className={s.telegramIcon}>
              <use xlinkHref="/sprite.svg#telegram" />
            </svg>
            <p className={s.telegramIconText}>{t('text3')}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TelegramBlock;
