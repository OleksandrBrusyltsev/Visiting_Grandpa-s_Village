"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

import css from "./Navigation.module.scss";

import { navigationLinks } from "@/data/header/navigationData";
import { usePathname } from "next/navigation";



const Navigation = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <ul className={`${css.list} container`}>
      {navigationLinks.map(({ id, link, text }) => (
        <li
          key={id}
          data-text={text}
          className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.active : ''}`}
        >
          <Link href={`/${locale}/${link}`}>{text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
