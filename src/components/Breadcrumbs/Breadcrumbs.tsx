"use client"
import React from 'react'

import BreadcrumbItem from './BreadcrumbItem';
import Icon from '../ui/Icon/Icon';

import s from './Breadcrumbs.module.scss';
import { useParams, usePathname, useRouter } from 'next/navigation';

type BreadcrumbsProps = {items: TBreadcrumbItem[]}

export const breadcrumbs = [
  {
    id: 0,
    link: "",
    text: "ГОЛОВНА",
  },
  {
    id: 1,
    link: "houses",
    text: "ЖИТИ",
    subNav: 'custom'
  },
  { 
    id: 2, 
    link: "dishes", 
    text: "ЇСТИ" 
  },
  {
    id: 3,
    link: "leisure",
    text: "БАЙДИКУВАТИ",
  },
  {
    id: 4,
    link: "memories",
    text: "СПОГАДИ",
    subNav: 'custom'
  },
  {
    id: 5,
    link: "contacts",
    text: "ЗНАЙТИ МЕНЕ",
  },
  {
    id: 6,
    link: "booking",
    text: "ЗАВІТАТИ",
    subNav: [
      {
        id: 1,
        link: "options",
        text: "варіанти бронювань",
      },
      {
        id: 2,
        link: "payment",
        text: "оплата",
      },
      {
        id: 3,
        link: "rules",
        text: "Умови бронювання та правила перебування",
      }
    ]
  },
];

export default function Breadcrumbs() {
  const params = useParams();
  const pathname = usePathname();
  const {back} = useRouter();
  console.log(params, pathname);
  
  const items = breadcrumbs;
  
  return (
    true ? <div className='container'>
      <nav className={s.breadcrumbsWrapper}>
        Breadcrumbs
        {/* {items.map((item, i) => (<BreadcrumbItem item={item} key={i}/>))} */}
      </nav>
      <button 
        className={s.arrowBack}
        onClick={back}
        >
          <Icon name="arrow" className={s.iconArrow} />
      </button>
    </div> : null
  )
}