import React from 'react'
import Link from 'next/link'

import s from './BreadcrumbItem.module.scss'

export type BreadcrumbItemProps = {
  item: {
    text: string
    href?: string
  }
}

export default function BreadcrumbItem({ item }: BreadcrumbItemProps) {
  const { text, href } = item
  return (
    <>
      {href ? (
        <li className={s.breadcrumb}>
          <Link href={href}>{text}</Link>
        </li>
      ) : (
        <li className={s.breadcrumb}>{text}</li>
      )}
    </>
  )
}
