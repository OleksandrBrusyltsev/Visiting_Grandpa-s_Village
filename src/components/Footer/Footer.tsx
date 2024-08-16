"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "../ui/Icon/Icon";
import s from "./Footer.module.scss";
import { navLink } from "./../../data/footer/data";
import { useLocale } from "next-intl";

const image = "/images/logo-main.svg";

const socialMediaLinks = [
  {
    id: 1,
    link: "https://www.facebook.com/ecousadba.in.ua/",
    icon: "facebook",
    ariaLabel: "link to facebook",
  },
  {
    id: 2,
    link: "https://t.me/VisitingGrandpasVillage_Operator",
    icon: "telegram",
    ariaLabel: "link to telegram",
  },
  {
    id: 3,
    link: "https://www.instagram.com/ecousadba.in.ua/",
    icon: "instagram",
    ariaLabel: "link to instagram",
  },
  {
    id: 4,
    link: "https://www.linkedin.com/company/grandpa-s-village/",
    icon: "linkedin",
    ariaLabel: "link to linkedin",
  },
];

export default function Footer() {
  const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;
  const locale = useLocale();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={s.footer}>
      <button onClick={scrollToTop}>
        <Image
          src={image}
          alt="logo"
          width={144}
          height={80}
          className={s.logoLaptop}
        />
      </button>

      <ul className={s.nav}>
        {navLink.map(({ id, label, link }) => (
          <li key={id} className={s.navItem}>
            <Link href={`/${locale}/${link}`}>{label}</Link>
          </li>
        ))}
      </ul>

      <div className={s.contacts}>
        <div className={s.contactsWrap}>
          <Icon name="map" className={s.contactsIcon} />
          <Link href={mapUrl} target="_blank" className={s.contactsText}>
            Україна, Чернігівська область, с. Олешня, вул. Озерна 5
          </Link>
        </div>
        <div className={s.contactsWrap}>
          <Icon name="handset" className={s.contactsIcon} />
          <Link href={`tel:+380931919663`} className={s.contactsText}>
            +38 (093) 191 96 63
          </Link>
        </div>
      </div>

      <ul className={s.socialMedia}>
        {socialMediaLinks.map(({ link, icon, id, ariaLabel }) => (
          <li key={id}>
            <Link href={link} target="_blank" aria-label={ariaLabel}>
              <Icon name={icon} className={s.socialMediaIcon} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={`${s.copyrightBox}`}>
        <p className={s.copyright}>© 2024 Еко-садиба “На селі у Дідуся”</p>
        <Link
          href={`/${locale}/booking/rules`}
          className={`${s.copyright} ${s.text}`}
        >
          Умови бронювання та правила перебування
        </Link>
      </div>
    </footer>
  );
}
