"use client";

// import { FC, useRef, useEffect } from "react";
import { FC, useRef } from "react";
// import styles from "./Slider.module.scss";

import { register } from "swiper/element/bundle";
register();

const House: FC = () => {
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

  return (
    <>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="3"
        navigation="true"
        // pagination="true"
        className="mySwiper"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        ...
      </swiper-container>
    </>
  );
};

export default House;
