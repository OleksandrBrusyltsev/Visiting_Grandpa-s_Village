"use client";
import { FC, useState, useRef } from "react";
import Image from "next/image";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import { useContext } from "react";
import s from "./Gallery.module.scss";
import { register } from "swiper/element/bundle";
register();

interface SwiperType {
  pictures: string[];
}

const Gallery: FC<SwiperType> = ({ pictures }) => {
  const swiperElRef = useRef<any>(null);
  const { isTablet, isMobile } = useContext(MatchMediaContext);
  const nav = isTablet || isMobile ? "false" : "true";
  const [isSwiperOpen, setSwiperOpen] = useState(false);

  const toggleMenu = () => {
    setSwiperOpen((isSwiperOpen) => !isSwiperOpen);
  };

  return (
    <>
      {isSwiperOpen && <div className={s.overlay} onClick={toggleMenu}></div>}
      <div className={s.gallery} onClick={toggleMenu}>
        {pictures.map((item) => (
          <div key={item} className={s.imageWrapper}>
            <Image
              fill
              alt="alt"
              src={item}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>

      {isSwiperOpen && (
        <div className={s.swiperLaptopWrapper}>
          <div className={s.swiperLaptop}>
            <swiper-container
              ref={swiperElRef}
              slides-per-view="1"
              navigation={nav}
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

export default Gallery;
