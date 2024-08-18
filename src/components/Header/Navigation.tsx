"use client";

import Link from "next/link";
<<<<<<< HEAD
import css from "./Navigation.module.scss";
import { navigationLinks } from "@/data/header/navigationData";

const Navigation = () => {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {navigationLinks.map(({ id, link, text }) => (
          <li key={id} className={css.item}>
            <Link href={link}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
=======
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
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  );
};

export default Navigation;
