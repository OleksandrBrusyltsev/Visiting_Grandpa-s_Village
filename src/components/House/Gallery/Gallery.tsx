"use client";
import { FC, useState, useContext } from "react";
import Image from "next/image";
import MainSwiper from "./MainSwiper/MainSwiper";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./Gallery.module.scss";

interface GalleryType {
  pictures: string[];
}

const Gallery: FC<GalleryType> = ({ pictures }) => {
  const [isSwiperOpen, setSwiperOpen] = useState(false);
  const [firstSlide, setFirstSlide] = useState<number>(0);
  const { isTablet, isMobile } = useContext(MatchMediaContext);
  const toggleSwiper = (i: number) => {
    setSwiperOpen(!isSwiperOpen);
    setFirstSlide(i);
  };
  const handleKeyboardToggle = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && !isSwiperOpen) {
      toggleSwiper(index);
    }
  };

  const small =
    pictures.length >= 5
      ? s.small__5
      : pictures.length === 4
      ? s.small__4
      : s.small__3;

  return (
    <div className={s.galleryWrapper}>
      <div className={s.gallery}>
        {pictures.map((item, index) => (
          <div
            key={item}
            className={`${s.imageWrapper} ${index === 0 ? s.large : small}`}
            onClick={() => toggleSwiper(index)}
            onKeyDown={(e) => handleKeyboardToggle(e, index)}
            tabIndex={0}
          >
            <Image
              fill
              alt="alt"
              src={item}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
              sizes="(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw"
            />
          </div>
        ))}
      </div>

      {isMobile || isTablet ? (
        <div onClick={() => setSwiperOpen(!isSwiperOpen)}>
          <div className={s.imageMobileWrapper}>
            <Image
              key={pictures[0]}
              fill
              alt="alt"
              src={pictures[0]}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
              sizes="(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw"
            />
          </div>
          {isSwiperOpen && (
            <MainSwiper
              isSwiperOpen={isSwiperOpen}
              initialSlide={firstSlide}
              pictures={pictures}
              onClose={() => setSwiperOpen(false)}
            />
          )}
        </div>
      ) : (
        isSwiperOpen && (
          <MainSwiper
            isSwiperOpen={isSwiperOpen}
            initialSlide={firstSlide}
            pictures={pictures}
            onClose={() => setSwiperOpen(false)}
          />
        )
      )}
    </div>
  );
};

export default Gallery;
