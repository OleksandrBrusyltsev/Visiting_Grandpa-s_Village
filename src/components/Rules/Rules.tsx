"use client";
import { FC } from "react";
import Image from "next/image";
import Granpa1 from "../../../public/images/grandpas/Grandpa5.png";
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
      <div className={s.iconErrowWrapper}>
        <svg
          className={s.iconErrow}
          // width="61"
          // height="70"
          viewBox="0 0 61 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.6105 4.09275C55.2141 5.43613 56.7925 6.03585 58.1359 5.43226C59.4792 4.82866 60.079 3.25031 59.4754 1.90693C58.8718 0.563538 57.2934 -0.0361802 55.95 0.567418C54.6066 1.17101 54.0069 2.74936 54.6105 4.09275ZM4.01353 69.6618L6.35804 64.3858L0.616602 64.9934L4.01353 69.6618ZM56.5657 3.1491C58.2683 8.59211 60.5697 15.6772 58.6332 22.0287C56.7236 28.292 50.6068 34.0322 34.9482 36.5514L35.107 37.5387C50.9383 34.9917 57.5191 29.1118 59.5897 22.3204C61.6334 15.6172 59.1974 8.21275 57.5201 2.85057L56.5657 3.1491ZM34.9482 36.5514C20.6602 38.8502 12.3827 42.4327 7.82591 47.2832C3.24196 52.1627 2.50852 58.2297 3.04162 65.227L4.03873 65.151C3.51286 58.2486 4.26119 52.5383 8.55474 47.9679C12.8755 43.3687 20.8712 39.8291 35.107 37.5387L34.9482 36.5514Z"
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
      <div className={s.rulesRememberWrapper}>
        <Image src={Grandpa2} alt="picture" className={s.grandpa2}></Image>
        <ul className={s.rulesRememberList}>
          <li className={s.rulesRememberItemFirst}>
            <u>Невеличке нагадування:</u>&nbsp; Дідусь та команда Еко-садиби “На
            селі у Дідуся” - твої друзі, завжди готові допомогти та зробити
            відпочинок приємним і незабутнім.
          </li>
          <li className={s.rulesRememberItemSecond}>
            Також пам’ятайте, що ми не можемо контролювати погоду та інші
            зовнішні обставини, проте гарантуємо вам теплий прийом та комфортний
            відпочинок.
          </li>
          <li className={s.rulesRememberItemThird}>
            “На селі у Дідуся” гості отримують гарні, приємні емоції та
            створюють неповторні, теплі спогади.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
