import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import getCloudinaryUrl from '@/actions/admin/getCloudinaryUrl';
import { verifySession } from '@/functions/dal';

const url = process.env.SERV_URL;

type ErrorResponseType = {
    detail: [
        {
            loc: ['string', 0];
            msg: 'string';
            type: 'string';
        },
    ];
};
export async function PUT(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await request.formData();

    const mealsDataObj = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        const partsLength = key.split('-').length;
        const fieldName = key.split('-')[0] as keyof MealsItem;
        const index = +key.split('-')[partsLength - 1];

        const lang = partsLength === 3 ? (key.split('-')[1] as Language) : undefined;

        if (!acc[index]) {
            acc[index] = {
                id: 0,
                title: { en: '', uk: '', ru: '' },
                description: { en: '', uk: '', ru: '' },
                photos: [],
            };
        }

        if (fieldName.startsWith('photo')) {
            (acc[index].photos as (string | File)[])[+fieldName.slice(5)] = value;
        } else if (fieldName.startsWith('id')) {
            (acc[index] as MealsItem).id = +value;
        }
        if (lang && typeof value === 'string') {
            (acc[index][fieldName] as Record<Language, string>)[lang] = value;
        }
        return acc;
    }, {} as { [key: number]: MealsItem });

    let meals;

    try {
        //добавляем ссылки на Cloudinary для новых фото
        meals = await Promise.all(
            Object.values(mealsDataObj).map(async (meal) => {
                const photos = await getCloudinaryUrl(meal.photos);
                if (typeof meal.photos === 'string') throw new Error(meal.photos);
                return { ...meal, photos };
            }),
        );
    } catch (error) {
        console.error('Error processing photos for meals:', error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }

    const access_token = cookies().get('access_token')?.value;

    try {
        const responses = await Promise.all(
            meals.map((meal) =>
                fetch(`${url}/api/v1/meal/${meal.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(meal),
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
            accu[index].blockTitle = meals[index].title.uk;
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

        revalidateTag('meals');

        return NextResponse.json(
            { description: 'Сторінку ЇСТИ успішно збережено!' },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
