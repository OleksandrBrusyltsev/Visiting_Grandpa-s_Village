"use client";

import Link from "next/link";
import css from "./Navigation.module.scss";

const navigationLinks = [
  {
    id: 1,
    link: "",
    text: "ЖИТИ",
  },
  { id: 2, link: "", text: "ЇСТИ" },
  {
    id: 3,
    link: "",
    text: "БАЙДИКУВАТИ",
  },
  {
    id: 4,
    link: "",
    text: "СПОГАДИ",
  },
  {
    id: 5,
    link: "",
    text: "ЗНАЙТИ МЕНЕ",
  },
];

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
