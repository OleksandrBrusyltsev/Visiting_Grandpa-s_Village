import { FC } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import House from "../../../../public/images/contacts/house.png";
import MarkdownPreview from "@/components/ui/MarkdownPreview/MarkdownPreview";

import s from "./RouteInfo.module.scss";

type RouteInfoProps = {
  houseRef: React.RefObject<HTMLImageElement>;
  routeInfoWrapperRef: React.RefObject<HTMLDivElement>;
  routeInfo: Pick<ContactItem, "directions_from_city" | "transit_options" | "route_change_notice">
};
const RouteInfo: FC<RouteInfoProps> = ({ houseRef, routeInfoWrapperRef, routeInfo }) => {
  const locale = useLocale() as Language;
  const { directions_from_city, transit_options, route_change_notice } = routeInfo;
  return (
    <div className={s.imgAndRouteInfoWrapper}>
      <Image src={House} alt="" className={s.house} ref={houseRef} />
      <div className={s.routeInfoWrapper} ref={routeInfoWrapperRef}>
        <h2 className={s.routeInfoTitle}>{directions_from_city[locale]}</h2>
        <div className={s.routeInfoText}>
          <MarkdownPreview markdown={transit_options[locale]} />
        </div>

        <div className={s.textDotWrapper}>
          <span className={s.dot}></span>
          <p className={s.textDot}>{route_change_notice[locale]}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
