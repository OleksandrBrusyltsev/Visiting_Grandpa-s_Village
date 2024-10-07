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
            rooms?: {
                id: number;
                name: string;
                title: {
                    en: string;
                    ru: string;
                    uk: string;
                };
            }[];
        }[],
    ) =>
        arr.map((el) => {
            const menu: MenuItem = {
                id: el.id,
                name: el.title[locale as keyof typeof el.title],
                url: `/${locale}/dyadus_adm1n_hub/${type === 'gallery' ? 'gallery' : 'houses'}/${
                    el.name
                }`,
                admission: 'superadmin',
                icon: type === 'gallery' ? galleryChapterIcon : houseIcon,
            };
            if (type === 'houses' && el.rooms !== undefined && el.rooms!.length > 0) {
                menu['children'] = getBaseMenu(locale, 'houses', el.rooms);
            }
            return menu;
        });
        
export default function getMainMenu(houses: HouseItem[], gallery: GalleryItem[], locale: string) {
    const pagesMenuIndex = menuAdmin.findIndex((item) => item.name === 'Сторінки');
    if (pagesMenuIndex && pagesMenuIndex >= 0) {
        const housesMenuIndex = menuAdmin[pagesMenuIndex].children!.findIndex(
            (item) => item.name === 'Будиночки',
        );
        const galleryMenuIndex = menuAdmin[pagesMenuIndex].children!.findIndex(
            (item) => item.name === 'Галерея',
        );

        if (housesMenuIndex && housesMenuIndex >= 0) {
            (menuAdmin[pagesMenuIndex].children as MenuItem[])[housesMenuIndex].children =
                getBaseMenu(locale, 'houses', houses);
        }
        if (galleryMenuIndex && galleryMenuIndex !== -1) {
            (menuAdmin[pagesMenuIndex].children as MenuItem[])[galleryMenuIndex].children =
                getBaseMenu(locale, 'gallery', gallery);
        }
    }
    return menuAdmin;
}