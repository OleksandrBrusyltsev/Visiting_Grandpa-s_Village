'use server';

export const getMeals = async (): Promise<MealsItem[]> => {
    const url = process.env.SERV_URL + '/api/v1/meal/?skip=0&limit=10';
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['meals'],
            },
            // cache: 'no-store',
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: [{ msg: 'Unknown error' }]};
            throw new Error(errorData.detail[0].msg);
        }

        const data = (await resp.json()) as unknown as MealsItem[];
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
