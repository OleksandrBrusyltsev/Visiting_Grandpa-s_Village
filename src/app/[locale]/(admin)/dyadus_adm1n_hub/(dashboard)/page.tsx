import React from 'react'

type Props = {children: React.ReactNode}

export default async function page({ children }: Props) {

  return (
    <div>
      Головна сторінка Адмін Панелі
    </div>
  )
}