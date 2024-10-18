import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
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
    HotelOutlined,
    HolidayVillageOutlined,
    PhotoLibraryOutlined,
    PhotoOutlined,
    AddOutlined
} from '@mui/icons-material';


type Props = {
    menuItem: MenuItem;
}

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
    AddOutlined
};

export default function ChildMenuItem({ menuItem }: Props) {
    const { name, url, icon } = menuItem;
    const IconComponent = iconMapping[icon];
    const currPath = usePathname();
    const selectedIndex = currPath === url ? true : false;

    return (
        <ListItem disablePadding>
            <ListItemButton
                selected={selectedIndex}
                component={Link}
                href={url}
                sx={{
                    minHeight: 48, px: 2.5,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(63, 85, 64, 0.3)',
                    },
                    '&:hover, &.Mui-selected:hover': {
                        backgroundColor: 'rgba(63, 85, 64, 0.5)',
                    },
                }}
            >
                <ListItemIcon
                    sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}
                >
                    <IconComponent />
                </ListItemIcon>
                <ListItemText
                    primary={name}
                />
            </ListItemButton>
        </ListItem>
    )
}