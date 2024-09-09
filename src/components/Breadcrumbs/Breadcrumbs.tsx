'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';

import BreadcrumbItem from './BreadcrumbItem';
import Icon from '../ui/Icon/Icon';
import { getData } from '@/actions/getData';


import s from './Breadcrumbs.module.scss';

type Routes = {
  house?: string;
  room?: string;
  chapter?: string;
  locale: string
};

export default function Breadcrumbs() {
  const t = useTranslations('Breadcrumbs');
  const params: Routes = useParams();
  const pathname = usePathname();
  const locale = useLocale();
  const { back } = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState<Array<{
    href?: string;
    text: string;
  }>>([]);

  //массив-заготовка с фактическими путями
  const pathArray = useMemo(() => {
    const res = pathname.split('/').filter((path) => path !== locale);
    res[0] = 'home';
    return res;
  }, [pathname]);

  useEffect(() => {
    (async () => {
      //объект с переводами для динамических путей (slug)
      const slugTranslation: {
        [key: string]: string
      } = {};

      //получаем данные из API и формируем объект с переводами для динамических путей (slug)
      for (let key in params) {

        if (key !== 'locale') {
          let data: GalleryItem[] | HouseItem[] | undefined;
          if (key === 'chapter') {
            data = await getData('gallery');
          } else if (key === 'house') {
            data = await getData('houses');
          } else if (key === 'room') {
            const tmpData: HouseItem[] = await getData('houses', params['house']);
            if (!tmpData.length) return
            data = tmpData[0].rooms;
          }

          const value = params[key as keyof typeof params];

          if (data) {
            const currentItem = data.filter(item => item.name === value);
            const translation = currentItem.length ? currentItem[0].title[locale as keyof typeof currentItem[0]['title']] : '';
            if (!translation) return
            slugTranslation[value as string] = translation;
          }
        }
      }

      //формируем готовые хлебные крошки
      const breadcrumbs = pathArray[pathArray.length - 1] !== 'rules' ?
        pathArray.map((path, index) => {
          const text = slugTranslation[path as string] || t(path);
          const href = (index !== pathArray.length - 1) ?
            `/${locale}/` + pathArray.slice(0, index + 1).filter(p => p !== 'home').join('/') :
            '';
          return {
            href,
            text,
          };
        }) :
        [
          { text: t('rules') }
        ];
      setBreadcrumbs(breadcrumbs);
    })();

  }, [pathname]);

  if (!breadcrumbs.length) return

  const isMain = pathArray.length === 1;

  return (
    !isMain ? <div className='container'>
      <nav aria-label="Хлібні крошки" className={s.breadcrumbsWrapper}>
        <ul role="breadcrumb" className={s.breadcrumbsList}>
          {breadcrumbs.map((item, i) => (<BreadcrumbItem item={item} key={i} />))}
        </ul>
      </nav>
      <button
        className={s.arrowBack}
        onClick={back}
        aria-label="Повернутися на попередню сторінку"
      >
        <Icon name="arrow" className={s.iconArrow} />
      </button>
    </div> : null
  )
}