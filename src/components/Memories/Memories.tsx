import Image from "next/image"
import {gallery} from '@/data/gallery/gallery.js'
import s from './Memories.module.scss';
import GalleryItem from "./GalleryItem";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";

type Props = {}
const getMemories = async (): Promise<GalleryItem[]> => {
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
  return new Promise(res => setTimeout(() => res(gallery), 1000));
}
export default async function Memories({}: Props) {
  const data: GalleryItem[] = await getMemories();
  return (
    <div className={s.backgroundImages}>
      <section className={s.hero}>
        <div className={s.heroWrapper}>
          <p className={s.descr1}>Люблю згадувати всі щасливі моменти, <span className={s.noBreak}>що відбулись</span> <span className={s.noBreak}>“На Селі у Дудуся”</span></p>
          <p className={s.descr2}>Згадаєш зі мною?</p>
          <div className={s.grandpa}>
            <Image 
              fill
              alt="Friendly Grandpa" 
              src="/images/memories/Grandpa1.png" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <main className={s.main}>
        <section className={s.memoriesGallery}>
          <h1 className={s.callToClick}><span className={s.desktopOnly}>Клікай</span><span className={s.mobileOnly}>Натискай</span> на фото, щоб подивитись більше</h1>
          <div className={s.galleryWrapper}>
            {data.map((item, i) => (<GalleryItem data={item} key={i}/>))}
          </div>
        </section>
        <div className={s.callToAction}>
          <div className={s.cloud}>
            <Icon name="cloud" />
          </div>
          <p className={s.slogan}>А далі створимо нові щасливі спогади разом.</p>
          <Button 
            label="Завітати"
            type={"button"}
            className={s.btnCallToAction}
          />
        </div>
      </main>
    </div>
  )
}