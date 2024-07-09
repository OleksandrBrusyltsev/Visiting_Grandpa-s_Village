"use client";
import { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import FAQ from "./FAQ/FAQ";
import RouteInfo from "./RouteInfo/RouteInfo";
import GoogleMap from "./GoogleMap/GoogleMap";
import s from "./ContactsComponent.module.scss";

const ContactsComponent: FC = () => {
  const googleMapWrapper = useRef<HTMLDivElement>(null);
 
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
        {/* <FAQ /> */}
        <RouteInfo />
      </div>
      <div className={s.googleMapWrapper} ref={googleMapWrapper}>
        <GoogleMap />
      </div>
    </>
  );
};

export default ContactsComponent;
