"use server"
import {houses} from '@/data/houses';

export const getHouses = async (): Promise<HouseItem[]> => {
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
  return new Promise(res => setTimeout(() => res(houses), 100));
}