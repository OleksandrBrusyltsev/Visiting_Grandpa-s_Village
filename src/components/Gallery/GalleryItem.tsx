"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from "next-intl";

import Button from '../ui/Button/Button';

import s from './GalleryItem.module.scss';

type Props = {data: GalleryItem};

gsap.registerPlugin(useGSAP);      

export default function GalleryItem({data}: Props) {
  const locale = useLocale();
  const path = usePathname();
  const pathName = path.split('/')[2];

  const {name, images} = data;
  const title = data.title.filter(item => item.language === locale)[0]?.text;
  
  const router = useRouter();
  const handleClickItem = () => router.push(`/${locale}/${pathName}/${name}`);
  
  return (
      <div 
        className={s.itemWrapper} 
        tabIndex={0}
        onKeyDown={(e) => (e.code === 'Enter' || e.code === 'NumpadEnter') && handleClickItem()}
        onClick={handleClickItem}
      >
        <div className={s.imageWrapper} >
          <Image 
            className={s.itemImage} 
            src={images[0].src} 
            alt={images[0].description} 
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill/>
        </div>
        <div className={s.titleWrapper}>
          <h2 className={s.itemTitle} >{title}</h2>
        </div>
        <div className={s.btnWrapper} >
          <Button 
            label='Переглянути' 
            type='button' 
            tabIndex={-1} />
        </div>
      </div>
    
  )
}