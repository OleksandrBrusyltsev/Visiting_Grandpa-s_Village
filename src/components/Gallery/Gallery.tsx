"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import GalleryItem from "./GalleryItem";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "@/functions/MarkdownPreview";

import s from "./Gallery.module.scss";

type Props = { items: GalleryItem[] };

export default function Gallery({ items }: Props) {
  const { locale } = useParams();
  const galleryRef = useRef<Array<HTMLAnchorElement>>([]);
  const t = useTranslations('Gallery');
  const tGlobal = useTranslations('UI');

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1)
  }, []);

  useGSAP(() => {
    //hero block animation
    gsap
      .timeline({
        defaults: {
          autoAlpha: 0,
          ease: "power1.out",
          duration: 1,
        },
      })
      .from(`.${s.descr1}`, {
        x: -200,
      })
      .from(
        `.${s.grandpa}`,
        {
          x: 200,
        },
        ">-0.7"
      )
      .from(
        `.${s.descr2}`,
        {
          x: -200,
        },
        ">-0.7"
      )
      .from(
        `.${s.callToClick}`,
        {
          scale: 0.9,
        },
        ">-0.3"
      )
      .from(
        `.${s.backgroundCurve}`,
        {
          scale: 0.9,
          duration: 1,
        },
        ">-0.5"
      );

    //gallery list animation
    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isNotMobile: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;
        galleryRef.current.forEach((h) => {
          gsap.set(h, { autoAlpha: 0 });
        });

        if (isMobile) {
          galleryRef.current.forEach((g, i) => {
            gsap.fromTo(
              g,
              {
                x: i % 2 ? 100 : -100,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                delay: 0.3,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: g,
                  start: "top 90%",
                },
              }
            );
          });
        }
        if (isNotMobile) {
          ScrollTrigger.batch(galleryRef.current, {
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
                  duration: 0.8,
                  delay: 0.3,
                  ease: "power1.out",
                }
              ),
            start: "top 90%",
            once: true,
          });
        }
      }
    );
    ScrollTrigger.refresh(true);
  });

  return (
    <div className="container">
      <div className={s.backgroundImages}>
        <section className={s.hero}>
          <div className={s.heroWrapper}>
            <h1 className={s.descr1}
              dangerouslySetInnerHTML={{
                __html: items[0].title[locale as keyof typeof items[0]["title"]],
              }} />
            <div className={s.descr2}>
              <MarkdownPreview markdown={
                items[0].description[locale as keyof typeof items[0]["description"]]
              } />
            </div>
            <div className={s.grandpa}>
              <Image
                fill
                alt={items[0].cover[0].description[locale as keyof typeof items[0]["cover"][0]["description"]]}
                src={items[0].cover[0].src}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
        <div className={s.main}>
          <section className={s.memoriesGallery}>
            <p className={s.callToClick}>
              <span className={s.desktopOnly}>{t('clickMode', { mode: 'desktop' })}</span>
              <span className={s.mobileOnly}>{t('clickMode', { mode: 'mobile' })}</span>
            </p>
            <div className={s.galleryWrapper}>
              {items.slice(1).map((item, i) => (
                <GalleryItem
                  ref={(el: HTMLAnchorElement) => (galleryRef.current[i] = el)}
                  data={item}
                  key={item.id}
                />
              ))}
            </div>
            <div className={s.backgroundCurve}></div>
          </section>
          <div className={s.callToAction}>
            <div className={s.cloud}>
              <Icon name="cloud" />
            </div>
            <p className={s.slogan}>
              {t('slogan')}
            </p>
            <Link href={`/${locale}/booking`}>
              <Button
                label={tGlobal('visit')}
                type={"button"}
                className={s.btnCallToAction}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
