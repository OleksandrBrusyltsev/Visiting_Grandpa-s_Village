import { FC } from "react";
import Image from "next/image";
import House from "../../../../public/images/contacts/house.png";
import s from "./RouteInfo.module.scss";

type RouteInfoProps = {
  houseRef: React.RefObject<HTMLImageElement>;
  routeInfoWrapperRef: React.RefObject<HTMLDivElement>;
};
const RouteInfo: FC<RouteInfoProps> = ({ houseRef, routeInfoWrapperRef }) => {
  return (
    <div className={s.imgAndRouteInfoWrapper}>
      <Image src={House} alt="picture" className={s.house} ref={houseRef} />
      <div className={s.routeInfoWrapper} ref={routeInfoWrapperRef}>
        <h1 className={s.routeInfoTitle}>Як дістатися з Чернігова?</h1>
        <p className={s.routeInfoText}>
          Електричка на станцію Грибова Рудня з Чернігова ходить двічі на день — о 8:16 ранку та о 21:20 вечора. Однак під час бойових дій рух електрички може бути припинений, тому рекомендується перевіряти актуальний розклад перед поїздкою.
        </p>
        <p className={s.routeInfoText}>
          Автобусний маршрут Чернігів - Олександрівка: автобус ходить один раз на день, відправлення з Чернігова орієнтовно о 12:30 з автостанції «Нива» та орієнтовно о 13:30 від зупинки біля готелю «Україна».
        </p>
        <div className={s.textDotWrapper}>
          <span className={s.dot}></span>
          <p className={s.textDot}>Інформація може змінюватися</p>
        </div>
      </div>
    </div>
  );
};



export default RouteInfo;
