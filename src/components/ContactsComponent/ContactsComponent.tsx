"use client";
import { FC,  useEffect,  useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import FAQ from "./FAQ/FAQ";
import RouteInfo from "./RouteInfo/RouteInfo";
import GoogleMap from "./GoogleMap/GoogleMap";

import s from "./ContactsComponent.module.scss";

const ContactsComponent: FC<{contacts: ContactItem}> = ({contacts}) => {
  const contactsList = {
    phone: contacts.phone,
    email: contacts.email,
    address: contacts.address,
    facebook_link: contacts.facebook_link,
    instagram_link: contacts.instagram_link,
    telegram_link: contacts.telegram_link,
    linkedin_link: contacts.linkedin_link,
  };
  const faq = contacts.faq;
  const routeInfo = {
    directions_from_city: contacts.directions_from_city,
    transit_options: contacts.transit_options,
    route_change_notice: contacts.route_change_notice,
  }
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

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, []);

  useGSAP(() => {
    // TelegramBlock animations
    gsap 
      .timeline({
        defaults: {
          x: -200,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power1.out",
        },
      })
      .from(telegramTitle.current, {})
      .from(telegramText.current, {}, ">-0.5")
      .from(map.current, {x: 200, duration: 1}, 0)
      .from(telegramLinkWrapper.current, {}, ">-0.5");

    // contactsList animation
    gsap
      .timeline({
        defaults: {
          duration: 0.7,
          autoAlpha: 0,
          ease: "power1.out",
          clearProps: "transform",
        },
        scrollTrigger: {
          trigger: contactsListWrapper.current,
          start: "top 80%",
        },
      })
      .from(grandpa.current, {scale: 0.9,y: 100})
      .from(contactsListWrapper.current, {
        clipPath: "inset(0% 0% 100% 0%)",
      });
      
    // FAQ animation
    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 999px)",
        isNotMobile: "(min-width: 1000px)",
      },
      (context) => {
        const { isMobile, isNotMobile } = context.conditions as gsap.Conditions;

        if (isMobile) {
          gsap.from(lake.current, {
            x: -200,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out",
            scrollTrigger: {
              trigger: lake.current,
              start: "top 80%",
            },
          });

          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                duration: 0.7,
                ease: "power1.out"
              },
              scrollTrigger: {
                trigger: faqTitle.current,
                start: "top 80%",
              },
            })
            .from(faqTitle.current, { y: -100 })
            .from(faqWrapper.current, {y: -100}, ">-0.3");
        }

        if (isNotMobile) {
          gsap
            .timeline({
              defaults: {
                autoAlpha: 0,
                duration: 0.7,
                ease: "power1.out"
              },
              scrollTrigger: {
                trigger: lake.current,
                start: "top 80%",
              },
            })
            .from(lake.current, { x: -200 })
            .from(faqTitle.current, { x: 200 }, "<")
            .from(faqWrapper.current, { x: 200 }, ">-0.3");
        }
      }
    );

    // RouteInfo animation
    gsap.from(house.current, {
      x: 200,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power1.out",
      scrollTrigger: {
        trigger: house.current,
        start: "top 80%"
      },
    });

    gsap.from(routeInfoWrapper.current, {
      x: -100,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power1.out",
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
      ease: "power1.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: googleMapWrapper.current,
        start: "top 80%",
      },
    });
    
    ScrollTrigger.refresh();
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
          contactsList={contactsList}
        />
        <FAQ lakeRef={lake} faqTitleRef={faqTitle} faqWrapperRef={faqWrapper} faq={faq}/>
        <RouteInfo houseRef={house} routeInfoWrapperRef={routeInfoWrapper} routeInfo={routeInfo}/>
      </div>
      <GoogleMap googleMapWrapperRef={googleMapWrapper} />
    </>
  );
};

export default ContactsComponent;
