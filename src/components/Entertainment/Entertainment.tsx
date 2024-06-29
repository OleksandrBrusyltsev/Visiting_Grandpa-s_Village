import Image from 'next/image';

import Quote from './Quote/Quote';

import s from './Entertainment.module.scss';

type Props = {}

const images = [
    {
        src: '/images/entertainment/1.png',
        alt: 'купайся'
    },
    {
        src: '/images/entertainment/2.png',
        alt: 'купайся'
    },
    {
        src: '/images/entertainment/3.png',
        alt: 'збирай спогади'
    },
    {
        src: '/images/entertainment/4.png',
        alt: 'збирай спогади'
    },
    {
        src: '/images/entertainment/5.png',
        alt: 'радій'
    },
    {
        src: '/images/entertainment/6.png',
        alt: 'радій'
    },
    {
        src: '/images/entertainment/7.png',
        alt: 'відчуй атмосферу'
    },
    {
        src: '/images/entertainment/8.png',
        alt: 'відчуй атмосферу'
    },
    {
        src: '/images/entertainment/9.png',
        alt: 'будь разом'
    },
    {
        src: '/images/entertainment/10.png',
        alt: 'будь разом'
    },
    {
        src: '/images/entertainment/11.png',
        alt: 'просто живи'
    },
    {
        src: '/images/entertainment/12.png',
        alt: 'просто живи'
    },
];

const quotes = [
    {
        title: 'купайся',
        text: '“Вода сповільнює час - віддай думки хвилям та насолодись купанням.”'
    },
    {
        title: 'збирай спогади',
        text: '“Збирай спогади, як миті щастя, створюючи неповторний пазл свого життя.”'
    },
    {
        title: 'радій',
        text: '“Сміх та радість - найкращі ліки для душі, які зцілюють, наповнюючи серце теплом та світлом”'
    },
    {
        title: 'відчуй атмосферу',
        text: '“Поринаючи в атмосферу, відчуваєш, як час сповільнюється, а кожен момент стає особливим.”'
    },
    {
        title: 'будь разом',
        text: '“Взаємодія - безцінний досвід, що дарує сенс, завжди подвоюючи щастя.”'
    },
    {
        title: 'просто живи',
        text: '“Не шукай важких відповідей, просто насолоджуйся простотою щасливих моментів.”'
    }
];

export default function Entertainment({}: Props) {
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
                {quotes.map((props, i) => (
                    <li className={s.entertainmentGroup} key={i}>
                        <Quote position={(i+1) % 2 ? "left" : "right"} {...props}/>
                        <div className={`${s.entertainmentImgWrapper} ${(i+1) % 2 ? s.right : s.left}`}>
                            <Image src={images[2 * i].src} alt={images[2 * i].alt} fill />
                        </div>
                        <div className={`${s.entertainmentImgWrapper} ${(i+1) % 2 ? s.left : s.right}`}>
                            <Image src={images[2 * i + 1].src} alt={images[2 * i + 1].alt} fill />
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