import Icon from '@/components/ui/Icon/Icon';
import s from './Quote.module.scss';

import React from 'react'

type Props = {title: string, text: string, position: "left" | "right"}

export default function Quote({title, text, position}: Props) {
  return (
    <hgroup className={`${s.quoteWrapper} ${position === 'right' ? s.right : s.left}`} key={title}>
      <div className={s.quoteTitle}>
        <h2>
          {title}
        </h2>
        <Icon name="ellipse" className={s.titleOutline} />
      </div>
      <div className={s.quoteText}>{text}</div>
    </hgroup>
  )
}