const houseIcon = 'HotelOutlined';
const galleryChapterIcon = 'PhotoOutlined';
import { menuAdmin } from '@/data/admin/menu';

const getBaseMenu = (
    locale: string,
    type: 'gallery' | 'houses',
    arr: {
        id: number;
        name: string;
        title: {
            en: string;
            ru: string;
            uk: string;
        };
        house_type?: string | null;
    }[],
) => {
    let rooms: Record<string, HouseItem[]> = {};
    // для домиков с комнатами формируем дерево данных для подменю
    if (type === 'houses' && 'house_type' in arr[0]) {
        rooms = arr.reduce((accu, cur) => {
            if (cur.house_type) {
                Array.isArray(accu[cur.house_type])
                    ? accu[cur.house_type].push(cur as HouseItem)
                    : (accu[cur.house_type] = [cur as HouseItem]);
            }
            return accu;
        }, {} as Record<string, HouseItem[]>);
    }
    const unfilteredMenu = type === 'gallery' ? arr : arr.filter((el) => el?.house_type === null);
    return unfilteredMenu.map((el) => {
        const menu: MenuItem = {
            id: el.id,
            name: el.title[locale as keyof typeof el.title],
            url: `/${locale}/dyadus_adm1n_hub/${type}/${el.name}`,
            admission: 'superadmin',
            icon: type === 'gallery' ? galleryChapterIcon : houseIcon,
        };
        //если домик с комнатами - добавляем подменю
        if (type === 'houses' && rooms[el.name]) {
            menu['children'] = rooms[el.name].map((room) => ({
                id: room.id,
                name: room.title[locale as keyof typeof room.title],
                url: `/${locale}/dyadus_adm1n_hub/${type}/${room.name}`,
                admission: 'superadmin',
                icon: houseIcon,
            }));
        }
        return menu;
    });
};

export default function getMainMenu(houses: HouseItem[], gallery: GalleryItem[], locale: string) {
    const indexOfMenuItemPages = menuAdmin.findIndex((item) => item.name === 'Сторінки');
    if (indexOfMenuItemPages && indexOfMenuItemPages >= 0) {
        const indexOfMenuItemHouses = menuAdmin[indexOfMenuItemPages].children!.findIndex(
            (item) => item.name === 'Будиночки',
        );
        const indexOgMenuItemGallery = menuAdmin[indexOfMenuItemPages].children!.findIndex(
            (item) => item.name === 'Галерея',
        );

        if (indexOfMenuItemHouses && indexOfMenuItemHouses >= 0) {
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOfMenuItemHouses
            ].children = getBaseMenu(
                locale,
                'houses',
                houses.filter((house) => house.name),
            );
        }
        if (indexOgMenuItemGallery && indexOgMenuItemGallery > 0) {
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOgMenuItemGallery
            ].children = getBaseMenu(locale, 'gallery', gallery);
        }
    }
    return menuAdmin;
}
