"use client";

import { useState, useEffect, useRef, FC } from "react";
import Icon from "../ui/Icon/Icon";
import AskIcon from "./icons/AskIcon";
import TelegramIcon from "./icons/TelegramIcon";
import CrossIcon from "./icons/CrossIcon";
// import { gsap } from "gsap";
import style from "./AskGrandpa.module.scss";

const AskGrandpa: FC = () => {
  const [isVisible, setVisible] = useState(false);
  const telegramRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePopup = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        telegramRef.current &&
        !telegramRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [telegramRef]);

  return (
    <div className={style.wrapper}>
      <div className={style.askWrapper}>
        <div className={style.headlineWrapper}>
          <p className={style.headline}>запитати дідуся</p>
          <div className={style.askButtonWrapper}>
            <button
              onClick={handlePopup}
              className={isVisible ? style.hidden : style.askButton}
            >
              <AskIcon />
            </button>
            <button
              onClick={handlePopup}
              ref={telegramRef}
              className={isVisible ? style.telegramButton : style.hidden}
            >
              <div className={style.iconTelegramWrapper}>
                <TelegramIcon />
              </div>
              <div className={style.crossWrapper}>
                <CrossIcon />
              </div>
            </button>
          </div>
        </div>
        <button
          className={isVisible ? style.hidden : style.iconArrowWrapper}
          onClick={scrollToTop}
        >
          <Icon name="arrow" className={style.iconArrow} />
        </button>
      </div>
    </div>
  );
};

export default AskGrandpa;
