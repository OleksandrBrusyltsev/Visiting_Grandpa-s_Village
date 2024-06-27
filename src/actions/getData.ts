"use server"
import {gallery} from '@/data/gallery/gallery.js'
import {houses} from '@/data/houses';
import {meals} from '@/data/meals';

export const getData = async <T>(url: string): Promise<T> => {
  // const resp = await fetch(url);
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();
  //   return data;
  // } catch (err) {
  //   console.error(err);
  // }
  
  // tmp fake data
  const data: {
    [key: string]: GalleryItem[] | HouseItem[] | MealsItem[];
  } = {
    gallery,
    houses,
    meals,
  }
  return new Promise(res => setTimeout(() => res(data[url] as T), 100));
}