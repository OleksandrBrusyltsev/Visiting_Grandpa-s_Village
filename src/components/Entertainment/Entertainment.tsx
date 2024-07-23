'use client'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import Quote from './Quote/Quote'

import s from './Entertainment.module.scss'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'

type Props = { items: EntertainmentItem[] }

export default function Entertainment({ items }: Props) {
  const aniRef = useRef<Array<Array<HTMLDivElement>>>([[]])

  useGSAP(() => {
    //hero block animation
    gsap
      .timeline({
        defaults: {
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.5,
        },
      })
      .from(`.${s.answer}`, {
        y: -100,
      })
      .from(
        `.${s.question}`,
        {
          y: -100,
        },
        '>-0.3',
      )
      .from(
        `.${s.heroTitle}`,
        {
          y: -100,
        },
        '>-0.3',
      )
      .from([`.${s.grandpaWrapper}`], {})

    const mm = gsap.matchMedia()
    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isNotMobile: '(min-width: 768px)',
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions
        //big curve animation
        gsap
          .timeline({
            defaults: {
              ease: 'power1.out',
            },
            scrollTrigger: {
              trigger: `.${s.backgroundCurve}`,
              start: 'top 70%',
              end: 'bottom 40%',
              once: true,
              scrub: isMobile ? 10 : 15,
            },
          })
          .from(`.${s.backgroundCurve}`, {
            clipPath: 'inset(0% 0% 100% 0%)',
          })
      },
    )

    //entertainment list animation
    aniRef.current.forEach((e, i) => {
      gsap
        .timeline({
          defaults: {
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          scrollTrigger: {
            trigger: e[0],
            start: 'top 90%',
          },
        })
        .from(e[0], {
          x: i % 2 ? 100 : -100,
        })
        .from(e[1], {})
        .from(
          e[2],
          {
            scale: 0.9,
            x: i % 2 ? -50 : 50,
            y: -50,
          },
          '>-0.5',
        )
        .from(
          e[3],
          {
            scale: 0.9,
            x: i % 2 ? 50 : -50,
            y: -50,
          },
          '>-0.5',
        )
    })
    ScrollTrigger.refresh(true)
  })

  return (
    <>
      <section className={`${s.hero} container`}>
        {/* <h1 className={s.heroTitle} suppressHydrationWarning> */}
        <h1 className={s.heroTitle}>
          <span className={s.firstPart}>
            Мистецтво Відпочинку&nbsp;- не&nbsp;завжди означає&nbsp;Дію,
          </span>{' '}
          навчись нічого не&nbsp;робити, а&nbsp;просто насолодись тишею
          та&nbsp;спокоєм.
        </h1>
        <p className={s.question}>Як саме?</p>
        <p className={s.answer}>Дідусь покаже тобі</p>
        <div className={s.grandpaWrapper}>
          <Image
            src={'/images/grandpas/Grandpa1.png'}
            alt={'Grandpa photo'}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>
      </section>
      <main className={`${s.main} container`}>
        <ul className={s.entertainmentList}>
          {items.map(({ images, text, ...props }, i) => (
            <li className={s.entertainmentGroup} key={i}>
              <Quote
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || []
                  aniRef.current[i][0] = el
                }}
                position={i % 2 ? 'right' : 'left'}
                {...props}
              >
                <div
                  className={s.quoteText}
                  ref={(el: HTMLDivElement) => {
                    aniRef.current[i] = aniRef.current[i] || []
                    aniRef.current[i][1] = el
                  }}
                >
                  {text}
                </div>
              </Quote>
              <div
                className={`${s.entertainmentImgWrapper} ${i % 2 ? s.left : s.right}`}
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || []
                  aniRef.current[i][2] = el
                }}
              >
                <Image src={images[0]} alt={props.title} fill />
              </div>
              <div
                className={`${s.entertainmentImgWrapper} ${i % 2 ? s.right : s.left}`}
                ref={(el: HTMLDivElement) => {
                  aniRef.current[i] = aniRef.current[i] || []
                  aniRef.current[i][3] = el
                }}
              >
                <Image src={images[1]} alt={props.title} fill />
              </div>
            </li>
          ))}
        </ul>
        <div className={s.treesWrapper}>
          <Image
            className={s.treesImage}
            src={'/images/backgrounds/christmasTrees.png'}
            alt={'Trees photo'}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
          />
        </div>
        <div className={s.backgroundCurve}></div>
      </main>
    </>
  )
}
