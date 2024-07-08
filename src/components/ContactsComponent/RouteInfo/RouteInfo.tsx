import { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import House from "../../../../public/images/contacts/house.png";
import s from "./RouteInfo.module.scss";

const RouteInfo: FC = () => {
  const house = useRef<HTMLImageElement>(null);
  const routeInfoWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      house.current,
      {
        x: "100%",
      },
      {
        scrollTrigger: {
          trigger: house.current,
        },
        x: "0%",
        duration: 1,
        clearProps: "transform",
      }
    );
    gsap.fromTo(
      routeInfoWrapper.current,
      {
        x: "-100%",
      },
      {
        scrollTrigger: {
          trigger: routeInfoWrapper.current,
        },
        x: "0%",
        duration: 1,
        clearProps: "transform",
      }
    );
  });

  return (
    <div className={s.imgAndRouteInfoWrapper}>
      <Image src={House} alt="picture" className={s.house} ref={house} />
      <div className={s.routeInfoWrapper} ref={routeInfoWrapper}>
        <h1 className={s.routeInfoTitle}>Як дістатися з Чернігова?</h1>
        <p className={s.routeInfoText}>
          Електричкою до станції Грибова Рудня. Електричка виходить із Чернігова
          до Грибової Рудні двічі на день — о 8:16 ранку та о 21:20 вечора
        </p>
        <p className={s.routeInfoText}>
          Назад: із Грибової Рудні до Чернігова о 15:20 (1 раз на день) Автобус
          ходить один раз на день Чернігів-Ріпки-Олешня Виїзд орієнтовно о 12.30
          від автостанції «Нива» Чернігів Виїзд з Олешні орієнтовно о 17:20.
        </p>
        <div className={s.textDotWrapper}>
          <span className={s.dot}></span>
          <p className={s.textDot}>інформація може змінюватись</p>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
