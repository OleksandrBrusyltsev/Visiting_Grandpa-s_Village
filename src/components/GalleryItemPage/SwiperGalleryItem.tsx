'use client';
import React, { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

import { MatchMediaContext } from '@/context/MatchMediaContext';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import './SwiperGalleryItem.scss';

type Props = Pick<GalleryItem, 'gallery'> & {initialSlide: number};

export default function SwiperGalleryItem({gallery, initialSlide}: Props) {
    const {isMobile, isTablet} = useContext(MatchMediaContext);
    return (
        <>
         <Swiper
            direction={isMobile ? 'vertical' : 'horizontal'}
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
            navigation={isMobile ? false : true}
          >
            {
                gallery.map(item => (
                    <SwiperSlide key={item.id}>
                        <div className="imageWrapper">
                          <Image quality={100} src={item.src} alt={item.description} fill style={{objectFit: isMobile || isTablet ? 'contain' : 'cover'}} />
                        </div>
                    </SwiperSlide>
                ))
            }
          </Swiper>
         
        </>
      );
}
