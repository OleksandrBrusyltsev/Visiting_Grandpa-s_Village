"use client";
import { FC, useState, useContext, useRef } from "react";
import Image from "next/image";
import Swiper from "./Swiper/Swiper";
import Modal from "@/components/ui/Modal/Modal";
import SwiperMobile from "./SwiperMobile/SwiperMobile";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./Gallery.module.scss";

interface GalleryType {
  pictures: string[];
}

const Gallery: FC<GalleryType> = ({ pictures }) => {
  const [isSwiperOpen, setSwiperOpen] = useState(false);
  const [firstSlide, setFirstSlide] = useState<number>(0);
  const { isTablet, isMobile } = useContext(MatchMediaContext);
  const swiperElRef = useRef<any>(null);
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
            />
          </div>
        ))}
      </div>

      {isMobile || isTablet ? (
        <SwiperMobile pictures={pictures} />
      ) : (
        isSwiperOpen && (
          <Modal
            isOpen={isSwiperOpen}
            onClose={() => setSwiperOpen(false)}
            wrapperStyles={{
              width: isMobile ? "100vw" : "90vw",
              height: "100dvh",
            }}
          >
            <Swiper
              pictures={pictures}
              isSwiperOpen={isSwiperOpen}
              initialSlide={firstSlide}
            />
          </Modal>
        )
      )}
    </div>
  );
};

export default Gallery;
