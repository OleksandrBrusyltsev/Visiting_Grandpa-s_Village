export const menuAdmin = [
    {
        id: 1,
        name: 'Бронювання',
        url: '/uk/dyadus_adm1n_hub/booking',
        admission: 'admin',
        icon: 'CalendarMonthOutlined',
    },
    {
        id: 2,
        name: 'Розсилка',
        url: '/uk/dyadus_adm1n_hub/emailing',
        admission: 'admin',
        icon: 'EmailOutlined',
    },
    {
        id: 3,
        name: 'Сторінки',
        url: '',
        admission: 'superadmin',
        // icon: 'FolderCopyOutlined',
        icon: 'AutoAwesomeMotionOutlined',
        children: [
            {
                id: 101,
                name: 'Головна',
                url: '/uk/dyadus_adm1n_hub/home',
                admission: 'superadmin',
                icon: 'ApiOutlined',
            },
            {
                id: 102,
                name: 'Жити',
                url: '/uk/dyadus_adm1n_hub/houses',
                admission: 'superadmin',
                icon: 'HomeOutlined',
            },
            {
                id: 103,
                name: 'Їсти',
                url: '/uk/dyadus_adm1n_hub/meals',
                admission: 'superadmin',
                icon: 'LunchDiningOutlined',
            },
            {
                id: 104,
                name: 'Байдикувати',
                url: '/uk/dyadus_adm1n_hub/entertainment',
                admission: 'superadmin',
                icon: 'AutoAwesomeOutlined',
            },
            {
                id: 105,
                name: 'Спогади',
                url: '/uk/dyadus_adm1n_hub/gallery',
                admission: 'superadmin',
                icon: 'WbCloudyOutlined',
            },
            {
                id: 106,
                name: 'Знайти мене',
                url: '/uk/dyadus_adm1n_hub/contacts',
                admission: 'superadmin',
                icon: 'FmdGoodOutlined',
            },
            {
                id: 107,
                name: 'Будиночки',
                url: '',
                admission: 'superadmin',
                icon: 'HolidayVillageOutlined',
                children: [],
            },
            {
                id: 108,
                name: 'Галерея',
                url: '',
                admission: 'superadmin',
                icon: 'PhotoLibraryOutlined',
                children: [],
            },
        ],
    },
    {
        id: 4,
        name: 'Налаштування',
        url: '/uk/dyadus_adm1n_hub/settings',
        admission: 'superadmin',
        icon: 'SettingsOutlined',
    },
];