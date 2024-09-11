"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Quote from "./Quote/Quote";
import MarkdownPreview from "@/functions/MarkdownPreview";

import s from "./Entertainment.module.scss";

type Props = { items: EntertainmentItem[] };

export default function Entertainment({ items }: Props) {
  const aniRef = useRef<Array<Array<HTMLDivElement>>>([[]]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();
  const t = useTranslations("Entertainment");

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500)
  }, []);

  useGSAP(() => {
    //hero block animation
    gsap
      .timeline({
        defaults: {
          autoAlpha: 0,
          ease: "power1.out",
          duration: 0.5,
        },
      })
      .from(`.${s.answer}`, {
        y: -100,
      })
      .from(
        `.${s.question}`,
        {
          y: -100,
        },
        ">-0.3"
      )
      .from(
        `.${s.heroTitle}`,
        {
          y: -100,
        },
        ">-0.3"
      )
      .from(
        `.${s.topQuote}`,
        {
          y: -100,
        },
        ">-0.3"
      )
      .from([`.${s.grandpaWrapper}`], {});

    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isNotMobile: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;
        //big curve animation
        gsap
          .timeline({
            defaults: {
              ease: "power1.out",
            },
            scrollTrigger: {
              trigger: `.${s.backgroundCurve}`,
              start: "top 70%",
              end: "bottom 40%",
              once: true,
              scrub: isMobile ? 10 : 15,
            },
          })
          .from(`.${s.backgroundCurve}`, {
            clipPath: "inset(0% 0% 100% 0%)",
          });
      }
    );

    //entertainment list animation
    aniRef.current.forEach((e, i) => {
      gsap
        .timeline({
          defaults: {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power1.out",
          },
          scrollTrigger: {
            trigger: e[0],
            start: "top 90%",
          },
        })
        .from(e[0], {
          x: i % 2 ? 100 : -100,
        })
        .from(e[1], {})
        .from(
          e[2],
          {
            scale: 0.9,
            x: i % 2 ? -50 : 50,
            y: -50,
          },
          ">-0.5"
        )
        .from(
          e[3],
          {
            scale: 0.9,
            x: i % 2 ? 50 : -50,
            y: -50,
          },
          ">-0.5"
        );
    });

    if (!textWrapperRef.current) return;

    gsap.from(textWrapperRef.current, {
      x: -100,
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
        <div className={s.grandpaWrapper}>
          <Image
            src={"/images/grandpas/Grandpa1.png"}
            alt="Grandpa photo"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
            fill
          />
        </div>
        <h1 className={s.heroTitle}
          dangerouslySetInnerHTML={{
            __html: items[0].title[locale as keyof typeof items[0]['title']],
          }}
        />
        <div className={s.topQuoteWrapper}>
          <div className={s.topQuote}>
            <MarkdownPreview markdown={items[0].quote[locale as keyof typeof items[0]['quote']]} />
          </div>
        </div>
        <div className={s.question}>
          <MarkdownPreview markdown={items[0].subtitle[locale as keyof typeof items[0]['subtitle']]} />
        </div>
        <div className={s.answer}>
          <MarkdownPreview markdown={items[0].text[locale as keyof typeof items[0]['text']]} />
        </div>
      </section>
      <div className={`${s.main} container`}>
        <ul className={s.entertainmentList}>
          {items.slice(1).map(({ id, images, text, title }, i) => (
            <li className={s.entertainmentGroup} key={id}>
              <Quote
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || [];
                  aniRef.current[i][0] = el;
                }}
                position={i % 2 ? "right" : "left"}
                title={title[locale as keyof typeof title]}
              >
                <div
                  className={s.quoteText}
                  ref={(el: HTMLDivElement) => {
                    aniRef.current[i] = aniRef.current[i] || [];
                    aniRef.current[i][1] = el;
                  }}
                >
                  {text[locale as keyof typeof text]}
                </div>
              </Quote>
              <div
                className={`${s.entertainmentImgWrapper} ${i % 2 ? s.left : s.right
                  }`}
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || [];
                  aniRef.current[i][2] = el;
                }}
              >
                <Image
                  src={images[0]}
                  alt=""
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                  fill
                />
              </div>
              <div
                className={`${s.entertainmentImgWrapper} ${i % 2 ? s.right : s.left
                  }`}
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || [];
                  aniRef.current[i][3] = el;
                }}
              >
                <Image
                  src={images[1]}
                  alt=""
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                  fill
                />
              </div>
            </li>
          ))}
        </ul>
        <div className={s.treesWrapper}>
          <Image
            className={s.treesImage}
            src={"/images/backgrounds/christmasTrees.png"}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>
        <div className={s.backgroundCurve}></div>
      </div>
      <div className={`${s.textWrapper} container`} ref={textWrapperRef}>
        <div className={s.text}>
          <MarkdownPreview markdown={t('note1')} />
        </div>
        <div className={s.text}>
          <MarkdownPreview markdown={t('note2')} />
        </div>
      </div>
    </>
  );
}
