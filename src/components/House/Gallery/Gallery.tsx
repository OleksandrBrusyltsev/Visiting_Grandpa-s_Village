"use client";
import { useState, useContext, forwardRef } from "react";
import Image from "next/image";
import MainSwiper from "./MainSwiper/MainSwiper";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./Gallery.module.scss";
import { useTranslations } from "next-intl";

interface GalleryType {
  pictures: string[];
  houseName: string;
}

const Gallery = forwardRef<HTMLDivElement, GalleryType>(function Gallery(
  { pictures, houseName },
  ref
) {
  const [isSwiperOpen, setSwiperOpen] = useState(false);
  const [firstSlide, setFirstSlide] = useState<number>(0);
  const { isTablet, isMobile } = useContext(MatchMediaContext);

  const t = useTranslations("HouseItem");

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
    <div className={s.galleryWrapper} ref={ref}>
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
              alt={t('altText', { title: houseName })}
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
              alt={t('altText', { title: houseName })}
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
              houseName={houseName}
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
            houseName={houseName}
          />
        )
      )}
    </div>
  );
});

export default Gallery;
