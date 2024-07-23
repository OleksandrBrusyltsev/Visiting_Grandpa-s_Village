"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { forwardRef, useContext } from "react";
import { MatchMediaContext } from "@/context/MatchMediaContext";

import Button from '../ui/Button/Button';

import s from './GalleryItem.module.scss';

type Props = {data: GalleryItem};

const GalleryItem = forwardRef<HTMLDivElement, Props>(function GalleryItem({data}, ref) {
  const {locale} = useParams();
  const path = usePathname();
  const pathName = path.split('/')[2];
  const {isMobile, isTablet} = useContext(MatchMediaContext);
  const {name, cover} = data;
  const title = data.title.filter(item => item.language === locale)[0].text;
  
  const {push} = useRouter();
  const handleClickItem = () => push(`/${locale}/${pathName}/${name}`);
  
  return (
      <div 
        className={s.itemWrapper} 
        tabIndex={0}
        onKeyDown={(e) => (e.code === 'Enter' || e.code === 'NumpadEnter') && handleClickItem()}
        onClick={handleClickItem}
        ref={ref}
      >
        <div className={s.imageWrapper} >
          <Image 
            className={s.itemImage} 
            src={cover[0].src} 
            alt={cover[0].description} 
            sizes="(max-width: 768px) 100vw, 50vw"
            fill/>
        </div>
        <div className={s.titleWrapper}>
          <h2 className={s.itemTitle} >{title}</h2>
        </div>
        <div className={s.btnWrapper} >
          <Button 
            label={isMobile || isTablet ? title : 'Переглянути'} 
            type='button' 
            tabIndex={-1} />
        </div>
      </div>
    
  )
})
export default GalleryItem;