"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import { useLocale, useTranslations } from "next-intl";
import { forwardRef, useContext } from "react";
import { MatchMediaContext } from "@/context/MatchMediaContext";

import Button from "../ui/Button/Button";

import s from "./GalleryItem.module.scss";

type Props = { data: GalleryItem };

const GalleryItem = forwardRef<HTMLAnchorElement, Props>(function GalleryItem(
  { data },
  ref
) {
  const locale = useLocale();
  const path = usePathname();
  const pathName = path.split('/')[2];
  const { isMobile, isTablet } = useContext(MatchMediaContext);
  const { name, cover, alt } = data;
  const title = data.title[locale as keyof typeof data.title];
  const t = useTranslations("UI");

  return (
    <Link
      className={s.itemWrapper}
      tabIndex={0}
      href={`/${locale}/${pathName}/${name}`}
      ref={ref}
    >
      <div className={s.imageWrapper}>
        <Image
          className={s.itemImage}
          src={cover}
          alt={alt[locale as keyof typeof alt]}
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
        />
      </div>
      <div className={s.titleWrapper}>
        <h2 className={s.itemTitle}>{title}</h2>
      </div>
      <div className={s.btnWrapper}>
        <Button
          label={isMobile || isTablet ? title : t('view')}
          type="button"
          tabIndex={-1}
        />
      </div>
    </Link>
  );
});
export default GalleryItem;
