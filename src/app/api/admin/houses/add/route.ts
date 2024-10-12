import getCloudinaryUrl from '@/actions/admin/getCloudinaryUrl';
import { verifySession } from '@/functions/dal';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

const url = process.env.SERV_URL;

const getPhotos = (object: Record<string, any>, prefix: string) => {
    const result: Array<File> = [];
    for (let key in object) {
        if (key.startsWith(prefix) && object[key].size) {
            result.push(object[key]);
        }
    };
    return result;
}
const combineProperty = (object: Record<string, any>, prefixes: string[]) => {
    
    return prefixes.reduce((accu, prefix) => {
        
        const propertiesWithPrefix = Object.entries(object).filter((item) =>
            item[0].startsWith(prefix),
        );

        const newObject = propertiesWithPrefix.reduce((accu, item) => {
            const [key, value] = item;
            const [property, locale] = key.split('-');
            accu[property] = {
                ...accu[property],
                [locale]: value,
            };
            return accu;
        }, {} as Record<string, Record<Language, string>>);

        return { ...accu, ...newObject };
    }, {} as Record<string, Record<Language, string>>);
    
}

export async function POST(request: Request) {
    const { role } = await verifySession();
    if (role !== 'superadmin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const form = await request.formData();
    const data = Object.fromEntries(form);

    //получаем ссылки для фото Cloudinary
    const photos = [data.cover_photo as File];
    photos.push(...getPhotos(data, 'photo'));
    const photosUrls = await getCloudinaryUrl(photos);
    if (typeof photosUrls === 'string') {
        return NextResponse.json({ message: photosUrls }, { status: 500 });
    }

    //собираем и формируем данные для записи нового домика в БД
    const baseCombinedData = {...combineProperty(data, [
        'title',
        'long_title',
        'description',
        'decor_text',
    ])} as Pick<HouseItem, 'title' | 'long_title' | 'description' | 'decor_text'>;
    const combinedData: Omit<HouseItem, 'id' | 'photoDecor' | 'treesDecor' | 'coordinates'> = {
        ...baseCombinedData,
        rental_price: +data.rental_price,
        cover_photo:  photosUrls[0],
        photo:  photosUrls.slice(1),
        name:  data.name as string,
        max_adults: +data.max_adults,
        extra_adults:  +data.extra_adults,
        extra_adult_price:  +data.extra_adult_price,
        extra_children:  +data.extra_children,
        extra_children_price:  +data.extra_children_price,
        discount_percent:  +data.discount_percent,
        is_available:  true,
        house_type: data.house_type === 'null' ? null : data.house_type as string,
    };

    const access_token = cookies().get('access_token')?.value;
    try {
        const responseToBackend = await fetch(`${url}/api/v1/houses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(combinedData),
        });

        if (!responseToBackend.ok) {
            const errorData = await responseToBackend.json();
            return NextResponse.json(
                {
                    message: `Виникла помилка під час додавання будинку.\nLocation: ${errorData.detail[0].loc.join(
                        ', ',
                    )}; message: ${errorData.detail[0].msg}`,
                },
                { status: responseToBackend.status },
            );
        }
        revalidateTag('houses');
        return NextResponse.json({ description: 'Будинок успішно додано!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
