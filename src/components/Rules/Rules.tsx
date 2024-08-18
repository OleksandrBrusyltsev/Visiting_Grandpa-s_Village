"use client";
import { FC } from "react";
import Image from "next/image";
import Granpa1 from "../../../public/images/grandpas/Grandpa7.png";
import Grandpa2 from "../../../public/images/grandpas/Grandpa6.png";
import IconErrow from "../../assets/icons/icon-arrow-rules.svg";
import { rules } from "../../data/rules/index.js";
import s from "./Rules.module.scss";

const Rules: FC = () => {
  return (
    <div className={s.rulesContainer}>
      <div className={s.rulesTitleWrapper}>
        <h1 className={s.rulesTitle}>
          Твій Дідусь має невеликі прохання та правила, які діють в еко-садибі
        </h1>
        <Image src={Granpa1} alt="picture" className={s.granpa1}></Image>
      </div>
      <div className={s.iconArrowWrapper}>
        <svg
          className={s.iconArrow}
          viewBox="0 0 111 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M102.305 4.09269C102.908 5.43608 104.487 6.0358 105.83 5.4322C107.173 4.8286 107.773 3.25026 107.17 1.90687C106.566 0.563483 104.988 -0.0362355 103.644 0.567363C102.301 1.17096 101.701 2.74931 102.305 4.09269ZM4.32262 129.228L6.60187 123.924L0.86836 124.602L4.32262 129.228ZM104.26 3.14905C107.473 13.4196 111.89 26.9783 108.176 39.1625C104.488 51.2584 92.6981 62.1901 62.9703 66.9729L63.1292 67.9602C93.0296 63.1497 105.283 52.0782 109.132 39.4541C112.954 26.9183 108.402 13.0403 105.214 2.85051L104.26 3.14905ZM62.9703 66.9729C34.5912 71.5387 18.8666 78.7672 10.6423 88.5356C2.39928 98.3262 1.78539 110.553 3.29672 124.813L4.29115 124.707C2.78479 110.495 3.44488 98.637 11.4072 89.1797C19.3883 79.7002 34.8005 72.5179 63.1292 67.9602L62.9703 66.9729Z"
            fill="#3F5540"
          />
        </svg>
      </div>

      <ul className={s.rulesList}>
        {rules.map((rule) => (
          <li key={rule.id} className={s.rulesItem}>
            <h3 className={s.ruleTitle}>{rule.title}</h3>
            <p
              className={s.ruleDescription}
              dangerouslySetInnerHTML={{ __html: rule.description }}
            ></p>
          </li>
        ))}
      </ul>
       
      <ul className={s.rulesRememberList}>
        <li className={s.grandpa2Wrapper}>
          <Image src={Grandpa2} fill alt="picture" ></Image>
        </li>
        <li>
          <span className={s.rulesRememberSpan} >Невеличке нагадування:</span>Дідусь та команда Еко-садиби “На
          селі у Дідуся” - твої друзі, завжди готові допомогти та зробити
          відпочинок приємним і незабутнім.
        </li>
        <li>
          Також пам’ятайте, що ми не можемо контролювати погоду та інші
          зовнішні обставини, проте гарантуємо вам теплий прийом та комфортний
          відпочинок.
        </li>
        <li>
          “На селі у Дідуся” гості отримують гарні, приємні емоції та
          створюють неповторні, теплі спогади.
        </li>
        <li>
          <a href="/publicOffer.pdf" target="_blank" rel="noopener noreferrer">Публічна оферта</a>
        </li>
      </ul>
    </div>
  );
};

export default Rules;
