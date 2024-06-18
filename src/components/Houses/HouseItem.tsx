'use client';
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import Icon from '../ui/Icon/Icon';
import Button from '../ui/Button/Button';

import s from './HouseItem.module.scss';

type Props = {data: HouseItem};

const FavoriteIcon  = ({className}: {className: string}) => {
    return (
        <svg className={className} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C11 19 1 15.14 1 6.5C1 5.04131 1.57939 3.64241 2.61084 2.61096C3.64229 1.57951 5.04131 1 6.5 1C7.384 0.999705 8.25474 1.21323 9.03833 1.62244C9.82192 2.03164 10.4951 2.62436 11 3.34998C11.5055 2.62497 12.1785 2.03279 12.9619 1.62366C13.7454 1.21452 14.6162 1.00055 15.5 1C16.9587 1 18.3575 1.57951 19.3889 2.61096C20.4204 3.64241 21 5.04131 21 6.5C21 15.14 11 19 11 19Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
    )

}
export default function HouseItem({data}: Props) {
    const locale = useLocale();
    const path = usePathname();
    const pathName = path.split('/')[2];
    const {push} = useRouter();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const {name, photo, max_adults, max_children, rental_price} = data;
    const title = data.title.filter(item => item.language === locale)[0].text;
    
    const guestsString = () => {
        if(max_children) return `${max_adults}+${max_children} гостей`
        switch(!!rental_price) {
            case max_adults === 1: return `${max_adults} гість`
            case max_adults < 5: return `${max_adults} гостя`
            default: return `${max_adults} гостей`
        }
    }

    return (
        <div className={s.houseWrapper} >
            <div className={s.imageWrapper} onClick={() => push(`/${locale}/${pathName}/${name}`)}>
                <Image
                    fill
                    src={photo[0]}
                    alt={title || 'house-photo'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
            </div>
            <div className={s.content} onClick={() => push(`/${locale}/${pathName}/${name}`)}>
                <div className={s.titleWrapper}>
                    <Icon name="house" className={s.houseIcon}/>
                    <h3 className={s.title}>{title}</h3>
                </div>
                <div className={s.priceWrapper}>
                    {!!rental_price ? 
                        <>
                            <Icon name="pocket" className={s.pocketIcon}/>
                            <span className={s.price}>{rental_price} грн/ніч</span>
                        </> : 
                        null 
                    }
                </div>
                <div className={s.guestsWrapper}>
                    {!!rental_price ? (
                        <>
                            <Icon name="guests" className={s.guestsIcon}/>
                            <span className={s.guests}>{guestsString()}</span>
                        </>
                    ) : <span className={s.guests}>Кількість номерів: 4</span>}
                    
                </div>
                <div className={s.servicesWrapper}>
                    <Icon name="bath" className={s.servicesIcon}/>
                    <Icon name="tv" className={s.servicesIcon}/>
                    <Icon name="parking" className={s.servicesIcon}/>
                    <Icon name="kitchen" className={s.servicesIcon}/>
                </div>
                <div className={s.btnWrapper}>
                    <Button 
                        label={!!rental_price ? 'Завітати' : 'Дивитись'} 
                        className={''} 
                        onClick={() => push(`/${locale}/${pathName}/${name}`)} 
                        type='button'/>
                </div>
            </div>
            <button className={s.favoriteWrapper} onClick={() => setIsFavorite(!isFavorite)}>
                <FavoriteIcon className={`${s.favoriteIcon} ${isFavorite ? s.isFavorite : ''}`}/>
            </button>
        </div>
    )
}