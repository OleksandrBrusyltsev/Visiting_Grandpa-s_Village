import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import { verifySession } from '@/functions/dal';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const url = process.env.SERV_URL;

export async function PUT(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await request.formData();

    const toastersDataObj = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        const partsLength = key.split('-').length;
        const fieldName = key.split('-')[0] as keyof AdvToaster;
        const index = +key.split('-')[partsLength - 1];

        const lang = partsLength === 3 ? (key.split('-')[1] as Language) : undefined;

        if (!acc[index]) {
            acc[index] = {
                id: 0,
                start_date: '',
                end_date: '',
                timeout: 0,
                is_active: false,
                translations: {
                    uk: '',
                    en: '',
                    ru: ''
                },
            };
        }
        if (fieldName.includes('start_date')) {
            acc[index].start_date = dayjs(value as string, "DD/MM/YYYY").format("YYYY-MM-DD[T]00:00:00");
        } else if (fieldName.includes('end_date')) {
            acc[index].end_date = dayjs(value as string, "DD/MM/YYYY").format("YYYY-MM-DD[T]23:59:59");
        } else if (fieldName.startsWith('id')) {
            acc[index].id = +value;
        } else if (fieldName.startsWith('timeout')) {
            acc[index].timeout = +value;
        } else if (fieldName.startsWith('is_active')) {
            acc[index].is_active = value === 'true';
        }
        if (lang && typeof value === 'string') {
            (acc[index][fieldName] as Record<Language, string>)[lang] = value;
        }
        return acc;
    }, {} as {[key: number]: AdvToaster});
    
    const access_token = cookies().get('access_token')?.value;
    
    try {
        const responses = await Promise.all(
            Object.values(toastersDataObj).map((toaster) =>
                fetch(`${url}/api/v1/toaster/${toaster.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(toaster),
                }),
            ),
        );

        const errors = (
            await Promise.all(
                responses
                    .filter((response, index) => response.status < 200 || response.status >= 300)
                    .map(async (response) => {
                        const errorResponse =
                            (await response.json()) as unknown as ErrorResponseType;
                        return errorResponse;
                    }),
            )
        );
        
        const errorsData = errors.reduce((accu, curr, index) => {
            accu[index] = { location: '', message: '', blockTitle: '' };
            accu[index].location += curr.detail[0].loc.join(', ');
            accu[index].message += curr.detail[0].msg;
            accu[index].blockTitle = Object.values(toastersDataObj)[index].translations.uk.slice(0, 50) + '...';
            return accu;
        }, [] as { location: string; message: string; blockTitle: string }[]);

        if (errorsData.length) {
            const message =
                'Виникла помилка під час редагування сторінки з оголошеннями.\n' +
                errorsData
                    .map(
                        (error, index) =>
                            `Блок ${index + 1} із заголовком "${error.blockTitle}": \n Location: ${error.location}; \n message: ${error.message}`,
                    )
                    .join('\n');
            return NextResponse.json({ message }, { status: 500 });
        }

        revalidateTag('toasters');

        return NextResponse.json(
            { description: 'Оголошення були успішно збережені!' },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
