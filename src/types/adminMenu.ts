type MenuItem = {
    id: number;
    name: string;
    url: string;
    admission: string;
    icon: string;
    children?: MenuItem[];
};

type AdminMenu = MenuItem[]
