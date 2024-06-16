"use client";

import css from "./Hero.module.scss";
import Image from "next/image";
import BookingComponent from "../BookingComponent/BookingComponent";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const grandpa1 = "/images/Hero/grandpa1.png";
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
  const photo1Animation = useRef<HTMLDivElement>(null);
  const illustration1Animation = useRef<HTMLDivElement>(null);

  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const photo4Animation = useRef<HTMLDivElement>(null);
  const photo3Animation = useRef<HTMLDivElement>(null);
  const photo2Animation = useRef<HTMLDivElement>(null);
  const line2Animation = useRef<HTMLDivElement>(null);

  const box4Ref = useRef<HTMLDivElement>(null);
  const box5Ref = useRef<HTMLDivElement>(null);
  const box6Ref = useRef<HTMLDivElement>(null);
  const box7Ref = useRef<HTMLDivElement>(null);
  const photo7Animation = useRef<HTMLDivElement>(null);
  const photo8Animation = useRef<HTMLDivElement>(null);
  const grandpa3Animation = useRef<HTMLDivElement>(null);

  let mm = gsap.matchMedia();

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    mm.add("(min-width: 768px)", () => {
      // desktop setup code here...
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        box1Ref.current,
        { x: -767 },
        { x: 0, clearProps: "transform" }
      );
      gsap.fromTo(
        photo1Animation.current,
        { x: -767 },
        { x: 0, duration: 1, clearProps: "transform" }
      );
      gsap.fromTo(
        illustration1Animation.current,
        { x: 767 },
        { x: 0, duration: 1, clearProps: "transform" }
      );

      gsap.from(box2Ref.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box3Ref.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo4Animation.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo3Animation.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo2Animation.current, {
        x: 767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(line2Animation.current, {
        y: 3000,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(box4Ref.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box5Ref.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box6Ref.current, {
        x: 767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(box7Ref.current, {
        x: 767,
        duration: 1,
        clearProps: "transform",
      });

      gsap.from(photo7Animation.current, {
        x: 767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(photo8Animation.current, {
        x: -767,
        duration: 1,
        clearProps: "transform",
      });
      gsap.from(grandpa3Animation.current, {
        x: -767,
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
        <div ref={photo1Animation}>
          <Image
            src={photo1}
            alt={"photo"}
            width={544}
            height={492}
            className={css.photo1}
          />
        </div>

        <div ref={illustration1Animation}>
          <Image
            src={illustration1}
            alt={"illustration"}
            width={410}
            height={372}
            className={css.illustration1}
          />
          <div className={css.line1Box}>
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
      </div>
      <div className={css.calendarBox}>
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
        <p className={css.text2}>&#34; Кожен гість - мій привід посміхнутися.&#34;</p>
      </div>
      <div className={css.imgBox2}>
        <div ref={photo4Animation}>
          <Image
            src={photo4}
            alt={"photo4"}
            width={556}
            height={354}
            className={`${css.photo4}`}
          />
        </div>
        <div ref={photo2Animation}>
          <Image
            src={photo2}
            alt={"photo2"}
            width={748}
            height={410}
            className={`${css.photo2}`}
          />
        </div>
        <div ref={photo3Animation}>
          <Image
            src={photo3}
            alt={"photo3"}
            width={606}
            height={526}
            className={`${css.photo3}`}
          />
        </div>
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
        <div ref={box5Ref}>
          <Image
            src={illustration3}
            alt={"illustration3"}
            width={488}
            height={458}
            className={css.illustration3}
          />
          <Image
            src={photo6}
            alt={"photo6"}
            width={499}
            height={430}
            className={css.photo5}
          />
        </div>
        <div ref={box6Ref}>
          <Image
            src={photo5}
            alt={"photo5"}
            width={660}
            height={496}
            className={css.photo6}
          />
          <Image
            src={illustration2}
            alt={"illustration2"}
            width={506}
            height={498}
            className={css.illustration2}
          />
        </div>
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
        <div ref={grandpa3Animation}>
          <Image
            src={grandpa3}
            alt={"grandpa3"}
            width={453}
            height={364}
            className={css.grandpa3}
          />
        </div>
        <div ref={photo7Animation}>
          <Image
            src={photo7}
            alt={"photo7"}
            width={668}
            height={668}
            className={css.photo7}
          />
        </div>
        <div ref={photo8Animation}>
          <Image
            src={photo8}
            alt={"photo8"}
            width={550}
            height={352}
            className={css.photo8}
          />
        </div>
        <div className={css.line4Box}>
          {/* <svg
            className={css.svg}
            width="235"
            height="371"
            viewBox="0 0 237 375"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.666 2C21.666 2.73638 22.2629 3.33333 22.9993 3.33333C23.7357 3.33333 24.3327 2.73638 24.3327 2C24.3327 1.26362 23.7357 0.666667 22.9993 0.666667C22.2629 0.666667 21.666 1.26362 21.666 2ZM137 117L136.934 117.241L137 117ZM220.5 273L220.312 272.835L220.307 272.841L220.303 272.846L220.5 273ZM45.6667 373.5C45.6667 374.236 46.2636 374.833 47 374.833C47.7364 374.833 48.3333 374.236 48.3333 373.5C48.3333 372.764 47.7364 372.167 47 372.167C46.2636 372.167 45.6667 372.764 45.6667 373.5ZM22.8407 1.80678C10.9498 11.5699 3.3604 21.3002 0.891256 31.0178C-1.5832 40.7563 1.09594 50.4335 9.62855 60.0443C18.1528 69.6457 32.5285 79.1947 53.4861 88.7157C74.4476 98.2385 102.013 107.741 136.934 117.241L137.066 116.759C102.158 107.263 74.6213 97.7682 53.6929 88.2605C32.7606 78.751 18.4586 69.2371 10.0025 59.7123C1.55467 50.1971 -1.04923 40.6851 1.37586 31.1409C3.80624 21.5759 11.299 11.9301 23.158 2.19322L22.8407 1.80678ZM136.934 117.241C202.113 134.972 227.278 168.911 234.005 200.864C237.371 216.852 236.125 232.36 232.945 245.119C229.763 257.885 224.652 267.875 220.312 272.835L220.688 273.165C225.098 268.125 230.237 258.053 233.43 245.24C236.625 232.421 237.879 216.836 234.495 200.761C227.722 168.589 202.387 134.528 137.066 116.759L136.934 117.241ZM220.303 272.846C209.816 286.302 184.978 308.677 153.501 329.055C122.025 349.433 83.9396 367.795 46.9635 373.253L47.0365 373.747C84.1121 368.275 122.267 349.872 153.772 329.475C185.276 309.079 210.163 286.669 220.697 273.154L220.303 272.846Z"
              fill="#3F5540"
            />
          </svg> */}

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
