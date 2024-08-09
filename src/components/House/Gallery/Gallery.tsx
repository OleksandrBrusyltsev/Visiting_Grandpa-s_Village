"use client";
import { FC, useState, useContext, useRef } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
// import Swiper from "./Swiper/Swiper";
import SwiperMobile from "./SwiperMobile/SwiperMobile";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import s from "./Gallery.module.scss";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import "./NewSwiper.scss";
// import "../../GalleryItemPage/SwiperGalleryItem";

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

      {/* {isMobile || isTablet ? (
        <SwiperMobile pictures={pictures} initialSlide={firstSlide} />
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
      )} */}
      {isMobile || isTablet ? (
        <SwiperMobile pictures={pictures} initialSlide={firstSlide} />
      ) : (
        isSwiperOpen && (
          <Modal
            isOpen={isSwiperOpen}
            onClose={() => setSwiperOpen(false)}
            wrapperStyles={{
              width: isMobile ? "100vw" : "90vw",
            }}
          >
            <Swiper
              direction={isMobile ? "vertical" : "horizontal"}
              initialSlide={firstSlide}
              slidesPerView={1}
              spaceBetween={3}
              keyboard={{
                enabled: true,
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Keyboard, Pagination, Navigation]}
              navigation={isMobile ? false : true}
            >
              {pictures.map((item) => (
                <SwiperSlide key={item}>
                  <div className="imageWrapper">
                    <Image
                      src={item}
                      sizes="(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw"
                      placeholder="blur"
                      blurDataURL={
                        "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8dOXMfwAIZQNzt0gGRgAAAABJRU5ErkJggg=="
                      }
                      alt="alt"
                      fill
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Modal>
        )
      )}
    </div>
  );
};

export default Gallery;
