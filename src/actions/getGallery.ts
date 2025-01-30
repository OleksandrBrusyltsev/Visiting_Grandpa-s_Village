'use server';

export const getGallery = async (slug?: string): Promise<GalleryItem[]> => {
    const url =
        process.env.SERV_URL + '/api/v1/photos' + (slug ? `/${slug}` : '/?skip=0&limit=100');
    try {
        const resp = await fetch(url, {
            next: {
                tags: ['gallery'],
            },
            // cache: 'no-store'
        });
        if (!resp.ok) {
            const errorData = (await resp.json()) ?? { detail: { msg: 'Unknown error' } };
            throw new Error(errorData.detail[0].msg);
        }
        const data = await resp.json();
        return slug ? [data] : data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
