"use client";
import { FC } from "react";
import Image from "next/image";
import Granpa1 from "../../../public/images/grandpas/Grandpa5.png";
import Grandpa2 from "../../../public/images/grandpas/Grandpa6.png";
import { rules } from "../../data/rules/index.js";
import s from "./Rules.module.scss";

const Rules: FC = () => {
  return (
    <>
      <div className={s.rulesTitleWrapper}>
        <h1 className={s.rulesTitle}>
          Твій Дідусь має невеликі прохання та правила, які діють в еко-садибі
        </h1>
        <Image src={Granpa1} alt="picture" className={s.rulesTitleImg}></Image>
      </div>
      <ul className={s.rulesList}>
        {rules.map((rule) => (
          <li key={rule.id} className={s.ruleItem}>
            <h3 className={s.ruleTitle}>{rule.title}</h3>
            <p
              className={s.ruleDescription}
              dangerouslySetInnerHTML={{ __html: rule.description }}
            ></p>
          </li>
        ))}
      </ul>
      <div className={s.rulesRememberWrapper}>
        <ul className={s.rulesRememberList}>
          <Image
            src={Grandpa2}
            alt="picture"
            className={s.rulesRememberImg}
          ></Image>
          <li className={s.rulesRememberItem}>
            Невеличке нагадування: Дідусь та команда Еко-садиби “На селі у
            Дідуся” - твої друзі, завжди готові допомогти та зробити відпочинок
            приємним і незабутнім.
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
        </ul>
      </div>
    </>
  );
};

export default Rules;
