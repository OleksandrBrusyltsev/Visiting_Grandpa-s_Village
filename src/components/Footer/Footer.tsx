"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "../ui/Icon/Icon";
import s from "./Footer.module.scss";
import { navLink } from "./../../data/footer/data";
<<<<<<< HEAD

const image = "/images/logo.svg";
=======
import { useLocale } from "next-intl";

const image = "/images/logo-main.svg";
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01

const socialMediaLinks = [
  {
    id: 1,
    link: "https://www.facebook.com/ecousadba.in.ua/",
    icon: "facebook",
<<<<<<< HEAD
  },
  { id: 2, link: "https://t.me/VisitingGrandpasVillageBot", icon: "telegram" },
=======
    ariaLabel: "link to facebook",
  },
  {
    id: 2,
    link: "https://t.me/VisitingGrandpasVillage_Operator",
    icon: "telegram",
    ariaLabel: "link to telegram",
  },
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  {
    id: 3,
    link: "https://www.instagram.com/ecousadba.in.ua/",
    icon: "instagram",
<<<<<<< HEAD
=======
    ariaLabel: "link to instagram",
  },
  {
    id: 4,
    link: "https://www.linkedin.com/company/grandpa-s-village/",
    icon: "linkedin",
    ariaLabel: "link to linkedin",
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  },
];

export default function Footer() {
  const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;
<<<<<<< HEAD

=======
  const locale = useLocale();
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
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
<<<<<<< HEAD
            <Link href={link}>{label}</Link>
=======
            <Link href={`/${locale}/${link}`}>{label}</Link>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
          </li>
        ))}
      </ul>

      <div className={s.contacts}>
        <div className={s.contactsWrap}>
          <Icon name="map" className={s.contactsIcon} />
          <Link href={mapUrl} target="_blank" className={s.contactsText}>
<<<<<<< HEAD
            Україна, Чернігівська область, с. Олешня, вул. Першотравнева 5
=======
            Україна, Чернігівська область, с. Олешня, вул. Озерна 5
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
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
<<<<<<< HEAD
        {socialMediaLinks.map(({ link, icon, id }) => (
          <li key={id}>
            <Link href={link} target="_blank">
=======
        {socialMediaLinks.map(({ link, icon, id, ariaLabel }) => (
          <li key={id}>
            <Link href={link} target="_blank" aria-label={ariaLabel}>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
              <Icon name={icon} className={s.socialMediaIcon} />
            </Link>
          </li>
        ))}
      </ul>
<<<<<<< HEAD
      <p className={s.copyright}>© 2023 Еко-садиба “На селі у Дідуся”</p>
=======
      <div className={`${s.copyrightBox}`}>
        <p className={s.copyright}>© 2024 Еко-садиба “На селі у Дідуся”</p>
        <Link
          href={`/${locale}/booking/rules`}
          className={`${s.copyright} ${s.text}`}
        >
          Умови бронювання та правила перебування
        </Link>
      </div>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    </footer>
  );
}
