"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Icon from "../../ui/Icon/Icon";
import Swiper from "./Swiper/Swiper";
import s from "./Gallery.module.scss";

interface GalleryType {
  pictures: string[];
}

const Gallery: FC<GalleryType> = ({ pictures }) => {
  const [isSwiperOpen, setSwiperOpen] = useState(false);

  const toggleMenu = () => {
    setSwiperOpen((isSwiperOpen) => !isSwiperOpen);
  };

  const small =
    pictures.length >= 5
      ? s.small__5
      : pictures.length === 4
      ? s.small__4
      : s.small__3;

  return (
    <div className={s.galleryWrapper}>
      {isSwiperOpen && <div className={s.overlay} onClick={toggleMenu}></div>}
      {isSwiperOpen && (
        <div className={s.cross} onClick={toggleMenu}>
          <Icon name="house-gallery-cross" />
        </div>
      )}
      <div className={s.gallery} onClick={toggleMenu}>
        {pictures.map((item, index) => (
          <div
            key={item}
            className={`${s.imageWrapper} ${index === 0 ? s.large : small}`}
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

      <Swiper pictures={pictures} isSwiperOpen={isSwiperOpen} />
    </div>
  );
};

export default Gallery;
