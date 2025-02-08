"use client";
import Image from "next/image";
import { useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useLocale } from "next-intl";

import Icon from "../ui/Icon/Icon";
import MealsBlock from "./MealsBlock";
import { MatchMediaContext } from "@/context/MatchMediaContext";

import s from "./Meals.module.scss";
import sBlock from "./MealsBlock.module.scss";

type Props = { items: MealsItem[] };

const getSelector = (s1: string, position: number, s2?: string) =>
  `.${s1}:nth-of-type(${position})${s2 ? " ." + s2 : ""}`;

// selector creation helpers
const title = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsTitle);
const descr = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsDescription);
const mPhoto = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.mainPhoto);
const tPhoto = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.topPhoto);
const bPhoto = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.bottomPhoto);
const curve = (n: number) =>
  getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsCurve);

export default function Meals({ items }: Props) {
  const { isMobile } = useContext(MatchMediaContext);
  const locale = useLocale() as Language;

  useGSAP(() => {
    //meals blocks animation
    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isNotMobile: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;

        //hero block animation
        gsap
          .timeline({
            defaults: {
              autoAlpha: 0,
              ease: "power1.out",
              duration: isNotMobile ? 1 : 0.7,
            },
          })
          .from(`.${s.title}`, {
            y: isNotMobile ? -100 : -50,
          })
          .from(
            `.${s.heroImage}`,
            {
              x: isNotMobile ? -200 : -100,
            },
            isNotMobile ? ">-0.5" : ">-0.3"
          )
          .from(
            [`.${s.callToEat}`],
            {
              duration: 0.5,
              x: -30,
              y: 10,
              scale: 0.9,
            },
            isNotMobile ? ">-0.5" : ">-0.3"
          );

        gsap
          .timeline({
            defaults: {
              autoAlpha: 0,
              ease: "power1.out",
              duration: isNotMobile ? 1 : 0.7,
            },
            scrollTrigger: {
              trigger: `.${s.heroCurve}`,
              start: isMobile ? "top 70%" : "top 40%",
            },
          })
          .from(`.${s.heroCurve}`, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.5,
            delay: isMobile ? 1 : 0,
          })
          .from(title(1), {
            x: isNotMobile ? -200 : -100,
            y: isNotMobile ? -100 : -70,
          })
          .from(
            mPhoto(1),
            {
              x: isNotMobile ? 200 : 100,
            },
            "<"
          )
          .from(
            [tPhoto(1), bPhoto(1)],
            {
              x: isNotMobile ? -200 : -100,
            },
            "<"
          )
          .from(
            descr(1),
            {
              y: isNotMobile ? 100 : 50,
            },
            "<"
          );

        gsap
          .timeline({
            defaults: {
              ease: "power1.out",
              duration: isNotMobile ? 1 : 0.7,
            },
            scrollTrigger: {
              trigger: curve(1),
              start: "top 50%",
            },
          })
          .from(curve(1), {
            clipPath: "inset(0% 100% 0%  0%)",
            duration: 0.5,
          })
          .from(title(2), {
            autoAlpha: 0,
            y: -50,
          })
          .from(
            descr(2),
            {
              autoAlpha: 0,
              x: isMobile ? -100 : 200,
            },
            ">-0.3"
          )
          .from(
            mPhoto(2),
            {
              autoAlpha: 0,
              x: isNotMobile ? -200 : 100,
            },
            "<"
          )
          .from([tPhoto(2), bPhoto(2)], {
            autoAlpha: 0,
            stagger: 0.3,
          });

        gsap
          .timeline({
            defaults: {
              ease: "power1.out",
              duration: isNotMobile ? 1 : 0.7,
            },
            scrollTrigger: {
              trigger: curve(2),
              start: "top 50%",
            },
          })
          .from(curve(2), {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.5,
          })
          .from(title(3), {
            autoAlpha: 0,
            y: -50,
          })
          .from(
            descr(3),
            {
              autoAlpha: 0,
              y: isNotMobile ? -100 : -50,
            },
            isNotMobile ? ">-0.7" : ">-0.4"
          )
          .from(
            mPhoto(3),
            {
              autoAlpha: 0,
              x: isNotMobile ? 200 : 100,
            },
            ">-0.3"
          )
          .from(
            [tPhoto(3), bPhoto(3)],
            {
              autoAlpha: 0,
              x: isNotMobile ? -200 : -100,
            },
            "<"
          );
      }
    );
    ScrollTrigger.refresh();
  });

  return (
    <div className={`${s.mealsWrapper} container`}>
      <div className={s.heroWrapper}>
        <h1 className={s.title}
          dangerouslySetInnerHTML={{ __html: items[0].title[locale] }}
        />
        <div className={s.heroImage}>
          <Image
            src={"/images/meals/dog.png"}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
            fill
          />
          <div className={s.callToEatWrapper}>
            <p className={s.callToEat}
              dangerouslySetInnerHTML={{ __html: items[0].description[locale] }}
            >

            </p>
            <Icon name="meals-outline" className={s.callToEatOutline} />
          </div>
        </div>
        <Icon
          name={isMobile ? "curve-meals-375" : "curve-meals-768"}
          className={s.heroCurve}
        />
      </div>
      <div className={s.main}>
        {items.slice(1).map((item, i) => (
          <MealsBlock item={item} key={item.id} position={i} />
        ))}
      </div>
    </div>
  );
}
