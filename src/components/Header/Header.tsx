"use client";

import Icon from "../ui/Icon/Icon";
import css from "./Header.module.scss";
import Image from "next/image";
import Button from "../ui/Button/Button";
import PopupMenu from "./PopupMenu";
import { useState } from "react";
import Navigation from "./Navigation";
import LangBtn from "../LangBtn/LangBtn";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

const image = "/images/logo-main.svg";
const alt = "Logo main";

const Header = () => {
  const [isVisible, setVisible] = useState(false);
  const {push} = useRouter();
  const locale = useLocale();
  const handlePopup = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <div className={css.container}>
        <button className={css.burgerBtn} onClick={handlePopup}>
          <Icon name={"burger"} className={css.burgerIcon} />
        </button>
        <Link href={`/${locale}`}>
          <Image
            src={image}
            alt={alt}
            width={144}
            height={80}
            className={css.mainLogo}
          />
        </Link>

        <div className={css.headerBox}>
          <LangBtn />

          <button className={css.userBtn}>
            <Icon name={"user"} className={css.userIcon} />
          </button>

          <Button
            label={"Завітати"}
            type={"button"}
            size={"header"}
            className={css.headerBtn}
            onClick={() => push(`/${locale}/booking`)}
          />
        </div>
      </div>
      {isVisible && <PopupMenu handlePopup={handlePopup} />}
      <Navigation />
    </>
  );
};

export default Header;
