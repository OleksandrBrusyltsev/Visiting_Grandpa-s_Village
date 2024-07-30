"use client";
import { FC, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./SwiperMobile.module.scss";
import { register } from "swiper/element/bundle";
register();

interface SwiperType {
  pictures: string[];
}

const SwiperMobile: FC<SwiperType> = ({ pictures }) => {
  const swiperElRef = useRef<any>(null);

  return (
    <div className={s.swiperMobile}>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="false"
        space-between={30}
        // @ts-ignore
        loop="true"
      >
        {pictures.map((item) => (
          <swiper-slide key={item}>
            <Image
              fill
              alt="alt"
              src={item}
              style={{
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default SwiperMobile;
