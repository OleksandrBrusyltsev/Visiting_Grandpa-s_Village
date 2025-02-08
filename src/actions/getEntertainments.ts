'use server';

export const getEntertainments = async (): Promise<EntertainmentItem[]> => {
    const url = process.env.SERV_URL + '/api/v1/entertainment/?skip=0&limit=10';
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['entertainments'],
            },
            // cache: 'no-store',
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: [{ msg: 'Unknown error' }]};
            throw new Error(errorData.detail[0].msg);
        }

        const data = (await resp.json()) as unknown as EntertainmentItem[];
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
