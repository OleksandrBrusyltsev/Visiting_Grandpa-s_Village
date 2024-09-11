"use client";

import Image from "next/image";
import { useContext, useRef } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import BookingComponent from "../BookingComponent/BookingComponent";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import MarkdownPreview from "@/functions/MarkdownPreview";
import WelcomeBlock from "../WelcomeBlock/WelcomeBlock";

import css from "./Hero.module.scss";
import { main } from "@/data/main";

const illustration1 =
  "https://res.cloudinary.com/dzbm3urzv/image/upload/v1719517246/kdb4jt6xrg0oihmxg9jo.png";
const illustration2 =
  "https://res.cloudinary.com/dzbm3urzv/image/upload/v1719517248/rsyiks4v7smodddac55g.png";
const illustration3 =
  "https://res.cloudinary.com/dzbm3urzv/image/upload/v1719517250/bsy7q5as5cqhbed5uu9v.png";


const Hero = () => {
  const locale = useLocale();
  const box1Ref = useRef<HTMLDivElement>(null);
  const box99Ref = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const line4Animation = useRef<HTMLDivElement>(null);

  const grandpaRef = useRef<HTMLImageElement>(null);
  const photo5Ref = useRef<HTMLImageElement>(null);
  const photo6Ref = useRef<HTMLImageElement>(null);
  const illustration3Ref = useRef<HTMLImageElement>(null);
  const illustration2Ref = useRef<HTMLImageElement>(null);

  const photo1Animation = useRef<HTMLImageElement>(null);
  const illustration1Animation = useRef<HTMLImageElement>(null);

  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const photo4Animation = useRef<HTMLImageElement>(null);
  const photo3Animation = useRef<HTMLImageElement>(null);
  const photo2Animation = useRef<HTMLImageElement>(null);
  const line2Animation = useRef<HTMLDivElement>(null);

  const box4Ref = useRef<HTMLDivElement>(null);

  const box7Ref = useRef<HTMLDivElement>(null);
  const photo7Animation = useRef<HTMLImageElement>(null);
  const photo8Animation = useRef<HTMLImageElement>(null);
  const grandpa3Animation = useRef<HTMLImageElement>(null);
  const grandpa1Ref = useRef<HTMLImageElement>(null);

  const { isMobile } = useContext(MatchMediaContext);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isLaptop: "(min-width: 768px) and (max-width: 1279px)",
        isDesktop: "(min-width: 1280px)",
      },
      (context) => {
        const { isMobile, isLaptop, isDesktop } =
          context.conditions as gsap.Conditions;

        if (isMobile) {
          gsap
            .timeline({
              defaults: {
                ease: "power1.out",
                duration: 0.7,
                clearProps: "transform",
                opacity: 0,
              },
            })
            //дедуля
            .from(grandpa1Ref.current, { x: 100 })
            //текст Привіт
            .from([box1Ref.current, box99Ref.current], { x: -100 }, "<");

          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                ease: "power1.out",
              },
              scrollTrigger: {
                trigger: line1Ref.current,
              },
            })
            //над букингом 2 иллюстрации
            .from([photo1Animation.current, illustration1Animation.current], {
              x: (i) => (i % 2 ? 100 : -100),
              y: (i) => (i % 2 ? 50 : -50),
              opacity: 0,
            })
            //путевая линия
            .from(line1Ref.current, {
              clipPath: "inset(0% 0% 100% 0%)",
            })
            //booking
            .from(calendarRef.current, {
              clipPath: "inset(0% 0% 100% 0%)",
            });

          //Затишне місце
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                ease: "power1.out",
                opacity: 0,
              },
              scrollTrigger: {
                trigger: box2Ref.current,
                start: "top 70%",
              },
            })
            .from(
              [
                `.${css.grandbox2} > .${css.title1}.${css.textContainer}`,
                box3Ref.current,
              ],
              {
                x: 100,
              }
            )
            .from(
              grandpaRef.current,
              {
                x: -100,
              },
              "<"
            );

          //иллюстрации под Затишним місцем
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
              },
              scrollTrigger: {
                trigger: photo2Animation.current,
                start: "top 70%",
                end: "bottom start",
              },
            })
            .from(
              [
                photo2Animation.current,
                photo4Animation.current,
                photo3Animation.current,
              ],
              {
                x: (i) => (i % 2 ? -100 : 100),
                y: 50,
                opacity: 0,
                stagger: 0.3,
              }
            )
            //путевая линия
            .from(
              line2Animation.current,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 1.5,
              },
              ">-1"
            );

          //ДОТОРКНИСЬ ДО ПРИРОДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                clearProps: "transform",
                opacity: 0,
              },
              scrollTrigger: {
                trigger: box4Ref.current,
                start: "top 80%",
              },
            })
            .from(box4Ref.current, {
              clipPath: "inset(0% 100% 0% 0%)",
            });

          //Иллюстрации под ДОТОРКНИСЬ ДО ПРИРОДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                clearProps: "transform",
              },
              scrollTrigger: {
                trigger: illustration3Ref.current,
                start: "top 80%",
              },
            })
            .from(`.${css.line3Box}`, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.5,
            })
            .from(
              [illustration3Ref.current, photo5Ref.current, photo6Ref.current],
              {
                x: (i) => (i % 2 ? 100 : -100),
                y: 50,
                opacity: 0,
                stagger: 0.3,
              },
              "<"
            );

          //ЧАС ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                clearProps: "transform",
              },
              scrollTrigger: {
                trigger: box7Ref.current,
                start: "top 80%",
              },
            })
            .from(illustration2Ref.current, {
              x: 100,
              opacity: 0,
            })
            .from(
              box7Ref.current,
              {
                clipPath: "inset(0% 0% 100% 0%)",
              },
              ">-0.5"
            );

          //иллюстрации под ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.7,
                scale: 0.5,
                opacity: 0,
              },
              scrollTrigger: {
                trigger: grandpa3Animation.current,
                start: "top 80%",
              },
            })
            .from(grandpa3Animation.current, {})
            .from(photo7Animation.current, {
              x: -100,
            })
            .from(
              photo8Animation.current,
              {
                y: -50,
                x: -100,
              },
              "<"
            )
            .from(line4Animation.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              scale: 1,
              opacity: 1,
            });
        }

        if (isLaptop) {
          gsap
            .timeline({
              defaults: {
                ease: "power1.out",
                duration: 1,
                clearProps: "transform",
                opacity: 0,
              },
            })
            //дедуля
            .from(grandpa1Ref.current, { x: 200 })
            //текст Привіт
            .from([box1Ref.current, box99Ref.current], { x: -200 }, "<");

          //путевая линия
          gsap
            .timeline({
              defaults: {
                ease: "power1.out",
                duration: 0.8,
              },
              scrollTrigger: {
                trigger: line1Ref.current,
                start: "top 60%",
              },
            })
            .from(line1Ref.current, {
              clipPath: "inset(0% 0% 100% 0%)",
            })
            //booking
            .from(
              calendarRef.current,
              {
                clipPath: "inset(0% 0% 100% 0%)",
              },
              ">-0.3"
            )
            //над букингом 2 иллюстрации
            .from([photo1Animation.current, illustration1Animation.current], {
              y: 30,
              opacity: 0,
              duration: 0.5,
            });

          //Затишне місце
          gsap
            .timeline({
              defaults: {
                duration: 0.8,
                ease: "power1.out",
                opacity: 0,
              },
              scrollTrigger: {
                trigger: box2Ref.current,
                start: "top 70%",
              },
            })
            .from(
              [
                `.${css.grandbox2} > .${css.title1}.${css.textContainer}`,
                box3Ref.current,
              ],
              { x: -200 }
            )
            .from(grandpaRef.current, {}, ">-0.4");

          //иллюстрации под Затишним місцем
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 0.8,
              },
              scrollTrigger: {
                trigger: photo2Animation.current,
                start: "top 70%",
                end: "bottom start",
              },
            })
            .from(photo2Animation.current, {
              y: -100,
            })
            .from(
              photo3Animation.current,
              {
                x: 200,
              },
              ">-0.4"
            )
            .from(
              photo4Animation.current,
              {
                x: -200,
              },
              ">-0.4"
            )
            //путевая линия
            .from(
              line2Animation.current,
              {
                clipPath: "inset(0% 100% 0% 0%)",
                opacity: 1,
                duration: 1,
              },
              ">-1"
            );

          //ДОТОРКНИСЬ ДО ПРИРОДИ
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 0.6,
              },
              scrollTrigger: {
                trigger: box4Ref.current,
                start: "top 80%",
              },
            })
            .from(box4Ref.current, {
              clipPath: "inset(0% 100% 0% 0%)",
            })
            .from(illustration3Ref.current, {}, ">-0.3");

          //Иллюстрации под ДОТОРКНИСЬ ДО ПРИРОДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.8,
              },
              scrollTrigger: {
                trigger: photo5Ref.current,
                start: "top 80%",
              },
            })
            .from(photo5Ref.current, {
              x: -200,
              opacity: 0,
            })
            .from(
              `.${css.line3Box}`,
              {
                clipPath: "inset(0% 0% 0% 100%)",
                duration: 1,
              },
              "<"
            )
            .from(photo6Ref.current, {
              x: 200,
              opacity: 0,
            });

          //ЧАС ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.6,
              },
              scrollTrigger: {
                trigger: box7Ref.current,
                start: "top 80%",
              },
            })
            .from(illustration2Ref.current, {
              y: -50,
              opacity: 0,
            })
            .from(
              box7Ref.current,
              {
                clipPath: "inset(0% 0% 100% 0%)",
              },
              ">-0.5"
            );

          //иллюстрации под ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 1,
              },
              scrollTrigger: {
                trigger: grandpa3Animation.current,
                start: "top 80%",
              },
            })
            .from(grandpa3Animation.current, {
              x: 200,
              duration: 0.8,
            })
            .from(photo7Animation.current, {
              x: 200,
              y: -20,
              scale: 0.5,
            })
            .from(
              photo8Animation.current,
              {
                y: -200,
                scale: 0.5,
              },
              "<"
            )
            .from(line4Animation.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              opacity: 1,
            });
        }

        if (isDesktop) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 1,
                clearProps: "transform",
              },
            })
            .from(
              [box1Ref.current, photo1Animation.current, box99Ref.current],
              { x: (i) => (i % 2 ? 200 : -200) }
            )
            .from(grandpa1Ref.current, { y: -200 }, "<");

          //booking block
          gsap
            .timeline({
              defaults: {
                delay: 0.1,
              },
              scrollTrigger: {
                trigger: calendarRef.current,
                start: "top 90%",
              },
            })
            .from(line1Ref.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1,
            })
            .from(illustration1Animation.current, { opacity: 0 })
            .from(
              calendarRef.current,
              {
                clipPath: "inset(0% 100% 0% 0%)",
              },
              "<"
            );

          //затишне місце сили
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 1,
              },
              scrollTrigger: {
                trigger: box2Ref.current,
                start: "top 80%",
              },
            })
            .from(
              [
                box3Ref.current,
                grandpaRef.current,
                `.${css.grandbox2} > .${css.title1}`,
              ],
              {
                x: (i) => (i % 2 ? 200 : -200),
              },
              "<"
            );

          //блок иллюстраций под Тихим местом
          //иллюстрации
          gsap.from(photo2Animation.current, {
            y: -200,
            x: -200,
            scale: 0.5,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: photo2Animation.current,
              start: "top 60%",
            },
          });
          gsap
            .timeline({
              defaults: {
                duration: 1,
              },
              scrollTrigger: {
                trigger: photo3Animation.current,
                start: "top 70%",
              },
            })
            .from(photo3Animation.current, {
              x: 200,
              opacity: 0,
            })
            //путевая линия
            .from(line2Animation.current, {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 1.5,
            });
          gsap.from(photo4Animation.current, {
            x: -200,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: photo4Animation.current,
              start: "top 70%",
            },
          });

          //ДОТОРКНИСЬ
          gsap
            .timeline({
              scrollTrigger: {
                trigger: box4Ref.current,
                start: "top 80%",
              },
            })
            .from(box4Ref.current, {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 0.8,
            })
            .from(illustration3Ref.current, {
              opacity: 0,
            });

          //иллюстрации под ДОТОРКНИСЬ + ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 0.8,
              },
              scrollTrigger: {
                trigger: photo5Ref.current,
                start: "top 60%",
              },
            })
            .from(photo6Ref.current, {
              y: -100,
            })
            .from(
              photo5Ref.current,
              {
                y: -50,
                x: 100,
              },
              ">-0.4"
            )
            .from(`.${css.line3Box}`, {
              clipPath: "inset(0% 0% 0% 100%)",
              duration: 1.5,
              opacity: 1,
            })
            .from(illustration2Ref.current, {
              duration: 0.5,
            })
            .from(box7Ref.current, {
              clipPath: "inset(0% 100% 0% 0%)",
              opacity: 1,
            });

          //иллюстрации под ЗБИРАТИ СПОГАДИ
          gsap
            .timeline({
              defaults: {
                duration: 0.8,
              },
              scrollTrigger: {
                trigger: grandpa3Animation.current,
                start: "top 70%",
              },
            })
            .from(grandpa3Animation.current, {
              scale: 0.6,
              opacity: 0,
            })
            .from(photo7Animation.current, {
              x: -200,
              opacity: 0,
            })
            .from(
              photo8Animation.current,
              {
                scrollTrigger: photo8Animation.current,
                x: 200,
                opacity: 0,
              },
              "<"
            )
            .from(line4Animation.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.5,
            });
        }
      }
    );

    ScrollTrigger.refresh();
  }, {});

  return (
    <>
      <section className={css.section}>
        <div className={css.box1Ref}>
          <Image
            src={main[0].photos[0]}
            alt=""
            width={334}
            height={334}
            className={css.grandpa1}
            ref={grandpa1Ref}
          />
          <div className={css.grandbox1} ref={box1Ref}>
            <h1
              className={`${css.textBox1} ${css.mainTitle}`}
              dangerouslySetInnerHTML={{ __html: main[0].title[locale as keyof typeof main[0]["title"]] }} />
          </div>

          <div ref={box99Ref}>
            <div className={`${css.text1} ${css.textBox1}`}>
              <div>
                <span className={css.text3}>
                  <MarkdownPreview markdown={main[0].subtitle[locale as keyof typeof main[0]["subtitle"]]} />
                </span>{" "}
                <MarkdownPreview markdown={main[0].description[locale as keyof typeof main[0]["description"]]} />
              </div>
            </div>
            <div className={`${css.text2} ${css.textBox1}`}>
              <MarkdownPreview markdown={main[0].quote[locale as keyof typeof main[0]["quote"]]} />
            </div>
          </div>
        </div>

        <div className={css.imgBox}>
          <Image
            src={main[0].photos[1]}
            alt=""
            width={544}
            height={492}
            className={css.photo1}
            ref={photo1Animation}
          />

          <Image
            src={illustration1}
            alt=""
            width={410}
            height={372}
            className={css.illustration1}
            ref={illustration1Animation}
          />
          <div className={css.line1Box} ref={line1Ref}>
            {isMobile ? (
              <svg
                viewBox="0 0 195 269"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${css.svg} ${css.line1}`}
              >
                <path
                  d="M0.431764 267C0.431764 267.736 1.02872 268.333 1.7651 268.333C2.50148 268.333 3.09843 267.736 3.09843 267C3.09843 266.264 2.50148 265.667 1.7651 265.667C1.02872 265.667 0.431764 266.264 0.431764 267ZM99.4135 128.901L99.3839 128.653L99.4135 128.901ZM191.667 2C191.667 2.73638 192.264 3.33333 193 3.33333C193.736 3.33333 194.333 2.73638 194.333 2C194.333 1.26362 193.736 0.666667 193 0.666667C192.264 0.666667 191.667 1.26362 191.667 2ZM2.01321 266.969C0.893455 257.898 -0.672243 226.525 11.0104 195.88C22.6861 165.253 47.5908 135.35 99.4432 129.15L99.3839 128.653C47.3147 134.88 22.2727 164.933 10.5432 195.702C-1.17917 226.451 0.391685 257.914 1.51698 267.031L2.01321 266.969ZM99.4432 129.15C138.517 124.477 161.99 108.814 175.681 86.2251C189.361 63.6535 193.25 34.2033 193.25 2H192.75C192.75 34.1805 188.86 63.5155 175.253 85.9659C161.658 108.399 138.337 123.995 99.3839 128.653L99.4432 129.15Z"
                  fill="#3F5540"
                />
              </svg>
            ) : (
              <svg
                className={`${css.svg} ${css.line1}`}
                viewBox="0 0 201 246"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.565852 243C0.565852 244.473 1.75976 245.667 3.23252 245.667C4.70528 245.667 5.89919 244.473 5.89919 243C5.89919 241.527 4.70528 240.333 3.23252 240.333C1.75976 240.333 0.565852 241.527 0.565852 243ZM96.6382 107.467L96.5814 106.97L96.6382 107.467ZM187.717 3C187.717 4.47276 188.911 5.66667 190.384 5.66667C191.857 5.66667 193.05 4.47276 193.05 3C193.05 1.52724 191.857 0.333333 190.384 0.333333C188.911 0.333333 187.717 1.52724 187.717 3ZM3.72807 242.933C1.00947 222.684 2.02618 191.46 14.8395 164.045C27.6376 136.662 52.2105 113.055 96.6951 107.963L96.5814 106.97C51.7234 112.104 26.8663 135.951 13.9336 163.621C1.01613 191.26 0.00123632 222.69 2.73697 243.067L3.72807 242.933ZM96.6951 107.963C138.484 103.18 169.399 92.1539 186.185 74.6548C194.591 65.8919 199.449 55.5106 200.348 43.5085C201.246 31.5162 198.189 17.9419 190.834 2.78175L189.934 3.21825C197.237 18.2715 200.231 31.6673 199.35 43.4339C198.47 55.1907 193.719 65.3571 185.464 73.9625C168.928 91.2003 138.311 102.194 96.5814 106.97L96.6951 107.963Z"
                  fill="#3F5540"
                />
              </svg>
            )}
          </div>
        </div>

        <div className={css.calendarBox} ref={calendarRef}>
          <BookingComponent />
        </div>

        <div className={`${css.grandbox2} `} ref={box2Ref}>
          <div className={`${css.imgMask}`}>
            <Image
              src={main[1].photos[0]}
              alt=""
              width={327}
              height={324}
              className={`${css.grandpa2}`}
              ref={grandpaRef}
            />
          </div>
          <h2 className={`${css.title1} ${css.textContainer}`}>
            <MarkdownPreview markdown={main[1].title[locale as keyof typeof main[1]["title"]]} />

          </h2>
        </div>
        <div className={`${css.textContainer}`} ref={box3Ref}>
          <div className={css.text1}>
            <MarkdownPreview markdown={main[1].description[locale as keyof typeof main[1]["description"]]} />
          </div>
          <div className={`${css.text2} ${css.boxForAlign}`}>
            <MarkdownPreview markdown={main[1].quote[locale as keyof typeof main[1]["quote"]]} />
          </div>
        </div>
        <div className={css.imgBox2}>
          <Image
            src={main[1].photos[1]}
            alt=""
            width={748}
            height={410}
            className={`${css.photo2}`}
            ref={photo2Animation}
          />

          <Image
            src={main[1].photos[3]}
            alt=""
            width={556}
            height={354}
            className={`${css.photo4}`}
            ref={photo4Animation}
          />

          <Image
            src={main[1].photos[2]}
            alt=""
            width={606}
            height={526}
            className={`${css.photo3}`}
            ref={photo3Animation}
          />

          <div className={css.line2Box} ref={line2Animation}>
            {isMobile ? (
              <svg
                viewBox="0 0 265 271"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${css.svg} ${css.line2}`}
                preserveAspectRatio="none"
              >
                <path
                  d="M27.6664 1.5C27.6664 2.23638 28.2634 2.83333 28.9997 2.83333C29.7361 2.83333 30.3331 2.23638 30.3331 1.5C30.3331 0.76362 29.7361 0.166667 28.9997 0.166667C28.2634 0.166667 27.6664 0.76362 27.6664 1.5ZM107 156.5L107.047 156.745L107.058 156.743L107.069 156.74L107 156.5ZM261.666 269C261.666 269.736 262.263 270.333 262.999 270.333C263.736 270.333 264.333 269.736 264.333 269C264.333 268.264 263.736 267.667 262.999 267.667C262.263 267.667 261.666 268.264 261.666 269ZM28.8345 1.31238C-4.77145 30.905 -5.82887 73.7417 11.8051 107.172C29.4363 140.597 65.7838 164.678 107.047 156.745L106.952 156.255C65.9542 164.136 29.8011 140.217 12.2473 106.939C-5.30377 73.6655 -4.23054 31.095 29.165 1.68762L28.8345 1.31238ZM107.069 156.74C166.555 139.592 246.876 176.02 262.753 269.042L263.246 268.958C247.319 175.644 166.704 139.029 106.93 156.26L107.069 156.74Z"
                  fill="#3F5540"
                />
              </svg>
            ) : (
              <svg
                className={`${css.svg} ${css.line2}`}
                viewBox="0 0 920 920"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM382.885 503.037L382.965 503.531L382.984 503.528L383.003 503.523L382.885 503.037ZM914.333 917C914.333 918.473 915.527 919.667 917 919.667C918.473 919.667 919.667 918.473 919.667 917C919.667 915.527 918.473 914.333 917 914.333C915.527 914.333 914.333 915.527 914.333 917ZM2.50023 3.01517C5.17382 91.1123 12.308 230.501 62.7407 340.73C87.9618 395.854 124.026 443.718 175.805 474.219C227.59 504.724 295.038 517.829 382.965 503.531L382.804 502.544C295.061 516.812 227.858 503.721 176.312 473.358C124.76 442.991 88.8144 395.314 63.6501 340.314C13.3122 230.293 6.17381 91.097 3.49977 2.98483L2.50023 3.01517ZM383.003 503.523C510.223 472.502 626.615 491.836 719.682 560.914C812.758 629.999 882.569 748.888 916.51 917.099L917.49 916.901C883.516 748.529 813.61 629.386 720.278 560.111C626.936 490.828 510.228 471.472 382.766 502.552L383.003 503.523Z"
                  fill="#3F5540"
                />
              </svg>
            )}
          </div>
        </div>

        <div className={css.textContainer1} ref={box4Ref}>
          <h2 className={`${css.title1} ${css.add}`}
            dangerouslySetInnerHTML={{ __html: main[2].title[locale as keyof typeof main[2]["title"]] }} />
          <div className={css.text1}>
            <MarkdownPreview markdown={main[2].description[locale as keyof typeof main[2]["description"]]} />
          </div>
        </div>

        <div className={css.imgBox3}>
          <Image
            src={illustration3}
            alt=""
            width={488}
            height={458}
            className={css.illustration3}
            ref={illustration3Ref}
          />

          <Image
            src={main[2].photos[0]}
            alt=""
            width={660}
            height={496}
            className={css.photo6}
            ref={photo5Ref}
          />

          <Image
            src={main[2].photos[1]}
            alt=""
            width={499}
            height={430}
            className={css.photo5}
            ref={photo6Ref}
          />

          <div className={css.line3Box}>
            {isMobile ? (
              <svg
                viewBox="0 0 237 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${css.svg} ${css.line3}`}
                preserveAspectRatio="none"
              >
                <path
                  d="M214.845 2.6671C215.213 3.30482 216.028 3.52332 216.666 3.15513C217.304 2.78693 217.522 1.97148 217.154 1.33376C216.786 0.696032 215.971 0.477532 215.333 0.845727C214.695 1.21392 214.477 2.02938 214.845 2.6671ZM58.8449 339.167C59.2131 339.804 60.0285 340.023 60.6662 339.655C61.304 339.287 61.5225 338.471 61.1543 337.833C60.7861 337.196 59.9706 336.977 59.3329 337.345C58.6952 337.714 58.4767 338.529 58.8449 339.167ZM215.77 2.09964C220.851 13.851 226.902 27.5755 231.007 42.1068C235.112 56.6374 237.264 71.9563 234.561 86.8921C229.16 116.729 204.347 145.164 136.553 162.681L136.678 163.165C204.562 145.625 229.602 117.094 235.053 86.9812C237.775 71.9424 235.604 56.5409 231.488 41.9709C227.373 27.4015 221.307 13.6453 216.229 1.90121L215.77 2.09964ZM136.553 162.681C102.626 171.447 74.0473 180.932 51.9673 191.703C29.8922 202.471 14.2827 214.538 6.33627 228.483C-1.62077 242.448 -1.8735 258.258 6.68087 276.445C15.2293 294.62 32.5763 315.18 59.8363 338.689L60.1628 338.311C32.9234 314.819 15.6378 294.314 7.13331 276.233C-1.36526 258.164 -1.0913 242.529 6.7707 228.731C14.6433 214.915 30.1452 202.904 52.1865 192.152C74.223 181.403 102.765 171.927 136.678 163.165L136.553 162.681Z"
                  fill="#3F5540"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 981 440"
                className={`${css.svg} ${css.line3}`}
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M975.416 2.80078C975.416 4.27354 976.61 5.46745 978.083 5.46745C979.556 5.46745 980.75 4.27354 980.75 2.80078C980.75 1.32802 979.556 0.134115 978.083 0.134115C976.61 0.134115 975.416 1.32802 975.416 2.80078ZM0.27181 436.699C0.27181 438.172 1.46572 439.366 2.93848 439.366C4.41124 439.366 5.60514 438.172 5.60514 436.699C5.60514 435.227 4.41124 434.033 2.93848 434.033C1.46572 434.033 0.27181 435.227 0.27181 436.699ZM977.588 2.73202C968.916 65.1878 958.506 149.167 900.797 206.088C843.128 262.971 738.062 292.961 539.726 246.976L539.5 247.95C737.965 293.965 843.467 264.041 901.499 206.8C959.492 149.599 969.917 65.2471 978.578 2.86955L977.588 2.73202ZM539.726 246.976C341.306 200.971 222.339 204.547 145.281 241.586C68.1913 278.641 33.1671 349.128 2.46673 436.534L3.41022 436.865C34.1008 349.487 69.0141 279.355 145.714 242.488C222.446 205.605 341.121 201.955 539.5 247.95L539.726 246.976Z"
                  fill="#3F5540"
                />
              </svg>
            )}
          </div>
        </div>

        <div className={css.textContainer2}>
          <Image
            src={illustration2}
            alt=""
            width={506}
            height={498}
            className={css.illustration2}
            ref={illustration2Ref}
          />
          <div ref={box7Ref}>
            <h2 className={`${css.title1} ${css.add1}`}
              dangerouslySetInnerHTML={{ __html: main[3].title[locale as keyof typeof main[3]["title"]] }} />
            <div className={css.text1}>
              <MarkdownPreview markdown={main[3].description[locale as keyof typeof main[3]["description"]]} />
            </div>
          </div>
        </div>
        <div className={css.imgBox4}>
          <Image
            src={main[3].photos[1]}
            alt=""
            width={453}
            height={469}
            className={css.grandpa3}
            ref={grandpa3Animation}
          />
          <Image
            src={main[3].photos[0]}
            alt=""
            width={668}
            height={668}
            className={css.photo7}
            ref={photo7Animation}
          />
          <Image
            src={main[3].photos[2]}
            alt=""
            width={550}
            height={352}
            className={css.photo8}
            ref={photo8Animation}
          />
          <div className={css.line4Box} ref={line4Animation}>
            {isMobile ? (
              <svg
                viewBox="0 0 237 375"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${css.svg} ${css.line4}`}
                preserveAspectRatio="none"
              >
                <path
                  d="M21.666 2C21.666 2.73638 22.2629 3.33333 22.9993 3.33333C23.7357 3.33333 24.3327 2.73638 24.3327 2C24.3327 1.26362 23.7357 0.666667 22.9993 0.666667C22.2629 0.666667 21.666 1.26362 21.666 2ZM137 117L136.934 117.241L137 117ZM220.5 273L220.312 272.835L220.307 272.841L220.303 272.846L220.5 273ZM45.6667 373.5C45.6667 374.236 46.2636 374.833 47 374.833C47.7364 374.833 48.3333 374.236 48.3333 373.5C48.3333 372.764 47.7364 372.167 47 372.167C46.2636 372.167 45.6667 372.764 45.6667 373.5ZM22.8407 1.80678C10.9498 11.5699 3.3604 21.3002 0.891256 31.0178C-1.5832 40.7563 1.09594 50.4335 9.62855 60.0443C18.1528 69.6457 32.5285 79.1947 53.4861 88.7157C74.4476 98.2385 102.013 107.741 136.934 117.241L137.066 116.759C102.158 107.263 74.6213 97.7682 53.6929 88.2605C32.7606 78.751 18.4586 69.2371 10.0025 59.7123C1.55467 50.1971 -1.04923 40.6851 1.37586 31.1409C3.80624 21.5759 11.299 11.9301 23.158 2.19322L22.8407 1.80678ZM136.934 117.241C202.113 134.972 227.278 168.911 234.005 200.864C237.371 216.852 236.125 232.36 232.945 245.119C229.763 257.885 224.652 267.875 220.312 272.835L220.688 273.165C225.098 268.125 230.237 258.053 233.43 245.24C236.625 232.421 237.879 216.836 234.495 200.761C227.722 168.589 202.387 134.528 137.066 116.759L136.934 117.241ZM220.303 272.846C209.816 286.302 184.978 308.677 153.501 329.055C122.025 349.433 83.9396 367.795 46.9635 373.253L47.0365 373.747C84.1121 368.275 122.267 349.872 153.772 329.475C185.276 309.079 210.163 286.669 220.697 273.154L220.303 272.846Z"
                  fill="#3F5540"
                />
              </svg>
            ) : (
              <svg
                className={`${css.svg} ${css.line4}`}
                viewBox="0 0 804 726"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.80013 3.5C0.80013 4.97276 1.99404 6.16667 3.4668 6.16667C4.93956 6.16667 6.13346 4.97276 6.13346 3.5C6.13346 2.02724 4.93956 0.833333 3.4668 0.833333C1.99404 0.833333 0.80013 2.02724 0.80013 3.5ZM685.467 501L685.861 501.307L685.866 501.301L685.467 501ZM318.8 722.5C318.8 723.973 319.994 725.167 321.467 725.167C322.94 725.167 324.133 723.973 324.133 722.5C324.133 721.027 322.94 719.833 321.467 719.833C319.994 719.833 318.8 721.027 318.8 722.5ZM3.09873 3.83842C58.403 63.9881 252.815 172.911 588.532 128.496L588.401 127.504C252.918 171.889 58.8639 63.0119 3.83486 3.16158L3.09873 3.83842ZM588.532 128.496C672.393 117.401 726.976 126.253 760.048 147.883C793.076 169.484 804.755 203.904 802.63 244.261C800.504 284.636 784.559 330.889 762.407 375.997C740.259 421.096 711.927 465.011 685.067 500.699L685.866 501.301C712.756 465.572 741.124 421.604 763.305 376.438C785.481 331.279 801.492 284.885 803.629 244.314C805.766 203.725 794.013 168.902 760.595 147.046C727.22 125.218 672.34 116.399 588.401 127.504L588.532 128.496ZM685.072 500.693C660.52 532.236 612.856 581.177 549.692 625.428C486.529 669.679 407.893 709.22 321.394 722.005L321.54 722.995C408.241 710.18 487.022 670.554 550.266 626.247C613.511 581.94 661.247 532.93 685.861 501.307L685.072 500.693Z"
                  fill="#3F5540"
                />
              </svg>
            )}
          </div>
        </div>
      </section>
      <WelcomeBlock text={main[4].title[locale as keyof typeof main[4]["title"]]} />
    </>
  );
};

export default Hero;
