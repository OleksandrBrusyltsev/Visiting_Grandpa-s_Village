'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks';
import Icon from '../ui/Icon/Icon';
import s from './Footer.module.scss';

const image = '/images/logo.svg';

//Data will come from the backend
export const navLink = [
  {
    id: 1,
    label: 'Жити',
    link: './life',
  },
  {
    id: 2,
    label: 'Їсти',
    link: './',
  },
  {
    id: 3,
    label: 'Байдикувати',
    link: './',
  },
  {
    id: 4,
    label: 'Спогади',
    link: './',
  },
  {
    id: 5,
    label: 'Знайти мене ',
    link: './',
  },
];

const socialMediaLinks = [
  {
    id: 1,
    link: 'https://www.facebook.com/ecousadba.in.ua/',
    icon: 'facebook',
  },
  { id: 2, link: 'https://t.me/VisitingGrandpasVillageBot', icon: 'telegram' },
  {
    id: 3,
    link: 'https://www.instagram.com/ecousadba.in.ua/',
    icon: 'instagram',
  },
];

export default function Footer() {
  const { width } = useWindowSize();
  const [{ x, y }, scrollTo] = useWindowScroll();
  const mapUrl = `https://maps.app.goo.gl/EdWyVY665TkeUjQh8`;

  const handleClick = () => {
    scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={s.footer}>
      <button onClick={handleClick}>
        <Image
          src={image}
          alt='logo'
          width={width && width >= 481 ? 277 : 144}
          height={width && width >= 481 ? 135 : 80}
        />
      </button>

      {width && width >= 768 && (
        <ul className={s.nav}>
          {navLink.map(({ id, label, link }) => (
            <li
              key={id}
              className={s.navItem}>
              <Link href={link}>{label}</Link>
            </li>
          ))}
        </ul>
      )}

      <div className={s.contacts}>
        <div className={s.contactsWrap}>
          <Icon
            name='map'
            className={s.contactsIcon}
          />
          <Link
            href={mapUrl}
            target='_blank'
            className={s.contactsText}>
            Україна, Чернігівська область, с. Олешня, вул. Першотравнева 5
          </Link>
        </div>
        <div className={s.contactsWrap}>
          <Icon
            name='handset'
            className={s.contactsIcon}
          />
          <Link
            href={`tel:+380931919663`}
            className={s.contactsText}>
            +38 (093) 191 96 63
          </Link>
        </div>
      </div>

      <ul className={s.socialMedia}>
        {socialMediaLinks.map(({ link, icon, id }) => (
          <li key={id}>
            <Link
              href={link}
              target='_blank'>
              <Icon
                name={icon}
                className={s.socialMediaIcon}
              />
            </Link>
          </li>
        ))}
      </ul>
      <p className={s.copyright}>© 2023 Еко-садиба “На селі у Дідуся”</p>
    </footer>
  );
}
