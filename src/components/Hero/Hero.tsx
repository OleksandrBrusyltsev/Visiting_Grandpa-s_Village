import css from "./Hero.module.scss";
import Image from "next/image";

const grandpa1 = "/images/Hero/grandpa1.jpg";
const grandpa2 = "/images/Hero/grandpa2.jpg";
const grandpa3 = "/images/Hero/grandpa3.jpg";

const line1 = "/images/Hero/line1.jpg";
const line2 = "/images/Hero/line2.jpg";
const line3 = "/images/Hero/line3.jpg";
const line4 = "/images/Hero/line4.jpg";

const photo1 = "/images/Hero/photo1.jpg";
const photo2 = "/images/Hero/photo2.jpg";
const photo3 = "/images/Hero/photo3.jpg";
const photo4 = "/images/Hero/photo4.jpg";
const photo5 = "/images/Hero/photo5.jpg";
const photo6 = "/images/Hero/photo6.jpg";
const photo7 = "/images/Hero/photo7.jpg";
const photo8 = "/images/Hero/photo8.jpg";

const illustration1 = "/images/Hero/illustration1.jpg";
const illustration2 = "/images/Hero/illustration2.jpg";
const illustration3 = "/images/Hero/illustration3.jpg";

const Hero = () => {
  return (
    <section className={css.section}>
      <div className={css.grandbox1}>
        <h1 className={css.mainTitle}>Привіт, мій майбутній відвідувач</h1>

        <Image
          src={grandpa1}
          alt={"GrandPa"}
          width={99}
          height={99}
          className={css.grandpa1}
        />
      </div>
      <p className={css.text1}>
        Я - твій <span className={css.bold}>френдлі Дідусь.</span> Сьогодні
        покажу тобі мою затишну домівку, проведу сторінками казкового місця
        сили, тиші та спокою. Я створив цю садибу для тебе, щоб в потрібний
        момент ти міг зупинити думки,насолодитись природою, прислухатись до себе
        та створити нові приємні спогади.
      </p>
      <p className={css.text2}>
        “Слідуй за мною та відчуй історію творіння мого життя.”
      </p>
      <div className={css.imgBox}>
        <Image
          src={photo1}
          alt={"photo"}
          width={195}
          height={177}
          className={css.photo1}
        />
        <Image
          src={illustration1}
          alt={"illustration"}
          width={222}
          height={202}
          className={css.illustration1}
        />
        <Image
          src={line1}
          alt={"line"}
          width={192}
          height={265}
          className={css.line1}
        />
      </div>

      <div className={css.grandbox2}>
        <Image
          src={grandpa2}
          alt={"grandpa2"}
          width={103}
          height={93}
          className={css.grandpa2}
        />
        <h2 className={css.title1}>Затишне місце сили </h2>
      </div>
      <p className={css.text1}>
        Радий вітати тебе, перший крок до знайомства з моєю садибою зроблено.
        Доторкнись до найтепліших спогадів мого життя, які сплекали{" "}
        <span className={css.bold}>найкраще місце на Землі</span> еко-садибу “На
        селі у Дідуся”. Мені завжди подобалась природа, я відчуваю її силу та
        велич. Твоєму Дідусю пощастило народитись серед неймовірної краси:
        зелені хвойні ліса, надзвичайне{" "}
        <span className={css.bold}>блакитне озеро - справжня казка,</span> від
        якої захоплює подих і дивує відвідувачів унікальним кольором води.
      </p>
      <p className={css.text2}>"Кожен гість - мій привід посміхнутися."</p>

      <div className={css.imgBox2}>
        <div className={css.container}>
          <Image
            src={photo4}
            alt={"photo4"}
            width={145}
            height={92}
            className={css.photo4}
          />
        </div>
        <Image
          src={photo2}
          alt={"photo2"}
          width={185}
          height={102}
          className={css.photo2}
        />

        <Image
          src={photo3}
          alt={"photo3"}
          width={210}
          height={138}
          className={css.photo3}
        />
        <Image
          src={line2}
          alt={"line2"}
          width={223}
          height={268}
          className={css.line2}
        />
      </div>

      <h2 className={`${css.title1} ${css.add}`}>Доторкнись до природи</h2>
      <p className={css.text1}>
        Я вирішив ділитись насолодою та емоціями від краси мого краю з іншими.
        Так була створена еко-садиба у селі Олешня. Мій неповторний рідний край
        став натхнення для народження{" "}
        <span className={css.bold}>прекрасного місця сили,</span> затишку та
        відновлення. Зараз маю аж{" "}
        <span className={css.bold}>8 комфортних та затишних будиночків,</span>{" "}
        щоб приймати гостей. Я створив всі умови, щоб мої відвідувачі почували
        себе щасливими. Я обожнюю бачити посмішки та радість, які можу дарувати
        завдяки казковому місцю, моїй садибі.
      </p>
      <div className={css.imgBox3}>
        <Image
          src={illustration3}
          alt={"illustration3"}
          width={182}
          height={160}
          className={css.illustration3}
        />
        <Image
          src={photo7}
          alt={"photo7"}
          width={167}
          height={170}
          className={css.photo7}
        />
        <Image
          src={photo5}
          alt={"photo5"}
          width={182}
          height={135}
          className={css.photo5}
        />
        <Image
          src={illustration2}
          alt={"illustration2"}
          width={208}
          height={195}
          className={css.illustration2}
        />
        <Image
          src={line3}
          alt={"line3"}
          width={319}
          height={213}
          className={css.line3}
        />
      </div>

      <h2 className={`${css.title1} ${css.add1}`}>Тут час збирає спогади</h2>
      <p className={css.text1}>
        Я знаю, що сучасний світ насичений стресом та проблемами. Але «На селі у
        Дідуся» не існує цих слів. Природа, свіже повітря, величний ліс та
        кристально чисте блакитне озеро змусять тебе{" "}
        <span className={css.bold}>поринути в спокій,</span> зупинити думки та
        забути про все на світі. Разом ми зможемо{" "}
        <span className={css.bold}>створити щасливі спогади</span>
        неповторних моментів, які дарують внутрішню насолоду, щастя та відчуття
        цінності кожної хвилинки тут.
      </p>
      <div className={css.imgBox4}>
        <Image
          src={grandpa3}
          alt={"grandpa3"}
          width={145}
          height={148}
          className={css.grandpa3}
        />
        <Image
          src={photo6}
          alt={"photo6"}
          width={176}
          height={150}
          className={css.photo6}
        />
        <Image
          src={photo8}
          alt={"photo8"}
          width={256}
          height={158}
          className={css.photo8}
        />
        <Image
          src={line4}
          alt={"line4"}
          width={236}
          height={372}
          className={css.line4}
        />
      </div>
    </section>
  );
};

export default Hero;
