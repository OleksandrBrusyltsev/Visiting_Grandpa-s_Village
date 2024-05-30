"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import IconBack from "../../assets/icons/icon-back.svg";
import TelegramBotLink from "./TelegramBlock/TelegramBlock";
import ContactsList from "./ContactsList/ContactsList";
import s from "./ContactsComponent.module.scss";

const ContactsComponent:FC = () => {
    return (
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
        <ContactsList/>
      </div>
    );
};

export default ContactsComponent;
