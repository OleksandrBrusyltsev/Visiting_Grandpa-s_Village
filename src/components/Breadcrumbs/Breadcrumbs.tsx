'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';

import BreadcrumbItem from './BreadcrumbItem';
import Icon from '../ui/Icon/Icon';
import { getData } from '@/actions/getData';


import s from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const t = useTranslations('Breadcrumbs');
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();
  const {back} = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState<Array<{
    href?: string;
    text: string;
  }>>([]);

  
  const pathArray = useMemo(() => {
    const res = pathname.split('/').filter((path) => path !== locale);
    res[0] = 'home';
    return res;
  }, [pathname]);

  useEffect(() => {
    (async () => {
      const segmentTranslation: {
        [key: string]: string
      } = {};

      for(let key in params) {
        if(params[key as keyof typeof params]) {
          let data: GalleryItem[] | HouseItem[] | undefined;
          if(key === 'chapter') {
            data = await getData('gallery');
          } else if(key === 'house') {
            data = await getData('houses');
          } else if(key === 'room') {
            const tmpData: HouseItem[] = await getData('houses');
            data = tmpData.filter(item => item.name === params['house'])[0].rooms;
          }

          const name = params[key as keyof typeof params];
          if(data) {
            const currentItem = data.filter(item => item.name === name)[0];
            segmentTranslation[name as string] = currentItem.title.filter(item => item.language === locale)[0]?.text;
          }
        }
      } 
      
      const breadcrumbs = pathArray[pathArray.length - 1] !== 'rules' ? pathArray.map((path, index) => {
        const text = segmentTranslation[path as string] || t(path);
        const href = (index !== pathArray.length - 1) ? 
                  `/${locale}/` + pathArray.slice(0, index + 1).filter(p => p !== 'home').join('/') :
                  '';
        return {
          href,
          text,
        };
      }) :
        [
          {text: t('rules')}
        ];
      setBreadcrumbs(breadcrumbs);
    })();

  }, [pathname]);

  const isMain = pathArray.length === 1;

  return (
    !isMain ? <div className='container'>
      <nav aria-label="Хлібні крошки" className={s.breadcrumbsWrapper}>
        <ul role="breadcrumb" className={s.breadcrumbsList}>
          { breadcrumbs.map((item, i) => (<BreadcrumbItem item={item} key={i}/>)) }
        </ul>
      </nav>
      <button
        className={s.arrowBack}
        onClick={back }
        aria-label="Повернутися на попередню сторінку"
        >
          <Icon name="arrow" className={s.iconArrow} />
      </button>
    </div> : null
  )
}