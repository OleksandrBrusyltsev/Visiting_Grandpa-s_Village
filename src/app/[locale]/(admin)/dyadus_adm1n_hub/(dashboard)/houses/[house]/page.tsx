import React from 'react'

type Props = {params: {house: string}}

export default function Page({params}: Props) {
  return (
    <div>Сторінка будиночка {params.house}</div>
  )
}