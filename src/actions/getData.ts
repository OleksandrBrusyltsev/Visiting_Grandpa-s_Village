"use server"
import {gallery} from '@/data/gallery/gallery.js'
import {houses} from '@/data/houses';
import {meals} from '@/data/meals';
import {entertainments} from '@/data/entertainments';

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
    [key: string]: GalleryItem[] | HouseItem[] | MealsItem[] | EntertainmentItem[];
  } = {
    gallery,
    houses,
    meals,
    entertainments
  }
  return new Promise(res => setTimeout(() => res(data[url] as T), 100));
}