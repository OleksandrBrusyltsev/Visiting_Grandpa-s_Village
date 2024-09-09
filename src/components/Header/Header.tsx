"use client";

import { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

import Button from "../ui/Button/Button";
import PopupMenu from "./PopupMenu";
import LangBtn from "../LangBtn/LangBtn";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import useRegisterGSAP from "@/hooks/useRegisterGSAP";

import css from "./Header.module.scss";

const image = "/images/logo-main.svg";

const Header = () => {
  const [isVisible, setVisible] = useState(false);
  const { isMobile } = useContext(MatchMediaContext);

  useRegisterGSAP();

  const { push } = useRouter();
  const pathname = usePathname();

  const locale = useLocale();
  const t = useTranslations("UI");

  const handlePopup = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <div className={css.fullsizeBackground}>
        <div className={css.container}>
          <button
            className={`${css.burgerBtn} ${isVisible ? css.active : ""}`}
            onClick={handlePopup}
            aria-label="menu button"
          >
            <div className={css.burgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          {/* block circular reference */}
          {pathname === `/${locale}` ? (
            <Image
              title={t('currLink')}
              src={image}
              alt=""
              width={144}
              height={80}
              className={css.mainLogo}
            />
          ) : (
            <Link href={`/${locale}`} className={css.linkLogo}>
              <Image
                src={image}
                alt=""
                width={144}
                height={80}
                className={css.mainLogo}
              />
            </Link>
          )}

          <div className={css.headerBox}>
            {isMobile ? null : <LangBtn />}

            <button className={css.userBtn} aria-label="user button">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3337 6.8C19.3337 5.52696 18.7717 4.30606 17.7715 3.40588C16.7713 2.50571 15.4148 2 14.0003 2C12.5858 2 11.2294 2.50571 10.2292 3.40588C9.22897 4.30606 8.66699 5.52696 8.66699 6.8V9.2C8.66699 10.473 9.22897 11.6939 10.2292 12.5941C11.2294 13.4943 12.5858 14 14.0003 14C15.4148 14 16.7713 13.4943 17.7715 12.5941C18.7717 11.6939 19.3337 10.473 19.3337 9.2V6.8Z"
                  stroke="#3F5540"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M2 25.9996C4.02667 21.0556 8.66667 17.5996 14 17.5996C19.3333 17.5996 23.9733 21.0556 26 25.9996"
                  stroke="#3F5540"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </button>

            <Button
              label={t('visit')}
              type={"button"}
              size={"header"}
              className={css.headerBtn}
              onClick={() => push(`/${locale}/booking`)}
            />
          </div>
        </div>
      </div>
      {isVisible && <PopupMenu handlePopup={handlePopup} />}
    </>
  );
};

export default Header;
