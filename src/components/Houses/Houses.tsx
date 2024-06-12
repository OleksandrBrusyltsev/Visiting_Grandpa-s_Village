import Image from 'next/image';
import { getLocale } from 'next-intl/server';

import {houses} from '@/data/houses';
import Icon from '../ui/Icon/Icon';
import HouseItem from './HouseItem';
import HousesList from './HousesList';

import s from './Houses.module.scss';

type Props = {children: React.ReactNode}

const getHouses = async (): Promise<HouseItem[]> => {
  // const resp = await fetch('http://someurl');
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();
  //   return data;
  // } catch (err) {
  //   console.error(err);
  // }
  return new Promise(res => setTimeout(() => res(houses), 1000));
}

export default async function Houses({children}: Props) {
  const data: HouseItem[] = await getHouses();
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
            // alt={locale === "en" ? "Map of Grandpa's houses" : "Карта еко садиби Дідуся"} 
            alt={"Карта еко садиби Дідуся"} 
            src="/images/backgrounds/illustration-map.png" 
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
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
        {/* <section className={`${s.housesList} container`}> */}
          <HousesList data={data}>
            <>
              <h1 className={s.housesTitle}>Живи тут</h1>
              <Icon name="ellipse" className={s.titleOutline} />
              <div className={s.housesWrapper}>
                {data.map(house => (
                  <HouseItem data={house} locale={locale} key={house.id}/>
                ))}
              </div>
            </>
          </HousesList>
        {/* </section> */}
      </main>
    </>
  )
}