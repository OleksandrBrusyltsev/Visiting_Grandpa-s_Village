"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import faqData from "./faqData.json";
import Lake from "../../../../public/images/contacts/lake.png";
import DownIcon from "../../../assets/icons/icon-down.svg";
import UpIcon from "../../../assets/icons/icon-up.svg";
import s from "./FAQ.module.scss";

const FAQ: FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const lake = useRef<HTMLImageElement>(null);
  const faqTitle = useRef<HTMLHeadingElement>(null);
  const faqWrapper = useRef<HTMLDivElement>(null);
  const imgAndFaqWrapper = useRef<HTMLDivElement>(null);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);

 useGSAP(() => {
   gsap.fromTo(
     lake.current,
     {
       x: "-100%",
     },
     {
       scrollTrigger: {
         trigger: lake.current,
       },
       x: "0%",
       duration: 1,
       clearProps: "transform",
     }
   );
   gsap.fromTo(
     faqTitle.current,
     {
       x: "100%",
     },
     {
       scrollTrigger: {
         trigger: faqTitle.current,
       },
       x: "0%",
       duration: 1,
       clearProps: "transform",
     }
   );
   gsap.fromTo(
     faqWrapper.current,
     {
       x: "100%",
     },
     {
       scrollTrigger: {
         trigger: faqWrapper.current,
       },
       x: "0%",
       duration: 1,
       clearProps: "transform",
     }
   );
 });


  const toggleAnswer = (index: number) => {
    if (openIndices.includes(index)) {
      gsap.to(answerRefs.current[index], {
        height: 0,
        duration: 0.3,
        onComplete: () =>
          setOpenIndices(openIndices.filter((i) => i !== index)),
      });
    } else {
      setOpenIndices([...openIndices, index]);
      if (answerRefs.current[index]) {
        gsap.set(answerRefs.current[index], { height: "auto" });
        gsap.from(answerRefs.current[index], { height: 0, duration: 0.5 });
      }
    }
  };

  useEffect(() => {
    // Обновление марджина при изменении высоты faqWrapper
    const updateMargin = () => {
      const screenWidth = window.innerWidth;
      const breakpoint = 768; // Ширина экрана, начиная с которой будет применяться CSS

      if (imgAndFaqWrapper.current) {
        if (screenWidth < breakpoint) {
          if (faqWrapper.current) {
            const faqHeight = faqWrapper.current.offsetHeight;
            const additionalMargin = 60; // Добавление 40 пикселей
            imgAndFaqWrapper.current.style.marginBottom = `${
              faqHeight + additionalMargin
            }px`;
          }
        } else {
          // Сбросить марджин, если ширина экрана больше или равна breakpoint
          imgAndFaqWrapper.current.style.marginBottom = "";
        }
      }
    };

    // Вызов функции обновления марджина при монтировании компонента
    updateMargin();

    // Вызов функции обновления марджина при изменении контента
    const observer = new MutationObserver(updateMargin);
    if (faqWrapper.current) {
      observer.observe(faqWrapper.current, { childList: true, subtree: true });
    }

    // Обновление марджина при изменении размера окна
    window.addEventListener("resize", updateMargin);

    // Очистка наблюдателя и обработчика событий при размонтировании компонента
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMargin);
    };
  }, []);

  return (
    <div className={s.imgAndFaqWrapper} ref={imgAndFaqWrapper}>
      <Image src={Lake} alt="picture" className={s.lake} ref={lake} />
      <h1 className={s.faqTitle} ref={faqTitle}>
        Частіше за все Дідуся запитують
      </h1>

      <div className={s.faqWrapper} ref={faqWrapper}>
        <ul className={s.faqList}>
          {faqData.map((item, index) => (
            <li key={index} className={s.faqItem}>
              <div
                className={s.questionWrapper}
                onClick={() => toggleAnswer(index)}
              >
                <p className={s.questionText}>{item.question}</p>
                <button type="button" className={s.iconButton}>
                  <Image
                    src={openIndices.includes(index) ? UpIcon : DownIcon}
                    alt={openIndices.includes(index) ? "close" : "open"}
                    className={s.icon}
                  />
                </button>
              </div>
              <div
                className={s.answerWrapper}
                ref={(el) => (answerRefs.current[index] = el)}
                style={{
                  height: openIndices.includes(index) ? "auto" : 0,
                  overflow: "hidden",
                }}
              >
                <p className={s.answerText}>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
