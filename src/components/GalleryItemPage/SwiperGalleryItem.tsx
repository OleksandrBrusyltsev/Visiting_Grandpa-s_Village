'use client';
import React, { useContext } from 'react';
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
    const {isMobile} = useContext(MatchMediaContext);
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
                          <Image 
                          src={item.src} 
                          sizes='(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw'
                          placeholder='blur'
                          blurDataURL={'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8dOXMfwAIZQNzt0gGRgAAAABJRU5ErkJggg=='}
                          alt={item.description} fill 
                          />
                        </div>
                    </SwiperSlide>
                ))
            }
          </Swiper>
         
        </>
      );
}
