import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import { verifySession } from '@/functions/dal';
import { combineProperty } from '@/functions/routeHandlersHelpers';

const url = process.env.SERV_URL;

export async function PUT(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await request.formData();

    const contactsDataObj = Object.fromEntries(formData);
    
    const baseCombinedData = {
        ...combineProperty(contactsDataObj, ['address', 'directions_from_city', 'transit_options', 'route_change_notice']),
    } as Pick<ContactItem, 'address' | 'directions_from_city' | 'transit_options' | 'route_change_notice'>;

    const faq: ContactItem['faq'] = { en: [], uk: [], ru: [] };

    for (const key in contactsDataObj) {
        if(key.startsWith('question') || key.startsWith('answer')) {
            const partsLength = key.split('-').length;
            const fieldName = key.split('-')[0] as 'question' | 'answer';
            const lang = key.split('-')[1];
            const index = +key.split('-')[partsLength - 1];

            if(!faq[lang as Language][index]) {
                faq[lang as Language][index] = {
                    question: '',
                    answer: ''
                };
            }
            faq[lang as Language][index][fieldName as 'question' | 'answer'] = contactsDataObj[key] as string;
        }
    }
    const contacts =  {
        email: contactsDataObj.email,
        phone: contactsDataObj.phone,
        facebook_link: contactsDataObj.facebook_link,
        instagram_link: contactsDataObj.instagram_link,
        telegram_link: contactsDataObj.telegram_link,
        linkedin_link: contactsDataObj.linkedin_link,
        ...baseCombinedData,
        faq
    };

    const access_token = cookies().get('access_token')?.value;

    try {
        const responseToBackend = await fetch(`${url}/api/v1/contacts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(contacts),
        });

        if (!responseToBackend.ok) {
            const errorData = await responseToBackend.json();
            return NextResponse.json(
                {
                    message: `Виникла помилка під час редагування контактів.\nLocation: ${errorData.detail[0].loc.join(
                        ', ',
                    )}; message: ${errorData.detail[0].msg}`,
                },
                { status: responseToBackend.status },
            );
        }

        revalidateTag('contacts');

        return NextResponse.json(
            { description: 'Сторінку ЗНАЙТИ МЕНЕ успішно збережено!' },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
