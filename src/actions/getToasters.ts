'use server';

export const getToasters = async (): Promise<AdvToaster[]> => {
    const url = process.env.SERV_URL + '/api/v1/toaster/?offset=0&limit=20';
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['toasters'],
            },
            // cache: 'no-store',
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: [{ msg: 'Unknown error' }]};
            throw new Error(errorData.detail[0].msg);
        }

        const data = (await resp.json()) as unknown as AdvToaster[];
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
