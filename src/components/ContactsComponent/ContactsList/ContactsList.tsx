import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../ui/Icon/Icon";
import IconEmail from "../../../assets/icons/icon-email.svg";
import Grandpa from "../../../../public/images/grandpas/Grandpa1.png";
import IconMap from "../../../assets/icons/icon-map.svg";
import IconTel from "../../../assets/icons/icon-tel.svg";
import sFooter from "../../Footer/Footer.module.scss";
import MarkdownPreview from "@/components/ui/MarkdownPreview/MarkdownPreview";
import { useLocale, useTranslations } from "next-intl";

import s from "./ContactsList.module.scss";


const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;

type ContactsListProps = {
  grandpaRef: React.RefObject<HTMLImageElement>;
  contactsListWrapperRef: React.RefObject<HTMLDivElement>;
  contactsList: Pick<ContactItem, "phone" | "email" | "address" | "instagram_link" | "facebook_link" | "telegram_link" | "linkedin_link">;
};

const ContactsList: FC<ContactsListProps> = ({
  grandpaRef,
  contactsListWrapperRef,
  contactsList: { phone, email, address, facebook_link, instagram_link, telegram_link, linkedin_link },
}) => {
  const t = useTranslations('Contacts');
  const locale = useLocale() as Language;

  const socialLinks = [
    {
      id: 1,
      link: facebook_link,
      icon: 'facebook',
      ariaLabel: 'link to facebook',
    },
    {
      id: 2,
      link: telegram_link,
      icon: 'telegram',
      ariaLabel: 'link to telegram',
    },
    {
      id: 3,
      link: instagram_link,
      icon: 'instagram',
      ariaLabel: 'link to instagram',
    },
    {
      id: 4,
      link: linkedin_link,
      icon: 'linkedin',
      ariaLabel: 'link to linkedin',
    },
  ];

  return (
    <div className={s.imgWrapper}>
      <Image className={s.grandpa} src={Grandpa} alt="" ref={grandpaRef} />
      <div className={s.contactsListWrapper} ref={contactsListWrapperRef}>
        <ul className={s.contactsList}>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>{t('phone')}</p>
            <Link href={`tel:${phone.replace(/[^+\d]/g, '')}`} className={s.contactItemText}>
              <Image
                src={IconTel}
                alt=""
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              {phone}
            </Link>
          </li>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>E-mail</p>
            <Link
              href={`mailto:${email}`}
              className={s.contactItemText}
            >
              <Image
                src={IconEmail}
                alt=""
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              {email}
            </Link>
          </li>
          <li className={s.contactsItem}>
            <p className={s.contactsItemTitle}>{t('address')}</p>
            <Link href={mapUrl} target="_blank" className={s.contactItemText}>
              <Image
                src={IconMap}
                alt=""
                className={`${sFooter.contactsIcon} ${s.contactItemIcon}`}
              />
              <div className={s.adressWrapper}>
                <MarkdownPreview
                  markdown={address[locale]}
                />
              </div>
            </Link>
          </li>
        </ul>
        <ul className={`${sFooter.socialMedia} ${s.socialMediaList}`}>
          {socialLinks.map(({ link, icon, id, ariaLabel }) => (
            <li key={id}>
              <Link href={link} target="_blank" aria-label={ariaLabel}>
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
