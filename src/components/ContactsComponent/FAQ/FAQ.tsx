"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import Lake from "../../../../public/images/contacts/lake.png";
import DownIcon from "../../../assets/icons/icon-down.svg";
import UpIcon from "../../../assets/icons/icon-up.svg";
import s from "./FAQ.module.scss";

type FAQProps = {
  lakeRef: React.RefObject<HTMLImageElement>;
  faqTitleRef: React.RefObject<HTMLHeadingElement>;
  faqWrapperRef: React.RefObject<HTMLDivElement>;
  faq: ContactItem["faq"];
};

const FAQ: FC<FAQProps> = ({ lakeRef, faqTitleRef, faqWrapperRef, faq }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const imgAndFaqWrapper = useRef<HTMLDivElement>(null);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const t = useTranslations("Contacts");
  const locale = useLocale() as Language;

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
      const breakpoint = 1024; // Ширина экрана, начиная с которой будет применяться CSS

      if (imgAndFaqWrapper.current && faqWrapperRef.current) {
        const faqHeight = faqWrapperRef.current.offsetHeight;
        const additionalMargin = 60;
        // Добавление 60 пикселей или сбрасываем марджин, если ширина экрана больше или равна breakpoint
        imgAndFaqWrapper.current.style.marginBottom = screenWidth < breakpoint ? `${faqHeight + additionalMargin
          }px` : '';
      }
    };

    // Вызов функции обновления марджина при монтировании компонента
    updateMargin();

    // Вызов функции обновления марджина при изменении контента
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes"
        ) {
          updateMargin();
          break;
        }
      }
    });

    if (faqWrapperRef.current) {
      observer.observe(faqWrapperRef.current, {
        attributes: true,
        subtree: true,
      });
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
      <Image src={Lake} alt="" className={s.lake} ref={lakeRef} />
      <h2 className={s.faqTitle} ref={faqTitleRef}>
        {t('FAQTitle')}
      </h2>

      <div className={s.faqWrapper} ref={faqWrapperRef}>
        <ul className={s.faqList}>
          {faq[locale].map((item, index) => (
            <li key={item.question} className={s.faqItem}>
              <div
                className={s.questionWrapper}
                onClick={() => toggleAnswer(index)}
              >
                <p className={s.questionText}>{item.question}</p>
                <button type="button" className={s.iconButton}>
                  <Image
                    src={openIndices.includes(index) ? UpIcon : DownIcon}
                    alt=""
                    className={s.icon}
                  />
                </button>
              </div>
              <div
                className={s.answerWrapper}
                ref={(el: any) => (answerRefs.current[index] = el)}
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
