"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import BookingComponent from "../BookingComponent/BookingComponent";
import Icon from "../ui/Icon/Icon";

import s from "./Visit.module.scss";

type Props = {};

export default function Visit({}: Props) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 1279px)",
        isNotMobile: "(min-width: 1280px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;

        if (isMobile) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 0.7,
              },
            })
            .from(`.${s.heroTitle}`, {
              x: -100,
            })
            .from(
              `.${s.quoteText}`,
              {
                x: -100,
              },
              "<"
            )
            .from(
              `.${s.grandpaWrapper}`,
              {
                x: 100,
              },
              "<"
            )
            .from(
              [`.${s.bookingForm}`],
              {
                scale: 0.9,
              },
              ">-0.1"
            )
            .from(
              [`.${s.visitCurve}`],
              {
                clipPath: "inset(0% 0% 0% 100%)",
                duration: 0.5,
              },
              ">-0.1"
            )
            .from([`.${s.decorWrapper}`], {
              x: 100,
              y: -30,
              scale: 0.9,
            });
        }

        if (isNotMobile) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 0.7,
              },
            })
            .from(`.${s.heroTitle}`, {
              y: -100,
              x: -50,
            })
            .from(
              `.${s.quoteText}`,
              {
                y: -50,
                x: 50,
              },
              ">-0.2"
            )
            .from([`.${s.bookingForm}`], {})
            .from(
              `.${s.grandpaWrapper}`,
              {
                scale: 0.8,
                duration: 0.5,
              },
              ">-0.2"
            )
            .from([`.${s.visitCurve}`], {
              clipPath: "inset(0% 0% 0% 100%)",
            })
            .from(
              [`.${s.decorWrapper}`],
              {
                x: 100,
                y: -30,
                scale: 0.9,
              },
              ">-0.3"
            );
        }
      }
    );
  });

  return (
    <>
      <section className={s.hero}>
        <div className={s.grandpaWrapper}>
          <Image
            src={"/images/grandpas/Grandpa1.png"}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>
        <h1 className={s.heroTitle}>Обирай, коли плануєш відвідати Садибу</h1>
        <p className={s.quoteText}>
          “Дідусь швиденько підбере найкращі варіанти розміщення на ці дні”
        </p>
      </section>
      <div className={s.bookingForm}>
        <BookingComponent />
      </div>
      <div className={s.decoration}>
        <div className={s.decorWrapper}>
          <Image
            src={"/images/visit/combo.png"}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>
        <Icon name={"curve-visit"} className={s.visitCurve} />
      </div>
      {/* <div className={s.main}>
                <p className={s.text}>Тут будуть результати пошуку</p>
            </div> */}
    </>
  );
}
