"use client";

import Link from "next/link";
import css from "./PopupMenu.module.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { navigationLinks } from "../../data/header/popupData";

interface PopupMenuProps {
  handlePopup: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ handlePopup }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, []);

  return (
    <div ref={menuRef} className={css.backdrop} onClick={handlePopup}>
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
