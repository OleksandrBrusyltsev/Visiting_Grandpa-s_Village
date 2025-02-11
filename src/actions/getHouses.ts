'use server';

import { addHouseDecorData } from "@/functions/addHouseDecorData";

type QueryType = 'house_type' | 'is_available';

export const getHouses = async (
    houseId?: string, 
    query?: { 
        [key in QueryType]?: string;
    }
): Promise<HouseItem[]> => {
    const url =
        process.env.SERV_URL + '/api/v1/houses' + (houseId ? `/${houseId}` : '/?skip=0&limit=100&' + new URLSearchParams(query).toString());
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['houses'],
            },
            // cache: 'no-store'
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: [{ msg: 'Unknown error' }]};
            throw new Error(errorData.detail[0].msg);
        }
        const data = await resp.json();
        
        //добавляем отсутствующие в апишке данные (2 картинки-декоры и координаты домика на карте)
        const houses = addHouseDecorData(Array.isArray(data) ? data : [data]);
        return houses;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
