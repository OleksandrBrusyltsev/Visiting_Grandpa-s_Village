"use client";

import React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { List } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useMainStore } from '@/stores/auth/store-provider';

import ParentMenuItem from './ParentMenuItem';
import ChildMenuItem from './ChildMenuItem';

type Props = { menu: AdminMenu }

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 280;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        // whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MainMenu({ menu }: Props) {
    const theme = useTheme();

    const open = useMainStore((state) => state.adminMenuIsOpen);

    return (
        <Drawer variant="permanent"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    position: 'relative',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                {
                    menu.map((menuItem) => (
                        menuItem.children ?
                            <ParentMenuItem
                                key={menuItem.id}
                                menuItem={menuItem}
                                isDrawerOpen={open} /> :
                            <ChildMenuItem
                                key={menuItem.id}
                                menuItem={menuItem} />
                    ))
                }
            </List>
        </Drawer>
    )
}