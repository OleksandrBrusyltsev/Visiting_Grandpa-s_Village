"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "../ui/Icon/Icon";
import s from "./Footer.module.scss";
import { navLink } from "./../../data/footer/data";

const image = "/images/logo.svg";

const socialMediaLinks = [
  {
    id: 1,
    link: "https://www.facebook.com/ecousadba.in.ua/",
    icon: "facebook",
  },
  { id: 2, link: "https://t.me/VisitingGrandpasVillageBot", icon: "telegram" },
  {
    id: 3,
    link: "https://www.instagram.com/ecousadba.in.ua/",
    icon: "instagram",
  },
];

export default function Footer() {
  const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;

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
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>

      <div className={s.contacts}>
        <div className={s.contactsWrap}>
          <Icon name="map" className={s.contactsIcon} />
          <Link href={mapUrl} target="_blank" className={s.contactsText}>
            Україна, Чернігівська область, с. Олешня, вул. Першотравнева 5
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
        {socialMediaLinks.map(({ link, icon, id }) => (
          <li key={id}>
            <Link href={link} target="_blank">
              <Icon name={icon} className={s.socialMediaIcon} />
            </Link>
          </li>
        ))}
      </ul>
      <p className={s.copyright}>© 2023 Еко-садиба “На селі у Дідуся”</p>
    </footer>
  );
}
