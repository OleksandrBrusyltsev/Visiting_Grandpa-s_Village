"use client";

import { useState, useEffect, useRef, FC } from "react";
import Icon from "../ui/Icon/Icon";
import style from "./AskGrandpa.module.scss";
import Link from "next/link";

const IconAsk = ({className}: {className: string}) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.0026 5C10.8026 5 3.33594 11.6667 3.33594 20C3.34084 22.4848 4.02049 24.9215 5.30249 27.05L3.33594 35L10.5356 32.3334C13.3781 34.0937 16.6592 35.0178 20.0026 35C29.2026 35 36.6693 28.3333 36.6693 20C36.6693 11.6667 29.2026 5 20.0026 5Z" fill="currentColor"/>
    <circle cx="11.5" cy="19.5" r="2.5" fill="#FAFAFA"/>
    <circle cx="19.5781" cy="19.5" r="2.5" fill="#FAFAFA"/>
    <circle cx="27.6562" cy="19.5" r="2.5" fill="#FAFAFA"/>
  </svg>

)
const AskGrandpa: FC = () => {
  const [isVisible, setVisible] = useState(false);
  const telegramRef = useRef<HTMLDivElement>(null);

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
    <div 
      className={`${style.askWrapper} container ${isVisible ? style.showTelegramButton : style.showAskButton}`}
    >
        <div className={style.headlineWrapper}>
          <p className={style.headline}>запитати дідуся</p>
          
            <div
              onClick={handlePopup}
              ref={telegramRef}
              className={style.telegramButtons}
            >
              <Link href='https://t.me/VisitingGrandpasVillageBot' target="_blanc">
                <button className={style.telegramButton}>
                  <Icon name="telegramAsk" className={style.telegramIcon}/>
                </button>
              </Link>
              <button className={style.closeButton} >
                <Icon name="close"/>
              </button>
            </div>
            <button
              onClick={handlePopup}
              className={style.askButton}
            >
              <IconAsk className={style.askIcon}/>
            </button>
          
        </div>
        <button
          className={style.arrowUpButton}
          onClick={scrollToTop}
        >
          <Icon name="arrow" className={style.arrowIcon} />
        </button>
    </div>
  );
};

export default AskGrandpa;
