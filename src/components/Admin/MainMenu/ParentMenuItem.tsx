import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    CalendarMonthOutlined,
    EmailOutlined,
    FolderCopyOutlined,
    AutoAwesomeMotionOutlined,
    ApiOutlined,
    HomeOutlined,
    LunchDiningOutlined,
    AutoAwesomeOutlined,
    WbCloudyOutlined,
    FmdGoodOutlined,
    SettingsOutlined,
    ExpandLess,
    ExpandMore,
    HotelOutlined,
    HolidayVillageOutlined,
    PhotoLibraryOutlined,
    PhotoOutlined,
    AddOutlined,
    HouseOutlined,
    CommentOutlined
} from '@mui/icons-material';

import ChildMenuItem from './ChildMenuItem';
import ConfirmLink from '../UI/ConfirmLink/ConfirmLink';

type Props = Readonly<{
    menuItem: MenuItem;
    isDrawerOpen: boolean;
}>;

const iconMapping: { [key: string]: React.ElementType } = {
    CalendarMonthOutlined,
    EmailOutlined,
    FolderCopyOutlined,
    AutoAwesomeMotionOutlined,
    ApiOutlined,
    HomeOutlined,
    LunchDiningOutlined,
    AutoAwesomeOutlined,
    WbCloudyOutlined,
    FmdGoodOutlined,
    SettingsOutlined,
    HotelOutlined,
    HolidayVillageOutlined,
    PhotoLibraryOutlined,
    PhotoOutlined,
    AddOutlined,
    HouseOutlined,
    CommentOutlined
};

export default function ParentMenuItem({ menuItem, isDrawerOpen }: Props) {
    const { name, url, icon, children } = menuItem;

    /* Данное комплексное меню предназначено для домиков, имеющих подменю с комнатами. 
    *  Оно отвечает за "кликабельность" основного домика (создает ссылку на страницу основного домика)
    */
    const isComplexMenuRef = React.useRef<boolean>(!["Будиночки", "Галерея", "Сторінки", 'Налаштування'].includes(menuItem.name));

    const [open, setOpen] = React.useState(isComplexMenuRef.current);

    const currPath = usePathname();
    const selectedIndex = currPath === url;

    const handleClick = () => {
        if (isComplexMenuRef.current) return
        isDrawerOpen && setOpen(!open);
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setOpen(false);
        }
    }, [isDrawerOpen]);

    const IconComponent = iconMapping[icon];

    return (
        <>
            {open && <Divider />}

            <ListItem
                disablePadding
                onClick={handleClick}
            >
                <ListItemButton
                    sx={{
                        minHeight: 48, px: 2.5, '&:hover': {
                            backgroundColor: 'rgba(63, 85, 64, 0.5)',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(63, 85, 64, 0.3)',
                        },
                        '&:hover, &.Mui-selected:hover': {
                            backgroundColor: 'rgba(63, 85, 64, 0.5)',
                        },
                    }}
                    selected={selectedIndex}
                    component={isComplexMenuRef.current ? ConfirmLink : 'div'}
                    href={isComplexMenuRef.current ? menuItem.url : ''}
                >
                    <ListItemIcon
                        sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}
                    >
                        <IconComponent />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    {!isComplexMenuRef.current && (
                        <>
                            {open ? <ExpandLess sx={{
                                opacity: isDrawerOpen ? 1 : 0,
                                transition: "opacity 500ms"
                            }} /> : <ExpandMore sx={{
                                opacity: isDrawerOpen ? 1 : 0,
                                transition: "opacity 500ms"
                            }} />}
                        </>
                    )}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 5.5 }}>
                    {children?.map((child) => (

                        child.children ? (
                            <ParentMenuItem
                                isDrawerOpen={isDrawerOpen}
                                key={child.id}
                                menuItem={child}
                            />
                        ) : <ChildMenuItem key={child.id} menuItem={child} />
                    ))}
                </List>
            </Collapse>
        </>
    )
}