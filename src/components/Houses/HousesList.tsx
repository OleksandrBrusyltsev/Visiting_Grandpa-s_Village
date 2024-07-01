'use client'
import React, { useEffect, useRef, useState } from 'react'

import s from './HousesList.module.scss';

type Props = {children: React.ReactNode, data: HouseItem[]};

export default function HousesList({children, data}: Props) {
    const listRef = useRef<HTMLElement | null>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        if(window) setSize(window.innerWidth);
        window.addEventListener('resize', () => setSize(window.innerWidth));
        return () => window.removeEventListener('resize', () => setSize(window.innerWidth));

    }, [])

    useEffect(() => {
        if(!listRef.current) return
        //trees
        const _img = "url('/images/backgrounds/christmasTrees.png')"; 
        //line pattern
        const _pattern = "url('/images/backgrounds/line-pattern.svg')"; 
        let bgSize = 0,
            imgSize = '',
            bigImgSize = '',

            bgSizeImg= '',
            bgSizePattern = '',

            bgPosImg = '',
            bgPosPattern = '',

            bgImgImage = '',
            bgImgPattern = '';

        if(window && window.innerWidth < 768 ) {
            const baseBlockHeight = 150 + data.length * (412 + 49) - 49 + 175; 
            const totalLines = data.length * 2 + 1;
            let offset = 0; 
            const inlinePadding = `clamp(-20px, calc((100vw - 500px) / 2 - 24px - 60px), ${(768 - 500) / 2  - 84}px)`;
            bgPosImg = `left ${inlinePadding}  top ${offset}px`;
            bgImgImage = _img;

            for(let i = 2; i <= totalLines; i++) {
                offset += i === 2 ? 300 : ( i % 2 ? 200 : 280 );
                bgPosImg += (i % 2 ? `, left` : `, right`) + ` ${inlinePadding} ` + `top calc(100% / calc(${baseBlockHeight}) * ${offset})`;
                bgImgImage += ', '  + _img;
            }
            // bgSize = '184px 178px';
            bgSizeImg = 'clamp(184px, calc(184 * 100vw / 375), 324px) clamp(178px, calc(184 * 100vw / 375 / 1.057), 314px)';
        }

        if(window && window.innerWidth >= 768 ) {
            // baseBg - line pattern, baseImg - trees
            let baseBgOffset =  window.innerWidth >= 1280 ? 140 : 100; 
            let baseImgOffset = 0; 

            //line pattern height
            bgSize =  window.innerWidth >= 1280 ? 1200 : 874; 
            //trees size
            imgSize =  window.innerWidth >= 1280 ? "383px 420px" : "324px 314px"; 
            //big trees (in the center)
            bigImgSize =  window.innerWidth >= 1280 ? "404px 443px" : "356px 345px"; 

            // const baseBlockHeight = window.innerWidth >= 1280 ? 3440 : 2739;
            const baseBlockHeight = window.innerWidth >= 1280 ? 
                Math.ceil(data.length / 2) * (489 + 71) - 71 + 171:
                140 + Math.ceil(data.length / 2) * (438 + 55) - 55 + 100;

            const baseCardHeight = window.innerWidth >= 1280 ? 560 : 493;
            //quantity of the line patterns
            const totalLines = Math.round(listRef.current.clientHeight / bgSize); 

            const v = listRef.current.clientHeight / baseBlockHeight;
                     
            //  positions, images and sizes of the line pattern background
            bgPosPattern = `left top ${baseBgOffset}px`;
            for(let i = 2; i <= totalLines; i++) {
                baseBgOffset += bgSize + (listRef.current.clientHeight - (window.innerWidth >= 1280 ? 140 : 100) - totalLines * bgSize) / (totalLines - 1);
                bgPosPattern += `, left top ${baseBgOffset}px`;
            }

            bgImgPattern = (_pattern + ', ').repeat(totalLines).slice(0, -2);
            bgSizePattern = (`100% ${bgSize}px` + ', ').repeat(totalLines).slice(0, -2);

            // positions, images and sizes of the trees background
            bgImgImage = ', ' + (_img + ', ').repeat(data.length > 4 ? Math.ceil(data.length / 2) * 2  : 4).slice(0, -2);
            
            if (data.length <= 4) {
                bgPosImg = `, right top, left -5% top ${baseCardHeight * v}px, center top ${450 * v}px, right 5% top ${300 * v}px`;
                bgSizeImg = `${imgSize}, ${imgSize}, ${bigImgSize}, ${imgSize}`;
            } else {
                for(let i = 1; i < data.length / 2 + 1; i++) {
                    if (i === 1) {
                        bgPosImg = `, right top ${baseImgOffset * v}px`;
                        bgSizeImg = `, ${imgSize}`;
                    } else if (i === Math.ceil(data.length / 2)) {
                        bgPosImg += `, center top ${baseImgOffset * v - (window.innerWidth >= 1280 ? 200 : 0)}px, left ${window.innerWidth >= 1280 ? '0' : '-5%'} top ${(baseImgOffset + (window.innerWidth >= 1280 ? 400 : 450)) * v}px, right 5% top ${(baseImgOffset + 300) * v}px`;    
                        bgSizeImg += `, ${bigImgSize}, ${imgSize}, ${imgSize}`;

                    } else {
                        bgPosImg += i % 2 ? `, center top ${(baseImgOffset * v - (window.innerHeight >= 1280 ? 140 : 100))}px, right top ${(baseImgOffset * v - (window.innerHeight >= 1280 ? 140 : 100))}px` :
                            `, left top ${(baseImgOffset * v - (window.innerHeight >= 1280 ? 140 : 100))}px, center top ${(baseImgOffset * v - (window.innerHeight >= 1280 ? 140 : 100))}px`;
                        bgSizeImg += i % 2 ? 
                            `, ${imgSize}, ${bigImgSize}` : 
                            `, ${bigImgSize}, ${imgSize}`;
                    }
                    baseImgOffset += baseCardHeight - 20;
                }
            }
        }
             
        listRef.current.style.backgroundSize =  bgSizePattern + bgSizeImg;
        listRef.current.style.backgroundRepeat = 'no-repeat';
        listRef.current.style.backgroundPosition = bgPosPattern + bgPosImg;
        listRef.current.style.backgroundImage = bgImgPattern + bgImgImage;
       
    }, [data.length, size]);

    return (
        <section className={`${s.housesList} container`} ref={listRef}>
            {children}
        </section>
    )
}