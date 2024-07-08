import React, { forwardRef } from 'react'

import Icon from '@/components/ui/Icon/Icon';

import s from './Quote.module.scss';

type Props = {title: string, position: "left" | "right", children: React.ReactNode}

const Quote = forwardRef<HTMLDivElement, Props>(function Quote({title, position, children}, ref) {
  return (
    <hgroup 
      className={`${s.quoteWrapper} ${position === 'right' ? s.right : s.left}`} 
      key={title}>
      <div 
        className={s.quoteTitle}
        ref={ref}>
        <h2>
          {title}
        </h2>
        <Icon name="ellipse" className={s.titleOutline} />
      </div>
      {children}
    </hgroup>
  )
});

export default Quote;