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
import { start } from "repl";
import { BARREL_OPTIMIZATION_PREFIX } from "next/dist/shared/lib/constants";

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
    const mm = gsap.matchMedia();

    const commonAnimationProps = {
      duration: 1,
      clearProps: "transform",
    };

    const animateElement = (
      element: HTMLElement | null,
      fromVars: gsap.TweenVars,
      toVars: gsap.TweenVars
    ) => {
      if (element) {
        return gsap.fromTo(element, fromVars, {
          ...toVars,
          ...commonAnimationProps,
        });
      }
    };

    // TelegramBlock animations
    animateElement(telegramTitle.current, { x: "-100%" }, { x: "0%" });
    animateElement(telegramText.current, { x: "-100%" }, { x: "0%" });
    animateElement(map.current, { x: "100%" }, { x: "0%" });
    animateElement(telegramLinkWrapper.current, { x: "-100%" }, { x: "0%" });

    const grandpaBaseAnimation = animateElement(
      grandpa.current,
      { x: "-300%" },
      {
        scrollTrigger: {
          trigger: grandpa.current,
          start: "bottom 80%",
        },
        x: "0%",
      }
    );

    const contactsListBaseAnimation = animateElement(
      contactsListWrapper.current,
      { x: "100%" },
      {
        scrollTrigger: {
          trigger: contactsListWrapper.current,
        },
        x: "0%",
      }
    );

    mm.add("(min-width: 450px)", () => {
      if (grandpaBaseAnimation) grandpaBaseAnimation.kill();
      const grandpaAnimation450 = animateElement(
        grandpa.current,
        { x: "-100%" },
        { x: "0%" }
      );

      if (contactsListBaseAnimation) contactsListBaseAnimation.kill();
      const contactsListAnimation450 = animateElement(
        contactsListWrapper.current,
        { x: "100%" },
        { x: "0%" }
      );

      return () => {
        if (grandpaAnimation450) grandpaAnimation450.kill();
        if (contactsListAnimation450) contactsListAnimation450.kill();
      };
    });

    mm.add("(min-width: 1000px)", () => {
      const grandpaAnimation1000 = animateElement(
        grandpa.current,
        { y: "-200%", x: "0%" },
        { y: "0%", x: "0%" }
      );

      return () => {
        if (grandpaAnimation1000) grandpaAnimation1000.kill();
      };
    });

    animateElement(
      lake.current,
      { x: "-100%" },
      {
        scrollTrigger: {
          trigger: lake.current,
        },
        x: "0%",
      }
    );

    animateElement(
      faqTitle.current,
      { x: "100%" },
      {
        scrollTrigger: {
          trigger: faqTitle.current,
        },
        x: "0%",
      }
    );

    animateElement(
      faqWrapper.current,
      { x: "100%" },
      {
        scrollTrigger: {
          trigger: faqWrapper.current,
        },
        x: "0%",
      }
    );

    animateElement(
      house.current,
      { x: "100%" },
      {
        scrollTrigger: {
          trigger: house.current,
        },
        x: "0%",
      }
    );

    animateElement(
      routeInfoWrapper.current,
      { x: "-100%" },
      {
        scrollTrigger: {
          trigger: routeInfoWrapper.current,
          markers: true,
        },
        x: "0%",
      }
    );

    animateElement(
      googleMapWrapper.current,
      { y: "-100%", opacity: 0 },
      {
        scrollTrigger: {
          trigger: googleMapWrapper.current,
          start: "bottom 80%",
        },
        y: "0%",
        opacity: 1,
      }
    );

    return () => {
      mm.revert();
    };
  });

  return (
    <>
      <div className={s.contactsContainer}>
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
      <div className={s.googleMapWrapper} ref={googleMapWrapper}>
        <GoogleMap />
      </div>
    </>
  );
};

export default ContactsComponent;
