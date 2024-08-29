"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import BookingComponent from "../BookingComponent/BookingComponent";
import Icon from "../ui/Icon/Icon";
import HouseItem from "./HouseItem";
import HousesList from "./HousesList";

import s from "./Houses.module.scss";

type Props = {
  items: HouseItem[];
};

export default function Houses({ items }: Props) {
  const { locale } = useParams();
  const housesRef = useRef<Array<HTMLAnchorElement>>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1279px)",
        isDesktop: "(min-width: 1280px)",
      },
      (context) => {
        const { isMobile, isTablet, isDesktop } =
          context.conditions as gsap.Conditions;

        housesRef.current.forEach((h) => {
          gsap.set(h, { autoAlpha: 0 });
        });

        //booking component and houses list title animation
        const mainTimeline = gsap.timeline({
          defaults: {
            autoAlpha: 0,
            duration: isMobile ? 0.7 : isTablet ? 0.8 : 1,
          },
          scrollTrigger: {
            trigger: `.${s.bookingForm}`,
            start: "top 90%",
          },
        });

        //hero block animation
        if (isTablet) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 0.8,
                clearProps: "all",
              },
            })
            .from(`.${s.descr1}`, {
              y: -100,
            })
            .from(
              [`.${s.descr2}`, `.${s.grandpa}`],
              {
                x: 200,
              },
              "<"
            )
            //curve + map animation
            .from(
              `.${s.curve}`,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                autoAlpha: 1,
              },
              ">-0.4"
            )
            .from(`.${s.map}`, {
              y: 200,
            });

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.bookingForm}`, {
              scale: 0.9,
            })
            .from(
              `.${s.housesTitle}`,
              {
                y: -50,
                duration: 0.8,
              },
              ">-0.8"
            );
        }

        //hero block animation
        if (isDesktop) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 1.2,
                clearProps: "all",
              },
            })
            .from(`.${s.descr1}`, {
              y: -100,
              duration: 1,
            })
            .from(
              `.${s.map}`,
              {
                x: -300,
                y: 200,
              },
              "<"
            )
            .from(
              [`.${s.descr2}`, `.${s.grandpa}`],
              {
                x: 300,
              },
              "<"
            );

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.curve}`, {
              clipPath: "inset(0% 0% 100% 0%)",
              autoAlpha: 1,
            })
            .from(`.${s.bookingForm}`, {
              scale: 0.9,
              delay: 0.2,
            })
            .from(
              `.${s.housesTitle}`,
              {
                y: -50,
                duration: 0.8,
              },
              ">-0.8"
            );
        }

        //hero block animation + houses list animation
        if (isMobile) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 0.8,
                clearProps: "all",
              },
            })
            .from(`.${s.descr1}`, { y: -150 })
            .from(`.${s.map}`, { x: -150, y: 150 }, "<")
            .from([`.${s.descr2}`, `.${s.grandpa}`], { x: 150 }, "<");

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.bookingForm}`, { y: 100, scale: 0.9 })
            .from(`.${s.housesTitle}`, { y: 100 });

          housesRef.current.forEach((h, i) => {
            gsap.fromTo(
              h,
              {
                x: i % 2 ? 100 : -100,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: h,
                  start: "top 80%",
                  end: "bottom start",
                },
              }
            );
          });
        }

        //houses list animation
        if (isTablet || isDesktop) {
          ScrollTrigger.batch(housesRef.current, {
            interval: 0.2,
            batchMax: 2,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                {
                  x: (i) => (i % 2 ? 100 : -100),
                  autoAlpha: 0,
                },
                {
                  x: 0,
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: "power1.out",
                }
              ),
            start: "top 80%",
            end: "bottom start",
            once: true,
          });
        }
      }
    );
    ScrollTrigger.refresh(true);
  });

  // text block animation
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!textWrapperRef.current) return;

    ScrollTrigger.refresh(true);

    gsap.from(textWrapperRef.current, {
      x: 100,
      autoAlpha: 0,
      ease: "power1.out",
      clearProps: true,
      scrollTrigger: {
        trigger: textWrapperRef.current,
        start: "top 90%",
      },
    });
  });

  return (
    <>
      <section className={`${s.hero} container`}>
        <div className={s.heroWrapper}>
          <h1 className={s.descr1}>
            Еко комплекс казкових дерев&apos;яних будиночків
          </h1>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className={s.descr2}>
            &quot;Маю дерев&apos;яні будиночки та хатинки, можеш вибрати
            будь-який варіант на свій смак. Гортай нижче - я тобі все
            покажу&quot;
          </p>
          <div className={s.grandpa}>
            <Image
              fill
              alt=""
              src="/images/grandpas/Grandpa2.png"
              sizes="100vw"
            />
          </div>

          <Icon name="curve-houses" className={s.curve} />
        </div>
      </section>
      <section className={s.map}>
        <div className={s.mapWrapper}>
          <Image
            fill
            alt={
              locale === "en"
                ? "Map of Grandpa's houses"
                : "Карта еко садиби Дідуся"
            }
            src="/images/backgrounds/illustration-map.png"
            sizes="100vw"
          />
        </div>
        <div className={s.cloudBackground}>
          <Icon name="map-cloud" className={s.cloud} />
        </div>
      </section>

      <div className={`${s.bookingForm} container`}>
        <BookingComponent />
      </div>

      {/* <main> */}
      <HousesList data={items} className="container">
        <>
          <div className={s.housesTitle}>
            <p>Живи тут</p>
            <Icon name="ellipse" className={s.titleOutline} />
          </div>
          <div className={s.housesWrapper}>
            {items.map((house, i) => (
              <HouseItem
                ref={(el: HTMLAnchorElement) => (housesRef.current[i] = el)}
                data={house}
                key={house.id}
              />
            ))}
          </div>
        </>
      </HousesList>
      <div className={s.textWrapper} ref={textWrapperRef}>
        <p className={s.text}>
          Ласкаво просимо до еко комплексу «На селі у Дідуся», розташованого в
          мальовничому куточку України - на Чернігівщині біля Блакитних озер.
          Пропонуємо вам комфортний відпочинок у затишних хатинках, де ви
          зможете відчути гармонію з природою. Наші дерев&apos;яні будиночки
          забезпечені всім необхідним для комфортного перебування.{" "}
        </p>
        <p className={s.text}>
          Відкрийте для себе справжній відпочинок на природі, насолоджуючись
          чистим повітрям, прогулянками лісом та казковими заходами сонця біля
          озера. Еко-комплекс «На селі у Дідуся» – ідеальне місце для родинного
          відпочинку, романтичних вікендів та відновлення сил.
        </p>
      </div>
      {/* </main> */}
    </>
  );
}
