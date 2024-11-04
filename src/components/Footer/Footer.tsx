"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import Icon from "../ui/Icon/Icon";
import MarkdownPreview from "@/functions/MarkdownPreview";

import s from "./Footer.module.scss";
import { navLinks } from "@/data/navigationMenu";
import { contacts } from "@/data/contacts";

const image_uk = "/images/logo-main-uk.svg";
const image_en = "/images/logo-main-en.svg";

export default function Footer() {
  const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("UI");

  const socialLinks = [
    {
      id: 1,
      link: contacts.facebook_link,
      icon: 'facebook',
      ariaLabel: 'link to facebook',
    },
    {
      id: 2,
      link: contacts.telegram_link,
      icon: 'telegram',
      ariaLabel: 'link to telegram',
    },
    {
      id: 3,
      link: contacts.instagram_link,
      icon: 'instagram',
      ariaLabel: 'link to instagram',
    },
    {
      id: 4,
      link: contacts.linkedin_link,
      icon: 'linkedin',
      ariaLabel: 'link to linkedin',
    },
  ];

  return (
    <footer className={s.footer}>
      {pathname === `/${locale}` ? (
        <Image
          title={t('currLink')}
          src={locale === "en" ? image_en : image_uk}
          alt="logo"
          width={144}
          height={80}
          className={s.logoLaptop}
        />
      ) : (
        <Link href={`/${locale}`}>
          <Image
              src={locale === "en" ? image_en : image_uk}
            alt="logo"
            width={144}
            height={80}
            className={s.logoLaptop}
          />
        </Link>
      )}

      <nav>
        <ul className={s.nav}>
          {navLinks.map(({ id, label, link }) => (
            <li key={id} className={s.navItem}>
              {pathname === `/${locale}/${link}` ? (
                <p title={t('currLink')}>{label[locale as keyof typeof label]}</p>
              ) : (
                <Link href={`/${locale}/${link}`}>{label[locale as keyof typeof label]}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.contacts}>
        <div className={s.contactsWrap}>
          <Icon name="map" className={s.contactsIcon} />
          <Link href={mapUrl} target="_blank" className={s.contactsText}>
            <MarkdownPreview
              markdown={contacts.address[locale as keyof typeof contacts.address]}
            />
          </Link>
        </div>
        <div className={s.contactsWrap}>
          <Icon name="handset" className={s.contactsIcon} />
          <Link href={`tel:${contacts.phone.replace(/[^+\d]/g, '')}`} className={s.contactsText}>
            {contacts.phone}
          </Link>
        </div>
      </div>

      <ul className={s.socialMedia}>
        {socialLinks.map(({ link, icon, id, ariaLabel }) => (
          <li key={id}>
            <Link href={link} target="_blank" aria-label={ariaLabel}>
              <Icon name={icon} className={s.socialMediaIcon} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={`${s.copyrightBox}`}>
        <p className={s.copyright}>{t('copyrights')}</p>
        <Link
          href={`/${locale}/booking/rules`}
          className={`${s.copyright} ${s.text}`}
        >
          {t('rules')}
        </Link>
      </div>
    </footer>
  );
}
