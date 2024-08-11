"use client";
import Image from "next/image"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import GalleryItem from "./GalleryItem";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";

import s from "./Gallery.module.scss";

type Props = {items: GalleryItem[]}

export default function Gallery({items}: Props) {
  const {locale} = useParams();
  const galleryRef = useRef<Array<HTMLDivElement>>([]);

  useGSAP(() => {

    //hero block animation
    gsap.timeline({
      defaults: {
        opacity: 0,
        ease: "power1.out",
        duration: 1,
      }
    })
    .from(`.${s.descr1}`, {
      x: -200,
    })
    .from(`.${s.grandpa}`, {
      x: 200,
    }, ">-0.7")
    .from(`.${s.descr2}`, {
      x: -200,
    }, ">-0.7")
    .from(`.${s.callToClick}`, {
      scale: 0.9,
    }, ">-0.3")
    .from(`.${s.backgroundCurve}`, {
      scale: 0.9,
      duration: 1
    }, ">-0.5");

    //gallery list animation
    const mm = gsap.matchMedia();
    mm.add({
      isMobile: '(max-width: 767px)',
      isNotMobile: '(min-width: 768px)'
    }, (context) => {
      const {isMobile, isNotMobile} = context.conditions as gsap.Conditions;
      galleryRef.current.forEach(h => {
        gsap.set(h, {autoAlpha: 0});
      });
      if(isMobile) {
        galleryRef.current.forEach((g, i) => {
            gsap.fromTo(g, {
              x: i%2 ? 100 : -100,
              autoAlpha: 0, 
            }, {
              x: 0,
              autoAlpha: 1,
              duration: 0.8,
              delay: 0.3,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: g,
                start: 'top 90%',
              }
            })
          })
      }
      if(isNotMobile) {
        ScrollTrigger.batch(galleryRef.current, {
          batchMax: 2,   
          onEnter: batch => gsap.fromTo(batch, {
            x: i => i%2 ? 100 : -100,
            autoAlpha: 0, 
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: 0.3,
            ease: 'power1.out'
          }),
          start: 'top 90%',
          once: true
        });
      }
    });
    ScrollTrigger.refresh(true);
  });
  
  return (
    <div className='container'>
        <div className={s.backgroundImages}>
          <section className={s.hero}>
            <div className={s.heroWrapper}>
              <p className={s.descr1}>
                Люблю згадувати всі щасливі моменти,{" "}
                <span className={s.noBreak}>що відбулись</span>{" "}
                <span className={s.noBreak}>“На Селі у Дідуся”</span>
              </p>
              <p className={s.descr2}>Згадаєш зі мною?</p>
              <div className={s.grandpa}>
                <Image
                  fill
                  alt="Friendly Grandpa"
                  src="/images/grandpas/Grandpa1.png"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>
          <main className={s.main}>
            <section className={s.memoriesGallery}>
              <h1 className={s.callToClick}>
                <span className={s.desktopOnly}>Клікай</span>
                <span className={s.mobileOnly}>Натискай</span> на фото, щоб
                подивитись більше
              </h1>
              <div className={s.galleryWrapper}>
                {items.map((item, i) => (
                  <GalleryItem 
                    ref={(el: HTMLDivElement) => galleryRef.current[i] = el} 
                    data={item} 
                    key={i}/>)
                  )
                }
              </div>
              <div className={s.backgroundCurve}></div>
            </section>
            <div className={s.callToAction}>
              <div className={s.cloud}>
                <Icon name="cloud" />
              </div>
              <p className={s.slogan}>
                А далі створимо нові щасливі спогади разом.
              </p>
              <Link href={`/${locale}/booking`}>
                <Button
                  label="Завітати"
                  type={"button"}
                  className={s.btnCallToAction}
                />
              </Link>
            </div>
          </main>
        </div>
    </div>
  );
}
