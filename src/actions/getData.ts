"use server";
import { gallery } from "@/data/gallery/gallery.js";
import { houses } from "@/data/houses";
import { meals } from "@/data/meals";
import { entertainments } from "@/data/entertainments";

export const getData = async <T>(url: string, slug?: string): Promise<T> => {
  // const resp = await fetch(url);
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();

  //type guards
  function isGalleryItemArray(arr: any[]): arr is GalleryItem[] {
    return arr.length > 0 && "name" in arr[0];
  }

  function isHouseItemArray(arr: any[]): arr is HouseItem[] {
    return arr.length > 0 && "name" in arr[0];
  }

  // if (slug && (isGalleryItemArray(resp) || isHouseItemArray(resp))) {
  //   return data.filter(item => item.name === slug)
  // }
  //   return data;
  // } catch (err) {
  //   console.error(err);
  // }

  // tmp fake data
  const data: {
    [key: string]:
      | GalleryItem[]
      | HouseItem[]
      | MealsItem[]
      | EntertainmentItem[];
  } = {
    gallery,
    houses: houses as HouseItem[],
    meals,
    entertainments,
  };

  const currentData = data[url];
  
  if (slug) {
    if (isGalleryItemArray(currentData)) {
      const result = currentData.filter((item) => item.name === slug);
      return new Promise((res) => res(result as T));
    }

    if (isHouseItemArray(currentData)) {
      const result = currentData.filter((item) => item.name === slug);
      return new Promise((res) => res(result as T));
    }
  }
  return new Promise((res) => res(currentData as T));
};
