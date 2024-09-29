import React from 'react'

type Props = {params: {house: string}}

export default function page({params}: Props) {
  return (
    <div>Сторінка будиночка {params.house}</div>
  )
}