'use client';
import Image from 'next/image';

import Icon from '../ui/Icon/Icon';
import MealsBlock from './MealsBlock';

import s from './Meals.module.scss';
import { MatchMediaContext } from '@/context/MatchMediaContext';
import { useContext } from 'react';

type Props = {items: MealsItem[]}
export default function Meals({items}: Props) {
    const {isMobile} = useContext(MatchMediaContext);
    return (
        <div className={s.mealsWrapper}>
            <div className={s.heroWrapper}>
                <h1 className={s.title}>Нарешті, моє улюблене -&nbsp;Їжа. Поїмо ?</h1>
                <div className={s.heroImage}>
                    <Image src={"/images/meals/dog.png"} fill alt={'grandpa prays before eating'} />
                    <div className={s.callToEatWrapper}>
                        <p className={s.callToEat}>давай вже<br/>скоріш їсти </p>
                        <Icon name="meals-outline" className={s.callToEatOutline} />
                    </div>
                </div>
                <Icon name={isMobile ? "curve-meals-375" : "curve-meals-768"} className={s.heroCurve}/>
            </div>
            <main className={s.main}>
                {
                    items.map((item, i) => <MealsBlock item={item} key={item.id} position={i}/>)
                }
            </main>
        </div>
    )
}