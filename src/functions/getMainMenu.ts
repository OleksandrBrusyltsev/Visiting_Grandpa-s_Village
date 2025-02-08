import { menuAdmin } from '@/data/admin/menu';

const houseIcon = 'HouseOutlined';
const roomIcon = 'HotelOutlined';
const addNew = 'AddOutlined';
const galleryChapterIcon = 'PhotoOutlined';

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
    let housesWithRooms: Record<string, HouseItem[]> = {};
    // для домиков с комнатами формируем дерево данных для подменю
    if (type === 'houses' && arr.length && 'house_type' in arr[0]) {
        housesWithRooms = arr.reduce((accu, cur) => {
            if (cur.house_type) {
                Array.isArray(accu[cur.house_type])
                    ? accu[cur.house_type].push(cur as HouseItem)
                    : (accu[cur.house_type] = [cur as HouseItem]);
            }
            return accu;
        }, {} as Record<string, HouseItem[]>);
    }

    const topLevelMenu = type === 'gallery' ? arr : arr.filter((el) => el?.house_type === null);

    return topLevelMenu.map((el) => {
        const menu: MenuItem = {
            id: el.id,
            name: el.title[locale as Language],
            url: `/${locale}/admin_hub/${type}/${el.id}`,
            admission: 'superadmin',
            icon: type === 'gallery' ? galleryChapterIcon : houseIcon,
        };
        //если домик с комнатами - добавляем подменю
        if (type === 'houses' && housesWithRooms[el.name]) {
            menu['children'] = housesWithRooms[el.name].map((room) => ({
                id: room.id,
                name: room.title[locale as Language],
                url: `/${locale}/admin_hub/${type}/${room.id}`,
                admission: 'superadmin',
                icon: roomIcon,
            }));
        }
        return menu;
    });
};

export default function getMainMenu(houses: HouseItem[], gallery: GalleryItem[], locale: string) {
    const indexOfMenuItemPages = menuAdmin.findIndex((item) => item.name === 'Сторінки');
    if (indexOfMenuItemPages >= 0) {
        const indexOfMenuItemHouses = menuAdmin[indexOfMenuItemPages].children!.findIndex(
            (item) => item.name === 'Будиночки',
        );
        const indexOfMenuItemGallery = menuAdmin[indexOfMenuItemPages].children!.findIndex(
            (item) => item.name === 'Галерея',
        );

        //добавляем подменю для домиков
        if (indexOfMenuItemHouses >= 0) {
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOfMenuItemHouses
            ].children = getBaseMenu(
                locale,
                'houses',
                houses.filter((house) => house.name),
            );
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOfMenuItemHouses
            ].children?.push({
                id: 5434234234,
                name: 'Додати будинок',
                url: `/${locale}/admin_hub/houses/add-house`,
                admission: 'superadmin',
                icon: addNew,
            });
        }

        //добавляем подменю для галереи
        if (indexOfMenuItemGallery > 0) {
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOfMenuItemGallery
            ].children = getBaseMenu(locale, 'gallery', gallery);
            (menuAdmin[indexOfMenuItemPages].children as MenuItem[])[
                indexOfMenuItemGallery
            ].children?.push({
                id: 9234802973,
                name: 'Додати розділ',
                url: `/${locale}/admin_hub/gallery/add-chapter`,
                admission: 'superadmin',
                icon: addNew,
            });
        }
    }
    return menuAdmin;
}
