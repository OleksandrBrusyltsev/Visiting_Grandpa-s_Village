"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

import css from "./Navigation.module.scss";

import { navigationLinks } from "@/data/header/navigationData";
import { usePathname } from "next/navigation";



const Navigation = () => {
  const locale = useLocale();
  const pathname = usePathname()

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {navigationLinks.map(({ id, link, text }) => (
          <li
            key={id}
            className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.active : ''}`}
          >
            <Link href={`/${locale}/${link}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
