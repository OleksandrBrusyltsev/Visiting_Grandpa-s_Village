'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'

import s from './GalleryItemPageLisit.module.scss';
import { MatchMediaContext } from '@/context/MatchMediaContext';

type Props = { children: React.ReactNode };
export default function GalleryItemPageList({ children }: Props) {
    const listRef = useRef<HTMLElement | null>(null);
    const [size, setSize] = useState(0);
    const { isMobile, isTablet, isLaptop, isDesktop } = useContext(MatchMediaContext);

    useEffect(() => {
        if (window) setSize(window.innerWidth);
        const setNewSize = () => setSize(window.innerWidth);
        window.addEventListener('resize', setNewSize);
        return () => window.removeEventListener('resize', setNewSize);

    }, [])

    useEffect(() => {
        if (!listRef.current) return
        const _img = "url('/images/backgrounds/christmasTrees.png')";

        let imgSize = isMobile ? [250, 217] : [350, 305],
            bgSizeImg = '',
            bgPosImg = '',
            bgImgImage = '',
            verticalOffsetImg = isMobile ? 150 : isTablet ? 200 : 100;

        //компенсация отрицательного паддинга в css для galleryBlock -  - (isMobile ? 40 : 50)
        const blockHeight = listRef.current.clientHeight - (isMobile ? 40 : 50);
        const offsetV = isMobile ? 0.2 : 0.1;//смещение вертикального отступа для правой колонки ёлок, доля от verticalOffsetImg
        const offsetH = isMobile ? ' -20%' : ' 20%';
        let leftOffsetV: number, rightOffsetV: number;

        const totalLines = Math.round(blockHeight / (imgSize[1] + verticalOffsetImg) * 10) / 10;
        const totalInteger = Math.floor(totalLines);

        for (let i = 1; i <= totalInteger; i++) {
            leftOffsetV = verticalOffsetImg * i + imgSize[1] * (i - 1);
            rightOffsetV = verticalOffsetImg * offsetV + (i - 1) * (imgSize[1] + verticalOffsetImg)

            bgPosImg += `left${i % 2 ? '' : offsetH} top ${leftOffsetV}px, 
                            right${i % 2 ? offsetH : ''} top ${rightOffsetV}px` + (i === totalInteger ? '' : ', ');

            bgSizeImg += `${imgSize[0]}px ${imgSize[1]}px` + ', ' + `${imgSize[0]}px ${imgSize[1]}px` + (i === totalInteger ? '' : ', ');
            bgImgImage += _img + ', ' + _img + (i === totalInteger ? '' : ', ');
        }

        if (totalLines % 1 >= 0.5) {
            bgPosImg += `, right bottom`;
            bgSizeImg += ', ' + `${imgSize[0]}px ${imgSize[1]}px`;
            bgImgImage += ', ' + _img;
        }

        listRef.current.style.backgroundSize = bgSizeImg;
        listRef.current.style.backgroundRepeat = 'no-repeat';
        listRef.current.style.backgroundPosition = bgPosImg;
        listRef.current.style.backgroundImage = bgImgImage;

    }, [size]);

    return (
        <section className={`${s.galleryBlock} container`} ref={listRef}>
            <ul className={s.imagesList}>
                {children}
            </ul>
        </section>
    )
}