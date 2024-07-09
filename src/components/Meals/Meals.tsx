'use client';
import Image from 'next/image';
import { useContext } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Icon from '../ui/Icon/Icon';
import MealsBlock from './MealsBlock';
import { MatchMediaContext } from '@/context/MatchMediaContext';

import s from './Meals.module.scss';
import sBlock from './MealsBlock.module.scss';

type Props = {items: MealsItem[]}

const getSelector = (
    s1:string, 
    position:number, 
    s2?:string) => `.${s1}:nth-of-type(${position})${s2 ? ' .' + s2 : ''}`;

// selector creation helpers
const trigger = (n:number) => getSelector(sBlock.mealsBlockWrapper, n);
const title = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsTitle);
const descr = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsDescription);
const mPhoto = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.mainPhoto);
const tPhoto = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.topPhoto);
const bPhoto = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.bottomPhoto);
const curve = (n:number) => getSelector(sBlock.mealsBlockWrapper, n, sBlock.mealsCurve);
  
export default function Meals({items}: Props) {
    const {isMobile} = useContext(MatchMediaContext);

    useGSAP(() => {
        //hero block animation
        gsap.timeline({
        defaults: {
            autoAlpha: 0,
            ease: "power1.out",
            duration: 1,
        }
        })
        .from(`.${s.title}`, {
            y: -100,
        })
        .from(`.${s.heroImage}`, {
            x: -200
        }, '>-0.5')
        .from([`.${s.callToEat}`], {
            duration: 0.5,
            x: -30,
            y: 10,
            scale: 0.9
        }, '>-0.5');

        //meals blocks animation
        const mm = gsap.matchMedia();
        mm.add({
            isMobile: '(max-width: 767px)',
            isNotMobile: '(min-width: 768px)'
          }, (context) => {
            const {isMobile, isNotMobile} = context.conditions as gsap.Conditions;
            
            gsap.timeline({defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: `.${s.heroCurve}`,
                    start: isMobile ? 'top 70%' : 'top 40%',
                }
            })
            .from(`.${s.heroCurve}`, {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 100%)",
                duration: 0.5,
                delay: isMobile ? 1 : 0
            }).from(title(1), {
                x: -200,
                y: -100,
            }).from(mPhoto(1), {
                x: 200,
            }, "<").from([tPhoto(1), bPhoto(1)], {
                x: -200,
            }, "<").from(descr(1), {
                y: 100,
            }, "<");

            gsap.timeline({defaults: {
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: curve(1),
                    start: 'top 50%',
                }
            }).from(curve(1), {
                clipPath: "inset(0% 100% 0%  0%)",
                duration: 0.5
            }).from(title(2), {
                autoAlpha: 0,
                y: -50
            }).from(descr(2), {
                autoAlpha: 0,
                x: isMobile ? -200 : 200,
            }, ">-0.3").from(mPhoto(2), {
                autoAlpha: 0,
                x: isNotMobile ? -200 : 200,
            }, "<").from([tPhoto(2), bPhoto(2)], {
                autoAlpha: 0,
                stagger: 0.3
            });

            gsap.timeline({defaults: {
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: curve(2),
                    start: 'top 50%',
                }
            }).from(curve(2), {
                clipPath: "inset(0% 0% 0% 100%)",
                duration: 0.5
            }).from(title(3), {
                autoAlpha: 0,
                y: -50,
            })
            .from(descr(3), {
                autoAlpha: 0,
                y: -100,
            }, ">-0.7")
            .from(mPhoto(3), {
                autoAlpha: 0,
                x: 200,
            }, ">-0.3").from([tPhoto(3), bPhoto(3)], {
                autoAlpha: 0,
                x: -200,
            }, "<")
        });
    });

    return (
        <div className={`${s.mealsWrapper} container`}>
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