"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import css from "./Navigation.module.scss";

import { navLinks as navigationLinks } from "@/data/navigationMenu";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const locale = useLocale();
  const t = useTranslations("UI");

  const pathname = usePathname();

  return (
    <ul className={`${css.list} container`}>
      {navigationLinks.map(({ id, link, label }) => (
        <li
          key={id}
          data-text={label[locale as keyof typeof label]}
          className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.active : ""
            }`}
        >
          {pathname === `/${locale}/${link}` ? (
            <p title={t('currLink')}>{label[locale as keyof typeof label]}</p>
          ) : (
            <Link href={`/${locale}/${link}`}>{label[locale as keyof typeof label]}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
