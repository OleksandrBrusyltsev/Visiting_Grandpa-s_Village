import { FC } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import House from "../../../../public/images/contacts/house.png";
import MarkdownPreview from "@/functions/MarkdownPreview";

import s from "./RouteInfo.module.scss";
import { contacts } from "@/data/contacts";

type RouteInfoProps = {
  houseRef: React.RefObject<HTMLImageElement>;
  routeInfoWrapperRef: React.RefObject<HTMLDivElement>;
};
const RouteInfo: FC<RouteInfoProps> = ({ houseRef, routeInfoWrapperRef }) => {
  const locale = useLocale();

  return (
    <div className={s.imgAndRouteInfoWrapper}>
      <Image src={House} alt="" className={s.house} ref={houseRef} />
      <div className={s.routeInfoWrapper} ref={routeInfoWrapperRef}>
        <h2 className={s.routeInfoTitle}>{contacts.directions_from_city[locale as keyof typeof contacts.directions_from_city]}</h2>
        <div className={s.routeInfoText}>
          <MarkdownPreview markdown={contacts.routeInfo1[locale as keyof typeof contacts.routeInfo1]} />
        </div>
       
        <div className={s.textDotWrapper}>
          <span className={s.dot}></span>
          <p className={s.textDot}>{contacts.routeInfo2[locale as keyof typeof contacts.routeInfo2]}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
