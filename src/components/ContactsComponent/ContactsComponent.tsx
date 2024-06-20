"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import IconBack from "../../assets/icons/icon-back.svg";
import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import FAQ from "./FAQ/FAQ";
import RouteInfo from "./RouteInfo/RouteInfo";
import GoogleMap from "../../../public/images/contacts/google-map.jpg";
import s from "./ContactsComponent.module.scss";

const ContactsComponent: FC = () => {
  return (
    <>
      <div className={s.contactsContainer}>
        {/* <div className={s.navWrapper}>
          <div className={s.linkTextWrapper}>
            <span className={s.linkText}>Головна/</span>
            <span className={s.linkTextBold}>Знайти мене</span>
          </div>
          <Link href="/" className={s.backLink}>
            <Image src={IconBack} alt="back" className={s.backIcon} />
          </Link>
        </div> */}
        <TelegramBotLink />
        <ContactsList />
        <FAQ />
        <RouteInfo />
      </div>
      <section className={s.googleMapSection}>
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F%20%D0%9F%D0%B5%D1%80%D1%88%D0%BE%D1%82%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%B2%D0%B0,%205,%20%D0%9E%D0%BB%D0%B5%D1%88%D0%BD%D1%8F,%20%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,%2015030+(Grandpa's%20Village)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </section>
    </>
  );
};

export default ContactsComponent;
