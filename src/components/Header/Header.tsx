"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import Icon from "../ui/Icon/Icon";
import css from "./Header.module.scss";
import Image from "next/image";
import Button from "../ui/Button/Button";
import PopupMenu from "./PopupMenu";
import { useState } from "react";
import Navigation from "./Navigation";

const image = "/images/logo.svg";
const alt = "Logo main";

const Header: React.FC = () => {
  const { width } = useWindowSize();
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
        <Image
          src={image}
          alt={alt}
          width={width && width < 768 ? 144 : 277}
          height={width && width < 768 ? 80 : 135}
        />

        <div className={css.headerBox}>
          <div className={css.langContainer}>
            <button className={`${css.langBtn} ${css.active}`}>UA</button>
            <p>/</p>
            <button className={css.langBtn}>EN</button>
          </div>

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
      {isVisible ? <PopupMenu handlePopup={handlePopup} /> : <Navigation />}
    </>
  );
};

export default Header;
