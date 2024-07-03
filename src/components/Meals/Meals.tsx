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
import { ScrollTrigger } from 'gsap/all';

type Props = {items: MealsItem[]}
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
        .from(`.${s.heroCurve}`, {
            x: 200
        }, '>-0.5')
        .from([`.${s.callToEat}`], {
            duration: 0.5,
            x: -30,
            y: 10,
            scale: 0.9
        });

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
                    trigger: `.${sBlock.mealsBlockWrapper}:nth-of-type(1)`,
                    start: 'top 80%',
                }
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.mealsTitle}`, {
                x: -200,
                y: -100,
            }, "<").from(`.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.mainPhoto}`, {
                x: 200,
            }, "<").from([`.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.topPhoto}`,
                `.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.bottomPhoto}`
            ], {
                x: -200,
            }, "<").from(`.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.mealsDescription}`, {
                y: 100,
            }, "<");

            //small curve animation
            gsap.timeline({defaults: {
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: `.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.mealsCurve}`,
                    start: 'top 80%',
                }
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(1) .${sBlock.mealsCurve}`, {
                clipPath: "inset(0% 100% 0%  0%)"
            })
    
            gsap.timeline({defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: `.${sBlock.mealsBlockWrapper}:nth-of-type(2)`,
                    start: 'top 80%',
                }
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.mealsTitle}`, {
                y: -50
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.mealsDescription}`, {
                x: isMobile ? -200 : 200,
            }, "0.5").from(`.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.mainPhoto}`, {
                x: isNotMobile ? -200 : 200,
            }, "0.5").from([`.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.topPhoto}`,
                `.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.bottomPhoto}`
            ], {
                stagger: 0.3
            }, ">-0.5");

            //small curve animation
            gsap.timeline({defaults: {
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: `.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.mealsCurve}`,
                    start: 'top 80%',
                }
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(2) .${sBlock.mealsCurve}`, {
                clipPath: "inset(0% 0% 0% 100%)"
            });
            
            gsap.timeline({defaults: {
                autoAlpha: 0,
                ease: "power1.out",
                duration: 1
            },
                scrollTrigger: {
                    trigger: `.${sBlock.mealsBlockWrapper}:nth-of-type(3)`,
                    start: 'top 80%',
                }
            }).from(`.${sBlock.mealsBlockWrapper}:nth-of-type(3) .${sBlock.mealsTitle}`, {
                y: -50,
            })
            .from(`.${sBlock.mealsBlockWrapper}:nth-of-type(3) .${sBlock.mealsDescription}`, {
                y: -100,
            }, ">-0.7")
            .from(`.${sBlock.mealsBlockWrapper}:nth-of-type(3) .${sBlock.mainPhoto}`, {
                x: 200,
            }, ">-0.3").from([`.${sBlock.mealsBlockWrapper}:nth-of-type(3) .${sBlock.topPhoto}`,
                `.${sBlock.mealsBlockWrapper}:nth-of-type(3) .${sBlock.bottomPhoto}`
            ], {
                x: -200,
            }, "<")
        });
    });

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