"use client";

import { FC, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
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

  gsap.registerPlugin(ScrollTrigger);

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
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className={s.imgAndFaqWrapper}>
      <Image src={Lake} alt="picture" className={s.lake} ref={lake} />
      <h1 className={s.faqTitle} ref={faqTitle}>
        Частіше за все Дідуся запитують
      </h1>
      <div className={s.faqWrapper} ref={faqWrapper}>
        <ul className={s.faqList}>
          {faqData.map((item, index) => (
            <li key={index} className={s.faqItem}>
              <div className={s.questionWrapper}>
                <p className={s.questionText}>{item.question}</p>
                <button
                  type="button"
                  className={s.iconButton}
                  onClick={() => toggleAnswer(index)}
                >
                  <Image
                    src={openIndices.includes(index) ? UpIcon : DownIcon}
                    alt={openIndices.includes(index) ? "close" : "open"}
                    className={s.icon}
                  />
                </button>
              </div>
              {openIndices.includes(index) && (
                <p className={s.answerText}>{item.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
