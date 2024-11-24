"use server";

export const getHouses = async (slug?: string): Promise<HouseItem[]> => {
    const url = process.env.SERV_URL + '/api/v1/houses' + (slug ? `/${slug}` : '/?skip=0&limit=100');
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['houses'],
                

            },
            cache: 'no-store'
        });
        if (!resp.ok) {
            const errorData = await resp.json() ?? {detail: {msg: 'Unknown error'}};
            throw new Error(errorData.detail[0].msg);
        }
        const data = await resp.json();
        return slug ? [data] : data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
