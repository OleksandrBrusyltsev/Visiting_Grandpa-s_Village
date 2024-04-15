"use client";

import Icon from "../ui/Icon/Icon";
import css from "./Header.module.scss";
import Image from "next/image";
import Button from "../ui/Button/Button";
import PopupMenu from "./PopupMenu";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

const image = "/images/logo.svg";
const alt = "Logo main";

const Header: React.FC = () => {
  const [isVisible, setVisible] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
console.log(windowSize)
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
          width={144}
          height={80}
          className={css.mainLogo}
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
      {isVisible && <PopupMenu handlePopup={handlePopup} />}
      {windowSize.width > 766 ? <Navigation /> : null}
    </>
  );
};

export default Header;
