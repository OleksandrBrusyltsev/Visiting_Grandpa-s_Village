import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import getCloudinaryUrl from '@/actions/admin/getCloudinaryUrl';
import { verifySession } from '@/functions/dal';
import { combineProperty, getPhotos } from '@/functions/routeHandlersHelpers';

const url = process.env.SERV_URL;

export async function POST(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const form = await request.formData();
    const data = Object.fromEntries(form);

    //получаем ссылки для фото Cloudinary
    const photos: Array<File> = [data.cover as File];

    for (let key in data) {
        if (key.startsWith('photo')) {
            photos.push(data[key] as File);
        }
    };

    const photosUrls = (await getCloudinaryUrl(photos)) as string | string[];
    if (typeof photosUrls === 'string') {
        return NextResponse.json({ message: photosUrls }, { status: 500 });
    }

    //собираем и формируем данные для записи нового раздела галереи в БД
    const baseCombinedData = {
        ...combineProperty(data, ['title', 'description', 'alt']),
    } as Pick<GalleryItem, 'title' | 'description' | 'alt'>;

    const combinedData: Omit<GalleryItem, 'id'> = {
        ...baseCombinedData,
        cover: photosUrls[0],
        photo_urls: photosUrls.slice(1),
        name: data.name as unknown as string,
    };
    
    const access_token = cookies().get('access_token')?.value;

    try {
        const responseToBackend = await fetch(`${url}/api/v1/photos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(combinedData),
        });

        if (!responseToBackend.ok) {
            const errorData = await responseToBackend.json();
            return NextResponse.json(
                {
                    message: `Виникла помилка під час додавання розділу галереї.\nLocation: ${errorData.detail[0].loc.join(
                        ', ',
                    )}; message: ${errorData.detail[0].msg}`,
                },
                { status: responseToBackend.status },
            );
        }
        revalidateTag('gallery');
        return NextResponse.json({ description: 'Розділ галереї успішно додано!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
