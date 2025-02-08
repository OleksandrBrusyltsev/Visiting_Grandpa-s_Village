'use server';

export const getContacts = async (): Promise<ContactItem> => {
    const url = process.env.SERV_URL + '/api/v1/contacts';
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['contacts'],
            },
            // cache: 'no-store',
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail:'Unknown error'};
            throw new Error(errorData.detail);
        }

        const data = (await resp.json()) as unknown as ContactItem;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
