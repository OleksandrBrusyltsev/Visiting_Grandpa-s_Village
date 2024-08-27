import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../ui/Icon/Icon";
import IconEmail from "../../../assets/icons/icon-email.svg";
import Grandpa from "../../../../public/images/grandpas/Grandpa1.png";
import IconMap from "../../../assets/icons/icon-map.svg";
import IconTel from "../../../assets/icons/icon-tel.svg";
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
  {
    id: 4,
    link: "https://www.linkedin.com/company/grandpa-s-village/",
    icon: "linkedin",
    ariaLabel: "link to linkedin",
  },
];

const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;

type ContactsListProps = {
  grandpaRef: React.RefObject<HTMLImageElement>;
  contactsListWrapperRef: React.RefObject<HTMLDivElement>;
};

const ContactsList: FC<ContactsListProps> = ({
  grandpaRef,
  contactsListWrapperRef,
}) => {
  return (
    <div className={s.imgWrapper}>
      <Image
        className={s.grandpa}
        src={Grandpa}
        alt="picture"
        ref={grandpaRef}
      />
      <div className={s.contactsListWrapper} ref={contactsListWrapperRef}>
        <ul className={s.contactsList}>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>Телефон</p>
            <Link href={`tel:+380931919663`} className={s.contactItemText}>
              <Image
                src= {IconTel}
                alt="handset"
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              + 38 (093) 191 96 63
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
              <div className={s.adressWrapper}>
                <p>Україна, Чернігівська область, с. Олешня,</p>{' '}
                <p>вул. Озерна 5</p>
              </div>
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
