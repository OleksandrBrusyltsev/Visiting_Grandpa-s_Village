"use client";

import Link from "next/link";
import css from "./Navigation.module.scss";
import { navigationLinks } from "@/data/header/navigationData";

const Navigation: React.FC = () => {
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
  );
};

export default Navigation;
