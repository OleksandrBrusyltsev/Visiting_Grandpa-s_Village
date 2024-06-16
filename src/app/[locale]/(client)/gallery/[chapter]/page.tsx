import React from 'react'

type Props = {params: { chapter: string }}

export default function Page({params}: Props) {
    const {chapter} = params;
  return (
    <div className='container'>
      <h1 style={{
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
      }}>Сторінка {chapter}</h1>
    </div>
  )
}