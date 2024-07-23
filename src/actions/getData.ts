"use server"
import {gallery} from '@/data/gallery/gallery.js'
import {houses} from '@/data/houses';
import {meals} from '@/data/meals';
import {entertainments} from '@/data/entertainments';

export const getData = async <T>(url: string, slug?: string): Promise<T> => {
  // const resp = await fetch(url);
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();

  //type guards 
  function isGalleryItemArray(arr: any[]): arr is GalleryItem[] {
    return arr.length > 0 && 'title' in arr[0]; 
  }
  
  function isHouseItemArray(arr: any[]): arr is HouseItem[] {
    return arr.length > 0 && 'title' in arr[0]; 
  }
  
  // if (slug && (isGalleryItemArray(data[url]) || isHouseItemArray(data[url]))) {
  //   return data.filter(item => item.name === slug)
  // }
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
  };

  
  if (slug && (isGalleryItemArray(data[url]) || isHouseItemArray(data[url]))) {
    const result = data[url].filter(item => item.name === slug)
    return new Promise(res => setTimeout(() => res(result as T), 100));
  }

  return new Promise(res => setTimeout(() => res(data[url] as T), 100));
}