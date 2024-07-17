"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import { useContext } from "react";
import s from "./Swiper.module.scss";
import { register } from "swiper/element/bundle";
register();

interface SwiperType {
  pictures: string[];
  isSwiperOpen: boolean;
}

const Swiper: FC<SwiperType> = ({ pictures, isSwiperOpen }) => {
  const swiperElRef = useRef<any>(null);
  const { isTablet, isMobile } = useContext(MatchMediaContext);
  const nav = isTablet || isMobile ? "false" : "true";

  return (
    <>
      {isSwiperOpen && (
        <div className={s.swiperLaptopWrapper}>
          <div className={s.swiperLaptop}>
            <swiper-container
              ref={swiperElRef}
              slides-per-view="1"
              navigation={nav}
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
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      )}

      <div className={s.swiperMobile}>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="1"
          navigation={nav}
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
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default Swiper;
