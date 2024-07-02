import Image from 'next/image';

import Quote from './Quote/Quote';

import s from './Entertainment.module.scss';

type Props = {items: EntertainmentItem[]}

export default function Entertainment({items}: Props) {
  return (
    <>
        <section className={s.hero}>
            {/* <h1 className={s.heroTitle} suppressHydrationWarning> */}
            <h1 className={s.heroTitle} >
                <span className={s.firstPart}>Мистецтво Відпочинку&nbsp;- не&nbsp;завжди означає&nbsp;Дію,</span> навчись нічого не&nbsp;робити, а&nbsp;просто насолодись тишею та&nbsp;спокоєм.
            </h1>
            <p className={s.question}>Як саме?</p>
            <p className={s.answer}>Дідусь покаже тобі</p>
            <div className={s.grandpaWrapper}>
                <Image 
                    src={'/images/grandpas/Grandpa1.png'} 
                    alt={'Grandpa photo'} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fill/>
            </div>
        </section>
        <main className={s.main}>
            <ul className={s.entertainmentList}>
                {items.map(({images, ...props}, i) => (
                    <li className={s.entertainmentGroup} key={i}>
                        <Quote position={(i+1) % 2 ? "left" : "right"} {...props}/>
                        <div className={`${s.entertainmentImgWrapper} ${(i+1) % 2 ? s.right : s.left}`}>
                            <Image src={images[0]} alt={props.title} fill />
                        </div>
                        <div className={`${s.entertainmentImgWrapper} ${(i+1) % 2 ? s.left : s.right}`}>
                            <Image src={images[1]} alt={props.title} fill />
                        </div>
                    </li>
                    )
                )}
            </ul>
            <div className={s.treesWrapper}>
                <Image 
                    className={s.treesImage} 
                    src={'/images/backgrounds/christmasTrees.png'} 
                    alt={'Trees photo'} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fill/>
            </div>
            <div className={s.backgroundCurve}></div>
        </main>
    </>
  )
}