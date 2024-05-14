"use client";

import Icon from "../ui/Icon/Icon";
import css from "./Header.module.scss";
import Image from "next/image";
import Button from "../ui/Button/Button";
import PopupMenu from "./PopupMenu";
import { useState } from "react";
import Navigation from "./Navigation";
import LangBtn from "../LangBtn/LangBtn";

const image = "/images/logo-main.svg";
const alt = "Logo main";

const Header = () => {
  const [isVisible, setVisible] = useState(false);

  const handlePopup = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <div className={css.container}>
        <button className={css.burgerBtn} onClick={handlePopup}>
          <Icon name={"burger"} className={css.burgerIcon} />
        </button>
        <a href="/">
          <Image
            src={image}
            alt={alt}
            width={144}
            height={80}
            className={css.mainLogo}
          />
        </a>

        <div className={css.headerBox}>
          <LangBtn />

          <button className={css.userBtn}>
            <Icon name={"user"} className={css.userIcon} />
          </button>

          <Button
            label={"Завітати"}
            type={"button"}
            size={"large"}
            className={css.headerBtn}
          />
        </div>
      </div>
      {isVisible && <PopupMenu handlePopup={handlePopup} />}
      <Navigation />
    </>
  );
};

export default Header;
