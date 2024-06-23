"use client";
import { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import FAQ from "./FAQ/FAQ";
import RouteInfo from "./RouteInfo/RouteInfo";
import s from "./ContactsComponent.module.scss";

const ContactsComponent: FC = () => {
  const googleMapWrapper = useRef<HTMLDivElement>(null);
  const googleMap = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      googleMapWrapper.current,
      {
        y: "-100%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: googleMapWrapper.current,
          start: "bottom 80%",
        },
        y: "0%",
        opacity: 1,
        duration: 1,
        clearProps: "transform",
      }
    );
  });

  return (
    <>
      <div className={s.contactsContainer}>
        <TelegramBotLink />
        <ContactsList />
        <FAQ />
        <RouteInfo />
      </div>
      <div className={s.googleMapWrapper} ref={googleMapWrapper}>
        <iframe
          className={s.googleMap}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F%20%D0%9F%D0%B5%D1%80%D1%88%D0%BE%D1%82%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%B2%D0%B0,%205,%20%D0%9E%D0%BB%D0%B5%D1%88%D0%BD%D1%8F,%20%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,%2015030+(Grandpa's%20Village)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    </>
  );
};

export default ContactsComponent;
