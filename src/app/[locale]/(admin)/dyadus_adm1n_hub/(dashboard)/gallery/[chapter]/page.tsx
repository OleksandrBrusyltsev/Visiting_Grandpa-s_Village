import React from 'react'

type Props = Readonly<{ params: { chapter: string } }>

export default function Page({ params }: Props) {
    return (
        <div>Сторінка розділу галереї {params.chapter}</div>
    )
}