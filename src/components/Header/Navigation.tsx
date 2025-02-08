"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import css from "./Navigation.module.scss";

import { navLinks as navigationLinks } from "@/data/navigationMenu";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const locale = useLocale() as Language;
  const t = useTranslations("UI");

  const pathname = usePathname();

  return (
    <ul className={`${css.list} container`}>
      {navigationLinks.map(({ id, link, label }) => (
        <li
          key={id}
          data-text={label[locale]}
          className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.active : ""
            }`}
        >
          {pathname === `/${locale}/${link}` ? (
            <p title={t('currLink')}>{label[locale]}</p>
          ) : (
            <Link href={`/${locale}/${link}`}>{label[locale]}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
