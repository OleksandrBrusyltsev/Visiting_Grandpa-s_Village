"use client";

import css from "./Hero.module.scss";
import Image from "next/image";
import BookingComponent from "../BookingComponent/BookingComponent";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

const grandpa1 = "https://i.ibb.co/6W6b8zB/grandpa1.png";
const grandpa2 = "/images/Hero/grandpa2.png";
const grandpa3 = "/images/Hero/grandpa3.png";

const photo1 = "/images/Hero/photo1.png";
const photo2 = "/images/Hero/photo2.png";
const photo3 = "/images/Hero/photo3.png";
const photo4 = "/images/Hero/photo4.png";
const photo5 = "/images/Hero/photo5.png";
const photo6 = "/images/Hero/photo6.png";
const photo7 = "/images/Hero/photo7.png";
const photo8 = "/images/Hero/photo8.png";

const illustration1 = "/images/Hero/illustration1.png";
const illustration2 = "/images/Hero/illustration2.png";
const illustration3 = "/images/Hero/illustration3.png";

const Hero = () => {
  const box1Ref = useRef<HTMLDivElement>(null);
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

  const box6Ref = useRef<HTMLDivElement>(null);
  const box7Ref = useRef<HTMLDivElement>(null);
  const photo7Animation = useRef<HTMLImageElement>(null);
  const photo8Animation = useRef<HTMLImageElement>(null);
  const grandpa3Animation = useRef<HTMLImageElement>(null);
  const grandpa1Ref = useRef<HTMLImageElement>(null);

  let mm = gsap.matchMedia();

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    mm.add("(min-width: 768px)", () => {
      // desktop setup code here...
      gsap.fromTo(
        box1Ref.current,
        { x: -767, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, clearProps: "transform" }
      );
      gsap.fromTo(
        photo1Animation.current,
        { x: 767, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, clearProps: "transform" }
      );
      gsap.fromTo(
        illustration1Animation.current,
        { x: -767, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, clearProps: "transform" }
      );

      gsap.fromTo(
        box2Ref.current,
        {
          x: 767,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: box2Ref.current,
          },
          x: 0,
          opacity: 1,
          duration: 1,
          clearProps: "transform",
        }
      );
      gsap.from(box3Ref.current, {
        scrollTrigger: box3Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(grandpaRef.current, {
        scrollTrigger: grandpaRef.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(line1Ref.current, {
        // scrollTrigger: line1Ref.current,
        y: 3000,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo4Animation.current, {
        scrollTrigger: photo4Animation.current,
        x: -767,
        opacity: 0,

        duration: 1,
        clearProps: "transform",
      });

      gsap.from(calendarRef.current, {
        scrollTrigger: calendarRef.current,
        x: 767,
        opacity: 0,

        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo3Animation.current, {
        scrollTrigger: photo3Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo2Animation.current, {
        scrollTrigger: photo2Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo5Ref.current, {
        scrollTrigger: photo5Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(line2Animation.current, {
        scrollTrigger: line2Animation.current,
        y: -1000,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(box4Ref.current, {
        scrollTrigger: box4Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo6Ref.current, {
        scrollTrigger: photo6Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(illustration3Ref.current, {
        scrollTrigger: illustration3Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(illustration2Ref.current, {
        scrollTrigger: illustration2Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(box6Ref.current, {
        scrollTrigger: box6Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box7Ref.current, {
        scrollTrigger: box7Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo7Animation.current, {
        scrollTrigger: photo7Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo8Animation.current, {
        scrollTrigger: photo8Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(grandpa3Animation.current, {
        scrollTrigger: grandpa3Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(line4Animation.current, {
        scrollTrigger: line4Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(grandpa1Ref.current, {
        scrollTrigger: grandpa1Ref.current,
        y: -3000,
        opacity: 0,
        clearProps: "transform",
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        box1Ref.current,
        { x: -767, opacity: 0 },
        { x: 0, opacity: 1, clearProps: "transform" }
      );
      gsap.fromTo(
        photo1Animation.current,
        { x: -767, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, clearProps: "transform" }
      );
      gsap.fromTo(
        illustration1Animation.current,
        { x: -767, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, clearProps: "transform" }
      );

      gsap.fromTo(
        box2Ref.current,
        {
          x: -767,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: box2Ref.current,
          },
          x: 0,
          opacity: 0,
          duration: 1,
          clearProps: "transform",
        }
      );
      gsap.from(box3Ref.current, {
        scrollTrigger: box3Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo4Animation.current, {
        scrollTrigger: photo4Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo3Animation.current, {
        scrollTrigger: photo3Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo2Animation.current, {
        scrollTrigger: photo2Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(line2Animation.current, {
        scrollTrigger: line2Animation.current,
        y: 3000,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(box4Ref.current, {
        scrollTrigger: box4Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      // gsap.from(box5Ref.current, {
      //   scrollTrigger: box5Ref.current,
      //   x: -767,
      //   opacity: 0,
      //   duration: 1,
      //   clearProps: "transform",
      // });

      gsap.from(illustration3Ref.current, {
        scrollTrigger: illustration3Ref.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo5Ref.current, {
        scrollTrigger: photo5Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo6Ref.current, {
        scrollTrigger: photo6Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(box6Ref.current, {
        scrollTrigger: box6Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box7Ref.current, {
        scrollTrigger: box7Ref.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo7Animation.current, {
        scrollTrigger: photo7Animation.current,
        x: 767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo8Animation.current, {
        scrollTrigger: photo8Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(grandpa3Animation.current, {
        scrollTrigger: grandpa3Animation.current,
        x: -767,
        opacity: 0,
        duration: 1,
        clearProps: "transform",
      });
    });
  }, {});

  return (
    <section className={css.section}>
      <div className={css.box1Ref} ref={box1Ref}>
        <div className={css.grandbox1}>
          <h1 className={`${css.mainTitle} ${css.textBox1}`}>
            Привіт, мій майбутній відвідувач
          </h1>

          <Image
            src={grandpa1}
            alt={"GrandPa"}
            width={334}
            height={334}
            className={css.grandpa1}
            ref={grandpa1Ref}
          />
        </div>
        <p className={`${css.text1} ${css.textBox1}`}>
          Я - твій <span className={css.bold}>френдлі Дідусь.</span> Сьогодні
          покажу тобі мою затишну домівку, проведу сторінками казкового місця
          сили, тиші та спокою. Я створив цю садибу для тебе, щоб в потрібний
          момент ти міг зупинити думки,насолодитись природою, прислухатись до
          себе та створити нові приємні спогади.
        </p>
        <p className={`${css.text2} ${css.textBox1}`}>
          “Слідуй за мною та відчуй історію творіння мого життя.”
        </p>
      </div>
      <div className={css.imgBox}>
        <Image
          src={photo1}
          alt={"photo"}
          width={544}
          height={492}
          className={css.photo1}
          ref={photo1Animation}
        />

        <Image
          src={illustration1}
          alt={"illustration"}
          width={410}
          height={372}
          className={css.illustration1}
          ref={illustration1Animation}
        />
        <div className={css.line1Box} ref={line1Ref}>
          <svg
            className={`${css.svg} ${css.line1}`}
            width="201"
            height="246"
            viewBox="0 0 201 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.565852 243C0.565852 244.473 1.75976 245.667 3.23252 245.667C4.70528 245.667 5.89919 244.473 5.89919 243C5.89919 241.527 4.70528 240.333 3.23252 240.333C1.75976 240.333 0.565852 241.527 0.565852 243ZM96.6382 107.467L96.5814 106.97L96.6382 107.467ZM187.717 3C187.717 4.47276 188.911 5.66667 190.384 5.66667C191.857 5.66667 193.05 4.47276 193.05 3C193.05 1.52724 191.857 0.333333 190.384 0.333333C188.911 0.333333 187.717 1.52724 187.717 3ZM3.72807 242.933C1.00947 222.684 2.02618 191.46 14.8395 164.045C27.6376 136.662 52.2105 113.055 96.6951 107.963L96.5814 106.97C51.7234 112.104 26.8663 135.951 13.9336 163.621C1.01613 191.26 0.00123632 222.69 2.73697 243.067L3.72807 242.933ZM96.6951 107.963C138.484 103.18 169.399 92.1539 186.185 74.6548C194.591 65.8919 199.449 55.5106 200.348 43.5085C201.246 31.5162 198.189 17.9419 190.834 2.78175L189.934 3.21825C197.237 18.2715 200.231 31.6673 199.35 43.4339C198.47 55.1907 193.719 65.3571 185.464 73.9625C168.928 91.2003 138.311 102.194 96.5814 106.97L96.6951 107.963Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>
      <div className={css.calendarBox} ref={calendarRef}>
        <BookingComponent />
      </div>

      <div className={`${css.grandbox2} `} ref={box2Ref}>
        <div className={`${css.imgMask}`}>
          <Image
            src={grandpa2}
            alt={"grandpa2"}
            width={327}
            height={324}
            className={`${css.grandpa2}`}
            ref={grandpaRef}
          />
        </div>
        <h2 className={`${css.title1} ${css.textContainer} ${css.marg}`}>
          Затишне місце сили{" "}
        </h2>
      </div>
      <div className={`${css.textContainer}`} ref={box3Ref}>
        <p className={css.text1}>
          Радий вітати тебе, перший крок до знайомства з моєю садибою зроблено.
          Доторкнись до найтепліших спогадів мого життя, які сплекали{" "}
          <span className={css.bold}>найкраще місце на Землі</span> еко-садибу
          “На селі у Дідуся”.
        </p>
        <p className={css.text1}>
          {" "}
          Мені завжди подобалась природа, я відчуваю її силу та велич. Твоєму
          Дідусю пощастило народитись серед неймовірної краси: зелені хвойні
          ліса, надзвичайне{" "}
          <span className={css.bold}>блакитне озеро - справжня казка,</span> від
          якої захоплює подих і дивує відвідувачів унікальним кольором води.
        </p>
        <p className={css.text2}>
          &#34; Кожен гість - мій привід посміхнутися.&#34;
        </p>
      </div>
      <div className={css.imgBox2}>
        <Image
          src={photo4}
          alt={"photo4"}
          width={556}
          height={354}
          className={`${css.photo4}`}
          ref={photo4Animation}
        />

        <Image
          src={photo2}
          alt={"photo2"}
          width={748}
          height={410}
          className={`${css.photo2}`}
          ref={photo2Animation}
        />

        <Image
          src={photo3}
          alt={"photo3"}
          width={606}
          height={526}
          className={`${css.photo3}`}
          ref={photo3Animation}
        />

        <div className={css.line2Box} ref={line2Animation}>
          <svg
            className={`${css.svg} ${css.line2}`}
            width="920"
            height="920"
            viewBox="0 0 920 920"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM382.885 503.037L382.965 503.531L382.984 503.528L383.003 503.523L382.885 503.037ZM914.333 917C914.333 918.473 915.527 919.667 917 919.667C918.473 919.667 919.667 918.473 919.667 917C919.667 915.527 918.473 914.333 917 914.333C915.527 914.333 914.333 915.527 914.333 917ZM2.50023 3.01517C5.17382 91.1123 12.308 230.501 62.7407 340.73C87.9618 395.854 124.026 443.718 175.805 474.219C227.59 504.724 295.038 517.829 382.965 503.531L382.804 502.544C295.061 516.812 227.858 503.721 176.312 473.358C124.76 442.991 88.8144 395.314 63.6501 340.314C13.3122 230.293 6.17381 91.097 3.49977 2.98483L2.50023 3.01517ZM383.003 503.523C510.223 472.502 626.615 491.836 719.682 560.914C812.758 629.999 882.569 748.888 916.51 917.099L917.49 916.901C883.516 748.529 813.61 629.386 720.278 560.111C626.936 490.828 510.228 471.472 382.766 502.552L383.003 503.523Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>

      <div className={css.textContainer1} ref={box4Ref}>
        <h2 className={`${css.title1} ${css.add}`}>Доторкнись до природи</h2>

        <p className={css.text1}>
          Я вирішив ділитись насолодою та емоціями від краси мого краю з іншими.
          Так була створена еко-садиба у селі Олешня. Мій неповторний рідний
          край став натхнення для народження{" "}
          <span className={css.bold}>прекрасного місця сили,</span> затишку та
          відновлення.
        </p>
        <p className={css.text1}>
          Зараз маю аж{" "}
          <span className={css.bold}>8 комфортних та затишних будиночків,</span>{" "}
          щоб приймати гостей. Я створив всі умови, щоб мої відвідувачі почували
          себе щасливими. Я обожнюю бачити посмішки та радість, які можу
          дарувати завдяки казковому місцю, моїй садибі.
        </p>
      </div>

      <div className={css.imgBox3}>
        <Image
          src={illustration3}
          alt={"illustration3"}
          width={488}
          height={458}
          className={css.illustration3}
          ref={illustration3Ref}
        />
        <Image
          src={photo6}
          alt={"photo6"}
          width={499}
          height={430}
          className={css.photo5}
          ref={photo6Ref}
        />

        <Image
          src={photo5}
          alt={"photo5"}
          width={660}
          height={496}
          className={css.photo6}
          ref={photo5Ref}
        />
        <Image
          src={illustration2}
          alt={"illustration2"}
          width={506}
          height={498}
          className={css.illustration2}
          ref={illustration2Ref}
        />

        <div className={css.line3Box}>
          <svg
            className={`${css.svg} ${css.line3}`}
            width="865"
            height="644"
            viewBox="0 0 865 644"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M856.918 3.58505C857.241 5.02184 858.668 5.92434 860.105 5.60083C861.542 5.27732 862.445 3.85032 862.121 2.41353C861.798 0.976736 860.371 0.0742417 858.934 0.397752C857.497 0.721262 856.594 2.14826 856.918 3.58505ZM0.899883 641.086C1.22339 642.523 2.65039 643.425 4.08718 643.102C5.52397 642.778 6.42646 641.351 6.10296 639.915C5.77945 638.478 4.35245 637.575 2.91566 637.899C1.47887 638.222 0.57638 639.649 0.899883 641.086ZM859.021 3.04099C864.28 65.8763 872.571 150.091 828.775 218.299C785.009 286.459 689.097 338.796 485.504 337.5L485.498 338.5C689.223 339.796 785.575 287.429 829.617 218.839C873.628 150.296 865.27 65.7142 860.018 2.95759L859.021 3.04099ZM485.504 337.5C281.825 336.204 166.549 365.825 99.509 418.886C32.4415 471.969 13.7558 548.427 3.0048 640.442L3.99805 640.558C14.7456 548.573 33.4011 472.485 100.13 419.67C166.886 366.833 281.86 337.204 485.498 338.5L485.504 337.5Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>

      <div className={css.textContainer2} ref={box7Ref}>
        <h2 className={`${css.title1} ${css.add1}`}>Тут час збирає спогади</h2>

        <p className={css.text1}>
          Я знаю, що сучасний світ насичений стресом та проблемами. Але «На селі
          у Дідуся» не існує цих слів. Природа, свіже повітря, величний ліс та
          кристально чисте блакитне озеро змусять тебе
          <span className={css.bold}> поринути в спокій,</span> зупинити думки
          та забути про все на світі. <br />
        </p>
        <p className={css.text1}>
          Разом ми зможемоь
          <span className={css.bold}> створити щасливі спогади </span>
          неповторних моментів, які дарують внутрішню насолоду, щастя та
          відчуття цінності кожної хвилинки тут.
        </p>
      </div>
      <div className={css.imgBox4}>
        v
        <Image
          src={grandpa3}
          alt={"grandpa3"}
          width={453}
          height={364}
          className={css.grandpa3}
          ref={grandpa3Animation}
        />
        <Image
          src={photo7}
          alt={"photo7"}
          width={668}
          height={668}
          className={css.photo7}
          ref={photo7Animation}
        />
        <Image
          src={photo8}
          alt={"photo8"}
          width={550}
          height={352}
          className={css.photo8}
          ref={photo8Animation}
        />
        <div className={css.line4Box} ref={line4Animation}>
          <svg
            className={`${css.svg} ${css.line4}`}
            width="804"
            height="726"
            viewBox="0 0 804 726"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.80013 3.5C0.80013 4.97276 1.99404 6.16667 3.4668 6.16667C4.93956 6.16667 6.13346 4.97276 6.13346 3.5C6.13346 2.02724 4.93956 0.833333 3.4668 0.833333C1.99404 0.833333 0.80013 2.02724 0.80013 3.5ZM685.467 501L685.861 501.307L685.866 501.301L685.467 501ZM318.8 722.5C318.8 723.973 319.994 725.167 321.467 725.167C322.94 725.167 324.133 723.973 324.133 722.5C324.133 721.027 322.94 719.833 321.467 719.833C319.994 719.833 318.8 721.027 318.8 722.5ZM3.09873 3.83842C58.403 63.9881 252.815 172.911 588.532 128.496L588.401 127.504C252.918 171.889 58.8639 63.0119 3.83486 3.16158L3.09873 3.83842ZM588.532 128.496C672.393 117.401 726.976 126.253 760.048 147.883C793.076 169.484 804.755 203.904 802.63 244.261C800.504 284.636 784.559 330.889 762.407 375.997C740.259 421.096 711.927 465.011 685.067 500.699L685.866 501.301C712.756 465.572 741.124 421.604 763.305 376.438C785.481 331.279 801.492 284.885 803.629 244.314C805.766 203.725 794.013 168.902 760.595 147.046C727.22 125.218 672.34 116.399 588.401 127.504L588.532 128.496ZM685.072 500.693C660.52 532.236 612.856 581.177 549.692 625.428C486.529 669.679 407.893 709.22 321.394 722.005L321.54 722.995C408.241 710.18 487.022 670.554 550.266 626.247C613.511 581.94 661.247 532.93 685.861 501.307L685.072 500.693Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
