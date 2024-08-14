"use client";
import { FC, useContext } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { MatchMediaContext } from "@/context/MatchMediaContext";
import { register } from "swiper/element/bundle";
register();

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import "../../../GalleryItemPage/SwiperGalleryItem.scss";
import "../NewSwiper.scss";

interface SwiperType {
  isSwiperOpen: boolean;
  pictures: string[];
  initialSlide: number;
  onClose: () => void;
}

const MainSwiper: FC<SwiperType> = ({
  pictures,
  isSwiperOpen,
  initialSlide,
  onClose,
}) => {
  const { isMobile, isTablet } = useContext(MatchMediaContext);

  return (
    <Modal
      isOpen={isSwiperOpen}
      onClose={onClose}
      wrapperStyles={{
        width: isMobile ? "100vw" : "90vw",
      }}
    >
      <Swiper
        direction="horizontal"
        initialSlide={initialSlide}
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
        navigation={isMobile || isTablet ? false : true}
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
  );
};

export default MainSwiper;