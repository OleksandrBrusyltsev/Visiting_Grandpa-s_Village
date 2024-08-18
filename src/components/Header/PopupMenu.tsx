"use client";

import Link from "next/link";
<<<<<<< HEAD
import css from "./PopupMenu.module.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { navigationLinks } from "./../../data/header/popupData";

=======
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { navigationLinks } from "./../../data/header/popupData";

import css from "./PopupMenu.module.scss";
import LangBtn from "../LangBtn/LangBtn";

>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
interface PopupMenuProps {
  handlePopup: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ handlePopup }) => {
  const menuRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD

  useEffect(() => {
    if (menuRef.current) {
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
=======
  const locale = useLocale();
  const pathname = usePathname();


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (menuRef.current) {
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
    return () => {
      document.body.style.overflow = '';
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    }
  }, []);

  return (
    <div ref={menuRef} className={css.backdrop} onClick={handlePopup}>
      <div className={css.popupContainer}>
        <ul className={css.list}>
          {navigationLinks.map(({ id, link, text }) => (
<<<<<<< HEAD
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
=======
            <li
              key={id}
              className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.curActive : ''}`}
            >
              <Link href={`/${locale}/${link}`} className={css.itemLink}>
                {text}
              </Link>
            </li>
          ))}
          {/* <li className={css.item}>
            <LangBtn />
          </li> */}
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
        </ul>
      </div>
    </div>
  );
};

export default PopupMenu;
