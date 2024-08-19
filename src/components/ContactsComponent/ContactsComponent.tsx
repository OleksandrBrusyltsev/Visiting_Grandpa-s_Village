"use client";
import { FC, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import FAQ from "./FAQ/FAQ";
import RouteInfo from "./RouteInfo/RouteInfo";
import GoogleMap from "./GoogleMap/GoogleMap";
import s from "./ContactsComponent.module.scss";
import { ScrollTrigger } from "gsap/all";

const ContactsComponent: FC = () => {
  // Create refs for TelegramBlock elements
  const telegramTitle = useRef<HTMLHeadingElement>(null);
  const telegramText = useRef<HTMLParagraphElement>(null);
  const map = useRef<HTMLImageElement>(null);
  const telegramLinkWrapper = useRef<HTMLDivElement>(null);

  // Create refs for ContactsList elements
  const grandpa = useRef<HTMLImageElement>(null);
  const contactsListWrapper = useRef<HTMLDivElement>(null);

  // Create refs for FAQ elements
  const lake = useRef<HTMLImageElement>(null);
  const faqTitle = useRef<HTMLHeadingElement>(null);
  const faqWrapper = useRef<HTMLDivElement>(null);

  // Create refs for RouteInfo elements
  const house = useRef<HTMLImageElement>(null);
  const routeInfoWrapper = useRef<HTMLDivElement>(null);

  // Create refs for googleMapWrapper element
  const googleMapWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // TelegramBlock animations
    if(!telegramTitle.current || !telegramText.current || !map.current || !telegramLinkWrapper.current || !grandpa.current || !contactsListWrapper.current || !lake.current || !faqTitle.current || !faqWrapper.current || !house.current || !routeInfoWrapper.current || !googleMapWrapper.current) return
    gsap
      .timeline({
        defaults: {
          x: -200,
          opacity: 0,
          duration: 0.7,
        },
      })
      .from(telegramTitle.current, {})
      .from(telegramText.current, {}, ">-0.5")
      .from(
        map.current,
        {
          x: 200,
          opacity: 0,
          duration: 1,
        },
        0
      )
      .from(telegramLinkWrapper.current, {}, ">-0.5");

    // contactsList animation
    gsap
      .timeline({
        defaults: {
          duration: 0.5,
          opacity: 0,
          clearProps: "transform",
        },
        scrollTrigger: {
          trigger: contactsListWrapper.current,
          start: "top 80%",
        },
      })
      .from(grandpa.current, {
        scale: 0.9,
        y: -100,
        clearProps: "transform",
      })
      .from(contactsListWrapper.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        clearProps: "transform",
      });

    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 999px)",
        isNotMobile: "(min-width: 1000px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;

        if (isMobile) {
          // FAQ animation
          gsap.from(lake.current, {
            x: -200,
            opacity: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: lake.current,
              start: "top 80%",
            },
          });

          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 0.7,
              },
              scrollTrigger: {
                trigger: faqTitle.current,
                start: "top 80%",
              },
            })
            .from(faqTitle.current, { y: -100 })
            .from(
              faqWrapper.current,
              {
                y: -100,
              },
              ">-0.3"
            );
          ScrollTrigger.refresh(true);
        }

        if (isNotMobile) {
          // FAQ animation
          gsap
            .timeline({
              defaults: {
                opacity: 0,
                duration: 0.7,
              },
              scrollTrigger: {
                trigger: lake.current,
                start: "top 80%",
              },
            })
            .from(lake.current, { x: -200 })
            .from(
              faqTitle.current,
              {
                x: 200,
              },
              "<"
            )
            .from(
              faqWrapper.current,
              {
                x: 200,
              },
              ">-0.3"
            );
          ScrollTrigger.refresh(true);
        }
      }
    );

    // RouteInfo animation
    gsap.from(house.current, {
      x: 200,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: house.current,
        start: "top 80%",
      },
    });

    gsap.from(routeInfoWrapper.current, {
      x: -100,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: routeInfoWrapper.current,
        start: "top 80%",
      },
    });

    // GoogleMap animation
    gsap.from(googleMapWrapper.current, {
      y: 200,
      autoAlpha: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: googleMapWrapper.current,
        start: "top 80%",
      },
      clearProps: "transform",
    });
    ScrollTrigger.refresh(true);
  });

  return (
    <>
      <div className={`${s.contactsContainer} container`}>
        <TelegramBotLink
          telegramTitleRef={telegramTitle}
          telegramTextRef={telegramText}
          mapRef={map}
          telegramLinkWrapperRef={telegramLinkWrapper}
        />
        <ContactsList
          grandpaRef={grandpa}
          contactsListWrapperRef={contactsListWrapper}
        />
        <FAQ lakeRef={lake} faqTitleRef={faqTitle} faqWrapperRef={faqWrapper} />
        <RouteInfo houseRef={house} routeInfoWrapperRef={routeInfoWrapper} />
      </div>
      {/* <GoogleMap googleMapWrapperRef={googleMapWrapper} /> */}
    </>
  );
};

export default ContactsComponent;
