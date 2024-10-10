import React, { useEffect } from 'react'
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
    AddOutlined
} from '@mui/icons-material';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import ChildMenuItem from './ChildMenuItem';

type Props = {
    menuItem: MenuItem;
    isDrawerOpen: boolean;
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

export default function ParentMenuItem({ menuItem, isDrawerOpen }: Props) {
    const { name, icon, children } = menuItem;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
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
                        }, }}
                >
                    <ListItemIcon
                        sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}
                    >
                        <IconComponent />
                    </ListItemIcon>
                    <ListItemText
                        primary={name}
                       
                    />
                    {open ? <ExpandLess sx={{
                        opacity: isDrawerOpen ? 1 : 0,
                        transition: "opacity 500ms"
                    }} /> : <ExpandMore sx={{
                        opacity: isDrawerOpen ? 1 : 0,
                        transition: "opacity 500ms"
                    }} />}
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