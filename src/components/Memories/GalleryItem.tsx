"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import s from './GalleryItem.module.scss';
import Image from 'next/image';
import Button from '../ui/Button/Button';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {data: GalleryItem};
gsap.registerPlugin(useGSAP);      



export default function GalleryItem({data}: Props) {
  const {title, images} = data;
  const router = useRouter();
  const handleClickItem = () => router.push(`/ua/gallery/${title}`);
  return (
    
      <div 
        className={s.itemWrapper} 
        tabIndex={0}
        onKeyDown={(e) => e.code === 'Enter' || e.code === 'NumpadEnter' && handleClickItem()}
      >
        <div className={s.imageWrapper} >
          <Link href={`/ua/gallery/${title}`} className={s.tmpLink} tabIndex={-1}>
            <Image 
              className={s.itemImage} 
              src={images[0].src} 
              alt={images[0].description} 
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill/>
          </Link>
        </div>
        <div className={s.titleWrapper}>
          <h2 className={s.itemTitle} >{title}</h2>
        </div>
        <div className={s.btnWrapper} >
          <Button 
            label='Переглянути' 
            type='button' 
            onClick={handleClickItem}
            tabIndex={-1} />
        </div>
      </div>
    
  )
}