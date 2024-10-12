"use server";

import next from "next";

const url = process.env.SERV_URL;

export const getHouses = async (slug?: string): Promise<HouseItem[]> => {
    const url = process.env.SERV_URL + '/api/v1/houses' + (slug ? `/${slug}` : '/?skip=0&limit=100');
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['houses']
            }
        });
        if (!resp.ok) {
            const errorData = await resp.json();
            throw new Error(errorData.detail[0].msg);
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
