"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Quote from "./Quote/Quote";

import s from "./Entertainment.module.scss";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

type Props = { items: EntertainmentItem[] };

export default function Entertainment({ items }: Props) {
  const aniRef = useRef<Array<Array<HTMLDivElement>>>([[]]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500)
  });

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
        <h1 className={s.heroTitle}>База відпочинку для незабутніх спогадів</h1>
        <div className={s.topQuoteWrapper}>
          <p className={s.topQuote}>
            &quot;Мистецтво Відпочинку - не завжди означає Дію, навчись нічого
            не робити, а просто насолодись тишею та спокоєм.&quot;
          </p>
        </div>
        <p className={s.question}>Як саме?</p>
        <p className={s.answer}>Дідусь покаже тобі</p>
      </section>
      <div className={`${s.main} container`}>
        <ul className={s.entertainmentList}>
          {items.map(({ images, text, ...props }, i) => (
            <li className={s.entertainmentGroup} key={i}>
              <Quote
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || [];
                  aniRef.current[i][0] = el;
                }}
                position={i % 2 ? "right" : "left"}
                {...props}
              >
                <div
                  className={s.quoteText}
                  ref={(el: HTMLDivElement) => {
                    aniRef.current[i] = aniRef.current[i] || [];
                    aniRef.current[i][1] = el;
                  }}
                >
                  {text}
                </div>
              </Quote>
              <div
                className={`${s.entertainmentImgWrapper} ${
                  i % 2 ? s.left : s.right
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
                className={`${s.entertainmentImgWrapper} ${
                  i % 2 ? s.right : s.left
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
        <p className={s.text}>
          База відпочинку «На селі у Дідуся» пропонує атмосферу спокою, де кожен
          може зануритися у тишу природи, відновити сили та створити нові
          спогади. Тут ви знайдете прості, але важливі радощі життя: купання в
          природних водоймах, збирання спогадів, радість від сміху та
          спілкування з близькими.
        </p>
        <p className={s.text}>
          Наша база відпочинку «На селі у Дідуся» ідеально підходить для тих,
          хто шукає гармонію з природою, затишок і незабутні моменти разом з
          родиною та друзями.
        </p>
      </div>
    </>
  );
}
