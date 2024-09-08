"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { navLinks as navigationLinks } from "@/data/navigationMenu";

import css from "./PopupMenu.module.scss";
import LangBtn from "../LangBtn/LangBtn";

interface PopupMenuProps {
  handlePopup: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ handlePopup }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={menuRef} className={css.backdrop} onClick={handlePopup}>
      <div className={css.popupContainer}>
        <ul className={css.list}>
          {navigationLinks.map(({ id, link, label }) => (
            <li
              key={id}
              className={`${css.item} ${pathname.startsWith(`/${locale}/${link}`) ? css.curActive : ""
                }`}
            >
              {pathname === `/${locale}/${link}` ? (
                <p className={css.itemLink}>{label[locale as keyof typeof label]}</p>
              ) : (
                <Link href={`/${locale}/${link}`} className={css.itemLink}>
                  {label[locale as keyof typeof label]}
                </Link>
              )}
            </li>
          ))}
          <li className={css.item}>
            <LangBtn />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopupMenu;
