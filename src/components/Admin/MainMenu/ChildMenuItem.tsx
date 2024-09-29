import React from 'react'
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
    PhotoOutlined
} from '@mui/icons-material';
import Link from 'next/link';

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
    PhotoOutlined
};

export default function ChildMenuItem({ menuItem }: Props) {
    const { name, url, icon } = menuItem;
    const IconComponent = iconMapping[icon];

    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component={Link}
                href={url}
                sx={[{ minHeight: 48, px: 2.5, },
                ]}
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