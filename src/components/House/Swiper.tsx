"use client";

// import { FC, useRef, useEffect } from "react";
import { FC, useRef } from "react";
import s from "./Swiper.module.scss";
import Image from "next/image";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import { useContext } from "react";
import { register } from "swiper/element/bundle";
register();

interface SwiperType {
  pictures: string[];
}

const Swiper: FC<SwiperType> = ({ pictures }) => {
  // const swiperElRef = useRef<HTMLElement | null>(null);
  const swiperElRef = useRef<any>(null);

  // !2
  // useEffect(() => {
  //   const swiperEl = swiperElRef.current;

  //   if (swiperEl) {
  //     const swiperParams = {
  //       slidesPerView: 1,
  //       navigation: "true",
  //       pagination: "false",
  //       breakpoints: {
  //         640: {
  //           slidesPerView: 2,
  //           // navigation: "true",
  //           // pagination: "true",
  //         },
  //         1024: {
  //           slidesPerView: 3,
  //         },
  //       },
  //       on: {
  //         init() {
  //           console.log("Swiper initialized");
  //         },
  //       },
  //     };

  //     // Assign parameters to the Swiper element
  //     Object.assign(swiperEl, swiperParams);

  //     // Initialize the Swiper element
  //     swiperEl.initialize();
  //   }
  // }, []);

  const { isDesktop, isLaptop, isTablet, isMobile } =
    useContext(MatchMediaContext);
  const nav = isTablet || isMobile ? "false" : "true";

  return (
    <div className={s.sectionWrapper}>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation={nav}
        // pagination="true"
        // className={s.swiper}
        space-between={30}
      >
        {pictures.map((item) => (
          <swiper-slide key={item}>
            <Image
              fill
              alt="alt"
              src={item}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
              sizes="50vw"
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Swiper;
