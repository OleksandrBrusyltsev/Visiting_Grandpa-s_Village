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
        <div className={s.navWrapper}>
          <div className={s.linkTextWrapper}>
            <span className={s.linkText}>Головна/</span>
            <span className={s.linkTextBold}>Знайди мене</span>
          </div>
          <Link href="/" className={s.backLink}>
            <Image src={IconBack} alt="back" className={s.backIcon} />
          </Link>
        </div>
        <TelegramBotLink />
        <ContactsList />
        <FAQ />
        <RouteInfo/>
      </div>
      <Link href="https://www.google.com/maps/place/%D0%9D%D0%B0+%D1%81%D0%B5%D0%BB%D1%96+%D1%83+%D0%94%D1%96%D0%B4%D1%83%D1%81%D1%8F/@51.9628026,31.1596513,17z/data=!3m1!4b1!4m9!3m8!1s0x46d502a972adef5f:0xd2021628aff7a3c7!5m2!4m1!1i2!8m2!3d51.9628026!4d31.1622262!16s%2Fg%2F11g8ph1fsl?authuser=0&entry=ttu">
        <Image className={s.googleMap} src={GoogleMap} alt="google-map" />
      </Link>
    </>
  );
};

export default ContactsComponent;
