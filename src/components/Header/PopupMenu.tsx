"use client";

import Link from "next/link";
import css from "./PopupMenu.module.scss";
import { useState } from "react";

const navigationLinks = [
  {
    id: 1,
    link: "",
    text: "Жити",
  },
  { id: 2, link: "", text: "Їсти" },
  {
    id: 3,
    link: "",
    text: "Байдикувати",
  },
  {
    id: 4,
    link: "",
    text: "Спогади",
  },
  {
    id: 5,
    link: "",
    text: "Знайти мене",
  },
  {
    id: 6,
    link: "",
    text: "Правила перебування",
  },
];

interface PopupMenuProps {
  handlePopup: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ handlePopup }) => {
  return (
    <div className={css.backdrop} onClick={handlePopup}>
      <div className={css.popupContainer}>
        <ul className={css.list}>
          {navigationLinks.map(({ id, link, text }) => (
            <li key={id} className={css.item}>
              <Link href={link}>{text}</Link>
            </li>
          ))}
          <li className={css.item}>
            <div className={css.langContainer}>
              <button className={`${css.langBtn} ${css.active}`}>UA</button>
              <p>/</p>
              <button className={css.langBtn}>EN</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopupMenu;
