import css from "./Hero.module.scss";
import Image from "next/image";

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
  return (
    <section className={css.section}>
      <div className={css.grandbox1}>
        <h1 className={`${css.mainTitle} ${css.textBox1}`}>
          Привіт, мій майбутній відвідувач
        </h1>

        <Image
          src={grandpa1}
          alt={"GrandPa"}
          width={99}
          height={99}
          className={css.grandpa1}
        />
      </div>
      <p className={`${css.text1} ${css.textBox1}`}>
        Я - твій <span className={css.bold}>френдлі Дідусь.</span> Сьогодні
        покажу тобі мою затишну домівку, проведу сторінками казкового місця
        сили, тиші та спокою. Я створив цю садибу для тебе, щоб в потрібний
        момент ти міг зупинити думки,насолодитись природою, прислухатись до себе
        та створити нові приємні спогади.
      </p>
      <p className={`${css.text2} ${css.textBox1}`}>
        “Слідуй за мною та відчуй історію творіння мого життя.”
      </p>
      <div className={css.imgBox}>
        <Image
          src={photo1}
          alt={"photo"}
          width={192}
          height={177}
          className={css.photo1}
        />
        <Image
          src={illustration1}
          alt={"illustration"}
          width={205}
          height={193}
          className={css.illustration1}
        />
        <div className={css.line1Box}>
          <svg
            className={`${css.svg} ${css.line1}`}
            width="192"
            height="265"
            viewBox="0 0 195 269"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.431764 267C0.431764 267.736 1.02872 268.333 1.7651 268.333C2.50148 268.333 3.09843 267.736 3.09843 267C3.09843 266.264 2.50148 265.667 1.7651 265.667C1.02872 265.667 0.431764 266.264 0.431764 267ZM99.4135 128.901L99.3839 128.653L99.4135 128.901ZM191.667 2C191.667 2.73638 192.264 3.33333 193 3.33333C193.736 3.33333 194.333 2.73638 194.333 2C194.333 1.26362 193.736 0.666667 193 0.666667C192.264 0.666667 191.667 1.26362 191.667 2ZM2.01321 266.969C0.893455 257.898 -0.672243 226.525 11.0104 195.88C22.6861 165.253 47.5908 135.35 99.4432 129.15L99.3839 128.653C47.3147 134.88 22.2727 164.933 10.5432 195.702C-1.17917 226.451 0.391685 257.914 1.51698 267.031L2.01321 266.969ZM99.4432 129.15C138.517 124.477 161.99 108.814 175.681 86.2251C189.361 63.6535 193.25 34.2033 193.25 2H192.75C192.75 34.1805 188.86 63.5155 175.253 85.9659C161.658 108.399 138.337 123.995 99.3839 128.653L99.4432 129.15Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>

      <div className={css.grandbox2}>
        <Image
          src={grandpa2}
          alt={"grandpa2"}
          width={93}
          height={103}
          className={css.grandpa2}
        />
        <h2 className={css.title1}>Затишне місце сили </h2>
      </div>
      <p className={css.text1}>
        Радий вітати тебе, перший крок до знайомства з моєю садибою зроблено.
        Доторкнись до найтепліших спогадів мого життя, які сплекали{" "}
        <span className={css.bold}>найкраще місце на Землі</span> еко-садибу “На
        селі у Дідуся”.
      </p>
      <p className={css.text1}>
        {" "}
        Мені завжди подобалась природа, я відчуваю її силу та велич. Твоєму
        Дідусю пощастило народитись серед неймовірної краси: зелені хвойні ліса,
        надзвичайне{" "}
        <span className={css.bold}>блакитне озеро - справжня казка,</span> від
        якої захоплює подих і дивує відвідувачів унікальним кольором води.
      </p>
      <p className={css.text2}>"Кожен гість - мій привід посміхнутися."</p>

      <div className={css.imgBox2}>
        <Image
          src={photo4}
          alt={"photo4"}
          width={170}
          height={110}
          className={css.photo4}
        />

        <Image
          src={photo2}
          alt={"photo2"}
          width={215}
          height={118}
          className={css.photo2}
        />

        <Image
          src={photo3}
          alt={"photo3"}
          width={212}
          height={166}
          className={css.photo3}
        />
        <div className={css.line2Box}>
          <svg
            className={`${css.svg} ${css.line2}`}
            width="262"
            height="267"
            viewBox="0 0 265 271"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.6664 1.5C27.6664 2.23638 28.2634 2.83333 28.9997 2.83333C29.7361 2.83333 30.3331 2.23638 30.3331 1.5C30.3331 0.76362 29.7361 0.166667 28.9997 0.166667C28.2634 0.166667 27.6664 0.76362 27.6664 1.5ZM107 156.5L107.047 156.745L107.058 156.743L107.069 156.74L107 156.5ZM261.666 269C261.666 269.736 262.263 270.333 262.999 270.333C263.736 270.333 264.333 269.736 264.333 269C264.333 268.264 263.736 267.667 262.999 267.667C262.263 267.667 261.666 268.264 261.666 269ZM28.8345 1.31238C-4.77145 30.905 -5.82887 73.7417 11.8051 107.172C29.4363 140.597 65.7838 164.678 107.047 156.745L106.952 156.255C65.9542 164.136 29.8011 140.217 12.2473 106.939C-5.30377 73.6655 -4.23054 31.095 29.165 1.68762L28.8345 1.31238ZM107.069 156.74C166.555 139.592 246.876 176.02 262.753 269.042L263.246 268.958C247.319 175.644 166.704 139.029 106.93 156.26L107.069 156.74Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>

      <h2 className={`${css.title1} ${css.add}`}>Доторкнись до природи</h2>

      <p className={css.text1}>
        Я вирішив ділитись насолодою та емоціями від краси мого краю з іншими.
        Так була створена еко-садиба у селі Олешня. Мій неповторний рідний край
        став натхнення для народження{" "}
        <span className={css.bold}>прекрасного місця сили,</span> затишку та
        відновлення.
      </p>
      <p className={css.text1}>
        Зараз маю аж{" "}
        <span className={css.bold}>8 комфортних та затишних будиночків,</span>{" "}
        щоб приймати гостей. Я створив всі умови, щоб мої відвідувачі почували
        себе щасливими. Я обожнюю бачити посмішки та радість, які можу дарувати
        завдяки казковому місцю, моїй садибі.
      </p>
      <div className={css.imgBox3}>
        <Image
          src={illustration3}
          alt={"illustration3"}
          width={188}
          height={180}
          className={css.illustration3}
        />
        <Image
          src={photo6}
          alt={"photo7"}
          width={156}
          height={157}
          className={css.photo5}
        />
        <Image
          src={photo5}
          alt={"photo5"}
          width={193}
          height={144}
          className={css.photo6}
        />
        <Image
          src={illustration2}
          alt={"illustration2"}
          width={194}
          height={192}
          className={css.illustration2}
        />
        <div className={css.line3Box}>
          <svg
            className={`${css.svg} ${css.line3}`}
            width="237"
            height="340"
            viewBox="0 0 237 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M214.845 2.6671C215.213 3.30482 216.028 3.52332 216.666 3.15513C217.304 2.78693 217.522 1.97148 217.154 1.33376C216.786 0.696032 215.971 0.477532 215.333 0.845727C214.695 1.21392 214.477 2.02938 214.845 2.6671ZM58.8449 339.167C59.2131 339.804 60.0285 340.023 60.6662 339.655C61.304 339.287 61.5225 338.471 61.1543 337.833C60.7861 337.196 59.9706 336.977 59.3329 337.345C58.6952 337.714 58.4767 338.529 58.8449 339.167ZM215.77 2.09964C220.851 13.851 226.902 27.5755 231.007 42.1068C235.112 56.6374 237.264 71.9563 234.561 86.8921C229.16 116.729 204.347 145.164 136.553 162.681L136.678 163.165C204.562 145.625 229.602 117.094 235.053 86.9812C237.775 71.9424 235.604 56.5409 231.488 41.9709C227.373 27.4015 221.307 13.6453 216.229 1.90121L215.77 2.09964ZM136.553 162.681C102.626 171.447 74.0473 180.932 51.9673 191.703C29.8922 202.471 14.2827 214.538 6.33627 228.483C-1.62077 242.448 -1.8735 258.258 6.68087 276.445C15.2293 294.62 32.5763 315.18 59.8363 338.689L60.1628 338.311C32.9234 314.819 15.6378 294.314 7.13331 276.233C-1.36526 258.164 -1.0913 242.529 6.7707 228.731C14.6433 214.915 30.1452 202.904 52.1865 192.152C74.223 181.403 102.765 171.927 136.678 163.165L136.553 162.681Z"
              fill="#3F5540"
            />
          </svg>
        </div>
      </div>

      <h2 className={`${css.title1} ${css.add1}`}>Тут час збирає спогади</h2>

      <p className={css.text1}>
        Я знаю, що сучасний світ насичений стресом та проблемами. Але «На селі у
        Дідуся» не існує цих слів. Природа, свіже повітря, величний ліс та
        кристально чисте блакитне озеро змусять тебе
        <span className={css.bold}> поринути в спокій,</span> зупинити думки та
        забути про все на світі. <br />
      </p>
      <p className={css.text1}>
        Разом ми зможемо
        <span className={css.bold}> створити щасливі спогади </span>
        неповторних моментів, які дарують внутрішню насолоду, щастя та відчуття
        цінності кожної хвилинки тут.
      </p>
      <div className={css.imgBox4}>
        <Image
          src={grandpa3}
          alt={"grandpa3"}
          width={145}
          height={127}
          className={css.grandpa3}
        />
        <Image
          src={photo7}
          alt={"photo6"}
          width={194}
          height={168}
          className={css.photo7}
        />
        <Image
          src={photo8}
          alt={"photo8"}
          width={290}
          height={186}
          className={css.photo8}
        />
        <div className={css.line4Box}>
          <svg
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
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
