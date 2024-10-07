"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Booking from "./Booking/Booking";
import Gallery from "./Gallery/Gallery";
import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "../../functions/MarkdownPreview";
import HouseItem from "../Houses/HouseItem";
import HousesList from "../Houses/HousesList";
import HeroSection from "./HeroSection/HeroSection";
import Map from "./Map/Map";

import s from "./House.module.scss";
import heroSection from "./HeroSection/HeroSection.module.scss";
import map from "./Map/Map.module.scss";

type Props = { item: HouseItem; rooms: HouseItem[] };

export default function House({ item, rooms }: Props) {
  const locale = useLocale();
  const t = useTranslations("HouseItem");

  const {
    cover_photo,
    photo,
    rental_price,
    max_adults,
    extra_adults,
    extra_children,
    extra_adult_price,
    extra_children_price,
    photoDecor,
    treesDecor,
    description,
    long_title,
    decor_text,
    coordinates,
  } = item;

  const titleText = long_title[locale as keyof typeof long_title];

  const decorText = decor_text[locale as keyof typeof decor_text];

  const gallerySimpleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const houseTextRef = useRef<HTMLDivElement>(null);
  const housesRef = useRef<Array<HTMLAnchorElement>>([]);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000)
  });

  useGSAP(
    () => {
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

          //gallery animation
          const tl = gsap.timeline({
            defaults: {
              autoAlpha: 0,
              duration: 1,
              ease: "power1.out",
            },
          });
          rooms.length
            ? tl.from(gallerySimpleRef.current, { scale: 0.9 })
            : tl
                .from(galleryRef.current, { scale: 0.9 })
                .from(`.${s.arrowBlockWrapper}`, { y: -50 }, ">-0.5");

          // house description and booking component animation

          if (!rooms.length) {
            // house description animation
            if (isMobile || isTablet) {
              gsap.from(houseTextRef.current, {
                x: -100,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: houseTextRef.current,
                  start: "top 90%",
                },
              });

              //booking component animation
              gsap.from(bookingRef.current, {
                x: 50,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: bookingRef.current,
                  start: "top 90%",
                },
              });
            }

            // house description and booking component animation
            if (isDesktop) {
              gsap
                .timeline({
                  defaults: {
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: "power1.out",
                  },
                  scrollTrigger: {
                    trigger: `.${s.contentWrapper}`,
                    start: "top 90%",
                  },
                })
                .from(houseTextRef.current, { x: -100, delay: 0.5 })
                .from(bookingRef.current, { x: 100 }, "<");
            }
          } else {
            gsap.from(houseTextRef.current, {
              x: -100,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power1.out",
              scrollTrigger: {
                trigger: houseTextRef.current,
                start: "top 90%",
              },
            });
          }

          //rooms/houses list animation
          if (rooms.length) {
            //hide all houses
            housesRef.current.forEach((h) => {
              gsap.set(h, { autoAlpha: 0 });
            });

            gsap
              .timeline({
                defaults: {
                  autoAlpha: 0,
                  duration: 0.7,
                  ease: "power1.out",
                },
                scrollTrigger: {
                  trigger: `.${s.roomsTitle}`,
                  start: "top 90%",
                },
              })
              .from(`.${s.roomsTitle}`, { x: 50 });

            if (isMobile) {
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

          //grandpa and map animation
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                duration: 0.7,
                ease: "power1.out",
              },
              scrollTrigger: {
                trigger: `.${heroSection.heroSectionWrapper}`,
                start: "top 90%",
              },
            })
            .from(`.${heroSection.grandpa}`, {
              y: -50,
              scale: 0.8,
            })
            .from(
              `.${heroSection.description}`,
              {
                x: 50,
              },
              ">-0.3"
            )
            .from(
              `.${heroSection.curve}`,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 0.5,
              },
              ">-0.3"
            )
            .from(
              `.${map.mapWrapper}`,
              {
                scale: 0.8,
                y: 50,
              },
              ">-0.2"
            );
        }
      );
      ScrollTrigger.refresh(true);
    },
    { dependencies: [rooms] }
  );

  const bookingProps = {
    rental_price,
    rooms,
    max_adults,
    titleText,
    extra_adults,
    extra_children,
    extra_adult_price,
    extra_children_price,
    photoDecor,
    treesDecor,
    ref: bookingRef
  }
  
  return (
    <div className={s.sectionWrapper}>
      {rooms.length ? null : (
        <div className={`${s.arrowBlockWrapper}`}>
          <p className={s.textDecor}>
            {t('click')}
          </p>
          <div className={s.arrowWrapper}>
            <Icon name="arrow-house-small" />
          </div>
        </div>
      )}

      {rooms.length ? (
        <div className={s.apartmentGalleryWrapper} ref={gallerySimpleRef}>
          <div className={s.imageWrapper}>
            <Image
              fill
              alt={t('altText', { title: titleText})}
              src={cover_photo}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <p className={s.grandpaQuote}>
            {t('look')}
          </p>

          <div className={s.imageGrandpa}>
            <Image
              fill
              alt=""
              src="/images/grandpas/Grandpa2.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div
            className={s.imageDecor}
            style={
              {
                "--background-image-url": `url(${treesDecor})`,
              } as React.CSSProperties
            }
          >
            <Image
              fill
              alt=""
              src={photoDecor}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      ) : (
        <Gallery pictures={photo} houseName={titleText} ref={galleryRef} />
      )}

      <div className={`${s.contentWrapper} ${rooms.length ? s.apartment : ""}`}>
        <div className={s.textWrapper} ref={houseTextRef}>
          <h1 className={s.headline}>{titleText}</h1>
          <div className={s.text}>
            <MarkdownPreview markdown={description[locale as keyof typeof description]} />
          </div>
          {/* services icons */}
          {rooms.length ? null : (
            <div className={s.servicesWrapper}>
              <div className={s.iconWrapper}>
                <Icon name="house-bath" className={s.servicesIcon} />
              </div>
              <div className={s.iconWrapper}>
                <Icon name="house-tv" className={s.servicesIcon} />
              </div>
              <div className={s.iconWrapper}>
                <Icon name="house-car" className={s.servicesIcon} />
              </div>
              <div className={s.iconWrapper}>
                <Icon name="house-pan" className={s.servicesIcon} />
              </div>
            </div>
          )}
        </div>
        {/* booking block */}
        {rooms.length ? null : (
          <Booking {...bookingProps} />
        )}
      </div>

      {rooms.length ? (
        <HousesList numberOfHouses={rooms.length} patternOffset={false}>
          <>
            <p className={`${s.roomsTitle} ${rooms.length ? s.apartment : ""}`}>
              {t('roomsTitle')}
            </p>
            <div className={s.roomsWrapper}>
              {rooms.map((room: HouseItem, i: number) => (
                <HouseItem
                  data={room}
                  key={room.id}
                  rooms={0}
                  ref={(el: HTMLAnchorElement) => (housesRef.current[i] = el)}
                />
              ))}
            </div>
          </>
        </HousesList>
      ) : null}

      <HeroSection text={decorText} />
      <Map locale={locale} coordinates={coordinates} />
    </div>
  );
}
