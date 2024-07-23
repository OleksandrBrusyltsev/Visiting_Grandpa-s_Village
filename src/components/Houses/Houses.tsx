'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import Icon from '../ui/Icon/Icon'
import HouseItem from './HouseItem'
import HousesList from './HousesList'

import s from './Houses.module.scss'

type Props = { items: HouseItem[]; children: React.ReactNode }

export default function Houses({ items, children }: Props) {
  const { locale } = useParams()
  const housesRef = useRef<Array<HTMLDivElement>>([])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px) and (max-width: 1279px)',
        isDesktop: '(min-width: 1280px)',
      },
      (context) => {
        const { isMobile, isTablet, isDesktop } =
          context.conditions as gsap.Conditions

        housesRef.current.forEach((h) => {
          gsap.set(h, { autoAlpha: 0 })
        })

        //booking component and houses list title animation
        const mainTimeline = gsap.timeline({
          defaults: {
            opacity: 0,
            duration: isMobile ? 0.7 : isTablet ? 0.8 : 1,
          },
          scrollTrigger: {
            trigger: `.${s.bookingForm}`,
            start: 'top 90%',
          },
        })

        //hero block animation
        if (isTablet) {
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                ease: 'power1.out',
                duration: 0.8,
                clearProps: 'all',
              },
            })
            .from(`.${s.descr1}`, {
              y: -100,
            })
            .from(
              [`.${s.descr2}`, `.${s.grandpa}`],
              {
                x: 200,
              },
              '<',
            )
            //curve + map animation
            .from(
              `.${s.curve}`,
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                opacity: 1,
              },
              '>-0.4',
            )
            .from(`.${s.map}`, {
              y: 200,
            })

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.bookingForm}`, {
              scale: 0.9,
            })
            .from(
              `.${s.housesTitle}`,
              {
                y: -50,
                duration: 0.8,
              },
              '>-0.8',
            )
        }

        //hero block animation
        if (isDesktop) {
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                ease: 'power1.out',
                duration: 1.2,
                clearProps: 'all',
              },
            })
            .from(`.${s.descr1}`, {
              y: -100,
              duration: 1,
            })
            .from(
              `.${s.map}`,
              {
                x: -300,
                y: 200,
              },
              '<',
            )
            .from(
              [`.${s.descr2}`, `.${s.grandpa}`],
              {
                x: 300,
              },
              '<',
            )

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.curve}`, {
              clipPath: 'inset(0% 0% 100% 0%)',
              opacity: 1,
            })
            .from(`.${s.bookingForm}`, {
              scale: 0.9,
              delay: 0.2,
            })
            .from(
              `.${s.housesTitle}`,
              {
                y: -50,
                duration: 0.8,
              },
              '>-0.8',
            )
        }

        //hero block animation + houses list animation
        if (isMobile) {
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                ease: 'power1.out',
                duration: 0.8,
                clearProps: 'all',
              },
            })
            .from(`.${s.descr1}`, {
              y: -150,
            })
            .from(
              `.${s.map}`,
              {
                x: -150,
                y: 150,
              },
              '<',
            )
            .from(
              [`.${s.descr2}`, `.${s.grandpa}`],
              {
                x: 150,
              },
              '<',
            )

          //booking component and houses list title animation
          mainTimeline
            .from(`.${s.bookingForm}`, {
              y: 100,
              scale: 0.9,
            })
            .from(`.${s.housesTitle}`, {
              y: 100,
            })

          housesRef.current.forEach((h, i) => {
            gsap.fromTo(
              h,
              {
                x: i % 2 ? 100 : -100,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power1.out',
                scrollTrigger: {
                  trigger: h,
                  start: 'top 80%',
                  end: 'bottom start',
                },
              },
            )
          })
        }

        //houses list animation
        if (isTablet || isDesktop) {
          ScrollTrigger.batch(housesRef.current, {
            batchMax: 2,
            onEnter: (batch) =>
              mainTimeline.fromTo(
                batch,
                {
                  x: (i) => (i % 2 ? 100 : -100),
                  autoAlpha: 0,
                },
                {
                  x: 0,
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: 'power1.out',
                },
              ),
            start: 'top 80%',
            end: 'bottom start',
            once: true,
          })
        }
      },
    )

    ScrollTrigger.refresh(true)
  })

  return (
    <div className={s.houses}>
      <section className={`${s.hero} container`}>
        <div className={s.heroWrapper}>
          <p className={s.descr1}>
            Маю багато казкових будиночків та хатинок, можеш вибрати будь-який
            варіант на свій смак.
          </p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className={s.descr2}>"Гортай нижче - я тобі все покажу"</p>
          <div className={s.grandpa}>
            <Image
              fill
              alt="Friendly Grandpa"
              src="/images/grandpas/Grandpa2.png"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <Icon name="curve-houses" className={s.curve} />
        </div>
      </section>
      <section className={s.map}>
        <div className={s.mapWrapper}>
          <Image
            fill
            alt={
              locale === 'en'
                ? "Map of Grandpa's houses"
                : 'Карта еко садиби Дідуся'
            }
            src="/images/backgrounds/illustration-map.png"
            sizes="100vw"
          />
        </div>
        <div className={s.cloudBackground}>
          <Icon name="map-cloud" className={s.cloud} />
        </div>
      </section>

      <div className={`${s.bookingForm} container`}>{children}</div>

      <main>
        <HousesList data={items}>
          <>
            <div className={s.housesTitle}>
              <h1>Живи тут</h1>
              <Icon name="ellipse" className={s.titleOutline} />
            </div>
            <div className={s.housesWrapper}>
              {items.map((house, i) => (
                <HouseItem
                  ref={(el: any) => (housesRef.current[i] = el)}
                  data={house}
                  key={house.id}
                />
              ))}
            </div>
          </>
        </HousesList>
      </main>
    </div>
  )
}
