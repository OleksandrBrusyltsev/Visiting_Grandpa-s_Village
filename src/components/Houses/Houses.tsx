"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
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
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("Houses");

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, []);

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

        //hero block animation
        const heroBlockTimeline =
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: isMobile ? 0.7 : isTablet ? 0.8 : 1.2,
                clearProps: "all",
              },
            });

        //booking component and houses list title animation
        const bookingFormTimeline = gsap.timeline({
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
          heroBlockTimeline
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
          bookingFormTimeline
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
          heroBlockTimeline
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
          bookingFormTimeline
            .from(`.${s.curve}`, {
              clipPath: "inset(0% 0% 100% 0%)",
              autoAlpha: 1,
              duration: 0.5,
            })
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

        if (isMobile) {
          //hero block animation 
          heroBlockTimeline
            .from(`.${s.descr1}`, { y: -150 })
            .from(`.${s.map}`, { x: -150, y: 150 }, "<")
            .from([`.${s.descr2}`, `.${s.grandpa}`], { x: 150 }, "<");

          //booking component and houses list title animation
          bookingFormTimeline
            .from(`.${s.bookingForm}`, { y: 100, scale: 0.9 })
            .from(`.${s.housesTitle}`, { y: 100 }, ">-0.4");

          //houses list animation
          housesRef.current.forEach((h, i) => {
            gsap.fromTo(
              h,
              {
                x: i % 2 ? 100 : -100,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: h,
                  start: "top 80%",
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

    if (!textWrapperRef.current) return;

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

    ScrollTrigger.refresh();
  });

  return (
    <>
      <section className={`${s.hero} container`}>
        <div className={s.heroWrapper}>
          <h1 className={s.descr1}>
            {t('mainTitle')}
          </h1>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className={s.descr2}>
            {t('quote')}
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

      <HousesList data={items} className="container">
        <>
          <div className={s.housesTitle}>
            <p>{t('title')}</p>
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
          {t('note1')}{" "}
        </p>
        <p className={s.text}>
          {t('note2')}{" "}
        </p>
      </div>
    </>
  );
}
