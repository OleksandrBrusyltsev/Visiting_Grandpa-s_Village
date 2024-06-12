import React from 'react'
import Link, {LinkProps} from 'next/link';

import s from './BreadcrumbItem.module.scss';

export type BreadcrumbItemProps = {
  item: TBreadcrumbItem
}

export default function BreadcrumbItem({item}: BreadcrumbItemProps) {
  const {text, link} = item;
  return (
    <>
      <span className={s.divider}>/</span>
      {link ? 
        <li className={s.breadcrumb}><Link href={link!} >{text}</Link></li> :
        <li className={s.breadcrumbLast}>{text}</li>}
    </>
  )
}