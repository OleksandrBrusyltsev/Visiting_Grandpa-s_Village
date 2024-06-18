"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

import css from "./Navigation.module.scss";

import { navigationLinks } from "@/data/header/navigationData";

const Navigation = () => {
  const locale = useLocale();
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {navigationLinks.map(({ id, link, text }) => (
          <li key={id} className={css.item}>
            <Link href={`/${locale}/${link}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
