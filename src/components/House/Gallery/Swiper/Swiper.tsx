"use client";
import { FC, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./Swiper.module.scss";
import { register } from "swiper/element/bundle";
register();

interface SwiperType {
  pictures: string[];
  isSwiperOpen: boolean;
  initialSlide: number;
}

const Swiper: FC<SwiperType> = ({ pictures, isSwiperOpen, initialSlide }) => {
  const swiperElRef = useRef<any>(null);
  const { isTablet, isMobile } = useContext(MatchMediaContext);
  const nav = isTablet || isMobile ? "false" : "true";

  useEffect(() => {
    if (isSwiperOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSwiperOpen]);

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
              initial-slide={initialSlide}
            >
              {pictures.map((item) => (
                <swiper-slide key={item}>
                  <Image
                    fill
                    alt="alt"
                    src={item}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      )}
    </>
  );
};

export default Swiper;
