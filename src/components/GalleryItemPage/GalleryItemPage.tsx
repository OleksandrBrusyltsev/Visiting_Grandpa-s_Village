"use client";
import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Icon from "../ui/Icon/Icon";
import GalleryItemPageList from "./GalleryItemPageList";
import SwiperGalleryItem from "./SwiperGalleryItem";
import Modal from "../ui/Modal/Modal";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import SloganBlock from "./SloganBlock";

import s from "./GalleryItemPage.module.scss";

type Props = { item: GalleryItem };

export default function GalleryItemPage({ item }: Props) {
  const locale = useLocale();
  const t = useTranslations("Gallery");

  const [isOpenSwiper, setIsOpenSwiper] = useState<boolean>(false);
  const [firstSlide, setFirstSlide] = useState<number>(0);
  const { description, photo_urls, alt } = item;
  const galleryRef = useRef<Array<HTMLLIElement>>([]);
  const { isMobile } = useContext(MatchMediaContext);
  const quote = description[locale as keyof typeof description];

  const toggleSwiper = (i: number) => {
    setIsOpenSwiper(!isOpenSwiper);
    setFirstSlide(i);
  };
  const handleKeyboardToggle = (
    e: React.KeyboardEvent<HTMLLIElement>,
    i: number
  ) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && !isOpenSwiper) {
      toggleSwiper(i);
    }
  };

  useGSAP(() => {
    ScrollTrigger.refresh();

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
        gsap
          .timeline({
            defaults: {
              opacity: 0,
              ease: "power1.out",
              duration: isMobile ? 0.7 : isTablet ? 0.8 : 1,
            },
          })
          .from(`.${s.heroTitle}`, {
            x: isMobile ? -100 : -200,
          })
          .from(
            `.${s.grandpaWrapper}`,
            {
              x: isMobile ? 100 : 200,
            },
            "<"
          )
          .from(`.${s.callToClick}`, {
            scale: 0.9,
          });
        gsap.set(galleryRef.current, { autoAlpha: 0 });
        ScrollTrigger.batch(galleryRef.current, {
          interval: isMobile ? 0.6 : 0.2,
          batchMax: isDesktop ? 4 : isTablet ? 3 : 1,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              {
                autoAlpha: 0,
              },
              {
                autoAlpha: 1,
                stagger: {
                  each: 0.2,
                },
                ease: "power1.out",
              }
            ),
          start: "top 70%",
          end: "bottom start",
          once: true,
        });
      }
    );
  });

  return (
    <>
      <div className={s.galleryItemWrapper}>
        <section className={`${s.hero} container`}>
          <div className={s.grandpaWrapper}>
            <Image
              src={"/images/grandpas/Grandpa1.png"}
              alt={"Grandpa photo"}
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
          <h1 className={s.heroTitle}>{quote}</h1>
        </section>
        <div className={s.main}>
          <p className={`${s.callToClick} container`}>
            <span className={s.desktopOnly}>{t('clickMode', { mode: 'desktop' })}</span>
            <span className={s.mobileOnly}>{t('clickMode', { mode: 'mobile' })}</span>
            <Icon name="curve-gallery-chapter" className={s.curve} />
          </p>
          <GalleryItemPageList>
            {photo_urls.map((img, i) => (
              <li
                className={s.itemWrapper}
                ref={(el: any) => (galleryRef.current[i] = el)}
                tabIndex={0}
                onClick={() => toggleSwiper(i)}
                onKeyDown={(e) => handleKeyboardToggle(e, i)}
                key={i}
              >
                <div className={s.imageWrapper}>
                  <Image
                    src={img}
                    alt={alt[locale as keyof typeof alt]}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 35vw, 25vw"
                    fill
                  />
                </div>
              </li>
            ))}
          </GalleryItemPageList>
          <SloganBlock />
        </div>
      </div>
      {isOpenSwiper && (
        <Modal
          isOpen={isOpenSwiper}
          onClose={() => setIsOpenSwiper(false)}
          wrapperStyles={{
            width: isMobile ? "100vw" : "90vw",
          }}
        >
          <SwiperGalleryItem gallery={photo_urls} initialSlide={firstSlide} alt={item.alt[locale as keyof typeof item.alt]} />
        </Modal>
      )}
    </>
  );
}
