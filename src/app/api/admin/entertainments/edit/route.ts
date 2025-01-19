import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import getCloudinaryUrl from '@/actions/admin/getCloudinaryUrl';
import { verifySession } from '@/functions/dal';

const url = process.env.SERV_URL;

export async function PUT(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await request.formData();

    const entertainmentsDataObj = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        const partsLength = key.split('-').length;
        const fieldName = key.split('-')[0] as keyof EntertainmentItem;
        const index = +key.split('-')[partsLength - 1];

        const lang = partsLength === 3 ? (key.split('-')[1] as Language) : undefined;

        if (!acc[index]) {
            acc[index] = {
                id: 0,
                title: { en: '', uk: '', ru: '' },
                subtitle: { en: '', uk: '', ru: '' },
                quote: { en: '', uk: '', ru: '' },
                description: { en: '', uk: '', ru: '' },
                photos: [],
            };
        }

        if (fieldName.startsWith('photo')) {
            (acc[index].photos as (string | File)[])[+fieldName.slice(5)] = value;
        } else if (fieldName.startsWith('id')) {
            (acc[index] as EntertainmentItem).id = +value;
        }
        if (lang && typeof value === 'string') {
            (acc[index][fieldName] as Record<Language, string>)[lang] = value;
        }
        return acc;
    }, {} as { [key: number]: EntertainmentItem });
    console.log(entertainmentsDataObj);

    let entertainments;

    try {
        //добавляем ссылки на Cloudinary для новых фото
        entertainments = await Promise.all(
            Object.values(entertainmentsDataObj).map(async (entertainment) => {
                const photos = await getCloudinaryUrl(entertainment.photos);
                if (typeof entertainment.photos === 'string') throw new Error(entertainment.photos);
                return { ...entertainment, photos };
            }),
        );
    } catch (error) {
        console.error('Error processing photos for entertainments:', error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }

    const access_token = cookies().get('access_token')?.value;

    try {
        const responses = await Promise.all(
            entertainments.map((entertainment) =>
                fetch(`${url}/api/v1/entertainment/${entertainment.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(entertainment),
                }),
            ),
        );

        const errorsData = (
            await Promise.all(
                responses
                    .filter((response, index) => response.status < 200 || response.status >= 300)
                    .map(async (response) => {
                        const errorResponse =
                            (await response.json()) as unknown as ErrorResponseType;
                        return errorResponse;
                    }),
            )
        ).reduce((accu, curr, index) => {
            accu[index] = { location: '', message: '', blockTitle: '' };
            accu[index].location += curr.detail[0].loc.join(', ');
            accu[index].message += curr.detail[0].msg;
            accu[index].blockTitle = entertainments[index].title.uk;
            return accu;
        }, [] as { location: string; message: string; blockTitle: string }[]);

        if (errorsData.length) {
            const message =
                'Виникла помилка під час редагування сторінки.\n' +
                errorsData
                    .map(
                        (error) =>
                            `Блок із заголовком "${error.blockTitle}": Location: ${error.location}; message: ${error.message}`,
                    )
                    .join('\n');
            return NextResponse.json({ message });
        }

        revalidateTag('entertainments');

        return NextResponse.json(
            { description: 'Сторінку БАЙДИКУВАТИ успішно збережено!' },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
