import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Icon from "../../ui/Icon/Icon";
import IconEmail from "../../../assets/icons/icon-email.svg";
import Grandpa from "../../../../public/images/contacts/grandpa.png";
import IconMap from "../../../assets/icons/icon-map.svg";
import sFooter from "../../Footer/Footer.module.scss";
import s from "./ContactsList.module.scss";

const socialMediaLinks = [
  {
    id: 1,
    link: "https://www.facebook.com/ecousadba.in.ua/",
    icon: "facebook",
  },
  {
    id: 2,
    link: "https://t.me/VisitingGrandpasVillageBot",
    icon: "telegram",
  },
  {
    id: 3,
    link: "https://www.instagram.com/ecousadba.in.ua/",
    icon: "instagram",
  },
];

const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;

const ContactsList = () => {
  const grandpa = useRef<HTMLImageElement>(null);
  const contactsListWrapper = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const baseAnimation = gsap.context(() => {
      gsap.fromTo(
        grandpa.current,
        { x: "-300%" },
        {
          scrollTrigger: {
            trigger: grandpa.current,
            markers: true,
            start: "bottom 80%",
          },
          x: "0%",
          duration: 1,
          clearProps: "transform",
        }
      );
    });

    mm.add("(min-width: 450px)", () => {
      baseAnimation.revert(); // Удаляем базовую анимацию
      const anim450 = gsap.fromTo(
        grandpa.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: 1,
          clearProps: "transform",
        }
      );

      return () => {
        anim450.kill(); // Удаляем анимацию при изменении ширины экрана
      };
    });

    mm.add("(min-width: 1000px)", () => {
      const anim1000 = gsap.fromTo(
        grandpa.current,
        { y: "-200%", x: "0%" },
        {
          y: "0%",
          x: "0%",
          duration: 1,
          clearProps: "transform",
        }
      );

      return () => {
        anim1000.kill(); // Удаляем анимацию при изменении ширины экрана
      };
    });

    const contactsListAnimation = gsap.fromTo(
      contactsListWrapper.current,
      { x: "100%" },
      {
        scrollTrigger: {
          trigger: contactsListWrapper.current,
        },
        x: "0%",
        duration: 1,
        clearProps: "transform",
      }
    );

    mm.add("(min-width: 450px)", () => {
      contactsListAnimation.revert(); // Удаляем базовую анимацию
      const animContacts450 = gsap.fromTo(
        contactsListWrapper.current,
        { x: "100%" },
        {
          x: "0%",
          duration: 1,
          clearProps: "transform",
        }
      );

      return () => {
        animContacts450.kill(); // Удаляем анимацию при изменении ширины экрана
      };
    });

    return () => {
      mm.revert(); // Удаляем все media queries
    };
  });

  return (
    <div className={s.imgWrapper}>
      <Image className={s.grandpa} src={Grandpa} alt="picture" ref={grandpa} />
      <div className={s.contactsListWrapper} ref={contactsListWrapper}>
        <ul className={s.contactsList}>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>Телефон</p>
            <Link href={`tel:+380931919663`} className={s.contactItemText}>
              <Icon
                name="handset"
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              +38 (093) 191 96 63
            </Link>
          </li>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>E-mail</p>
            <Link
              href={`mailto:naseliudidusya@gmail.com`}
              className={s.contactItemText}
            >
              <Image
                src={IconEmail}
                alt="email"
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              naseliudidusya@gmail.com
            </Link>
          </li>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>Адреса</p>
            <Link href={mapUrl} target="_blank" className={s.contactItemText}>
              <Image
                src={IconMap}
                alt="map"
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              Україна, Чернігівська область, с. Олешня, вул. Першотравнева 5
            </Link>
          </li>
        </ul>
        <ul className={`${sFooter.socialMedia} ${s.socialMediaList}`}>
          {socialMediaLinks.map(({ link, icon, id }) => (
            <li key={id}>
              <Link href={link} target="_blank">
                <Icon name={icon} className={sFooter.socialMediaIcon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactsList;
