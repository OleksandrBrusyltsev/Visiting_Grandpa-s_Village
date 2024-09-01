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
    return arr.length > 0 && "cover" in arr[0];
  }

  function isHouseItemArray(arr: any[]): arr is HouseItem[] {
    return arr.length > 0 && "guests" in arr[0];
  }

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
    if (isGalleryItemArray(currentData) || isHouseItemArray(currentData)) {
      const result = currentData.filter((item) => item.name === slug);
      return Promise.resolve(result as T);
    }
  }
  return Promise.resolve(currentData as T);
};
