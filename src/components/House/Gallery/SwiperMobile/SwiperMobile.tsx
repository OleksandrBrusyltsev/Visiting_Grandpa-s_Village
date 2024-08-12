"use client";
import { FC, useRef, useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import s from "./SwiperMobile.module.scss";
import { register } from "swiper/element/bundle";
register();

// interface SwiperType {
//   pictures: string[];
// }
interface SwiperType {
  pictures: string[];
  initialSlide: number;
}

const SwiperMobile: FC<SwiperType> = ({ pictures, initialSlide }) => {
  const swiperElRef = useRef<any>(null);
  return (
    <div className={s.swiperMobile}>
      <Swiper
        direction="vertical"
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
      >
        {pictures.map((item) => (
          <SwiperSlide key={item}>
            <div className="imageWrapper">
              <Image
                src={item}
                style={{
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
                alt="picture"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  // return (
  //   <div className={s.swiperMobile}>
  //     <swiper-container
  //       ref={swiperElRef}
  //       slides-per-view="1"
  //       navigation="false"
  //       space-between={30}
  //       // @ts-ignore
  //       loop="true"
  //     >
  //       {pictures.map((item) => (
  //         <swiper-slide key={item}>
  //           <Image
  //             fill
  //             alt="alt"
  //             src={item}
  //             style={{
  //               objectFit: "contain",
  //               borderRadius: "8px",
  //             }}
  //           />
  //         </swiper-slide>
  //       ))}
  //     </swiper-container>
  //   </div>
  // );
};

export default SwiperMobile;
