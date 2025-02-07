'use server';

import { addHouseDecorData } from "@/functions/addHouseDecorData";

export const getHouses = async (slug?: string): Promise<HouseItem[]> => {
    const url =
        process.env.SERV_URL + '/api/v1/houses' + (slug ? `/${slug}` : '/?skip=0&limit=100');
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['houses'],
            },
            // cache: 'no-store'
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: { msg: 'Unknown error' } };
            throw new Error(errorData.detail[0].msg);
        }
        const data = await resp.json();
        
        //добавляем отсутствующие в апишке данные (2 картинки-декоры и координаты домика на карте)
        const houses = addHouseDecorData(data);
        return houses;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
