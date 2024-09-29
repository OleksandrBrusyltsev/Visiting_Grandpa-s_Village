import React from 'react'

type Props = { params: { chapter: string } }

export default function page({ params }: Props) {
    return (
        <div>Сторінка розділу галереї {params.chapter}</div>
    )
}