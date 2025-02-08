import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { verifySession } from '@/functions/dal';

const url = process.env.SERV_URL;

export async function DELETE(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    const chapterId = new URL(request.url).searchParams.get('id') as string;

    const access_token = cookies().get('access_token')?.value;
    try {
        const responseToBackend = await fetch(`${url}/api/v1/photos/${chapterId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!responseToBackend.ok) {
            const errorData = await responseToBackend.json();
            return NextResponse.json(
                {
                    message: `Виникла помилка під час видалення розділу галереї.\nLocation: ${errorData.detail[0].loc.join(
                        ', ',
                    )}; message: ${errorData.detail[0].msg}`,
                },
                { status: responseToBackend.status },
            );
        }
        revalidateTag('gallery');
        return NextResponse.json({ description: 'Розділ галереї успішно видалено!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
