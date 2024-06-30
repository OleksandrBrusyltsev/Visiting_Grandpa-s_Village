import Image from 'next/image';
import { getLocale } from 'next-intl/server';

import Icon from '../ui/Icon/Icon';
import HouseItem from './HouseItem';
import HousesList from './HousesList';

import s from './Houses.module.scss';

type Props = {items: HouseItem[], children: React.ReactNode}



export default async function Houses({items, children}: Props) {
  const locale = await getLocale();

  return (
    <>
      <section className={`${s.hero} container`}>
        <div className={s.heroWrapper}>
          <p className={s.descr1}>Маю багато казкових будиночків та хатинок, можеш вибрати будь-який варіант на свій смак.</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */ }
          <p className={s.descr2}>"Гортай нижче - я тобі все покажу"</p>
          <div className={s.grandpa}>
            <Image 
              fill
              alt="Friendly Grandpa" 
              src="/images/grandpas/Grandpa2.png" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <Icon name="curve-houses" className={s.curve}/>
        </div>
      </section>
      <section className={s.map}>
        <div className={s.mapWrapper}>
          <Image 
            fill
            alt={locale === "en" ? "Map of Grandpa's houses" : "Карта еко садиби Дідуся"} 
            src="/images/backgrounds/illustration-map.png" 
            sizes="100vw"
          />
         
        </div>
        <div className={s.cloudBackground}>
          <Icon name="map-cloud" className={s.cloud}/>
        </div>
      </section>
    
      <div className={`${s.bookingForm} container`}>
          {children}
      </div>

      <main>
        <HousesList data={items}>
          <>
            <div className={s.housesTitle}>
              <h1>Живи тут</h1>
              <Icon name="ellipse" className={s.titleOutline} />
            </div>
            <div className={s.housesWrapper}>
              {items.map(house => (
                <HouseItem data={house} key={house.id}/>
              ))}
            </div>
          </>
        </HousesList>
      </main>
    </>
  )
}