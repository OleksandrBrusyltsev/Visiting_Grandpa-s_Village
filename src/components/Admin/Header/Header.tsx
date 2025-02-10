"use client";

import React from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import UserMenu from './UserMenu/UserMenu';
import { useMainStore } from '@/stores/store-provider';
import ConfirmLink from '../UI/ConfirmLink/ConfirmLink';

export default function Header() {
    const locale = useLocale();
    
    const open = useMainStore((state) => state.adminMenuIsOpen);
    const setOpen = useMainStore((state) => state.setAdminMenuOpen);

    const handleDrawerToggle = () => {
        setOpen();
    };

    return (
        <header className='w-full bg-nude/70 flex justify-between items-center gap-4'>
            <IconButton
                size="large"
                aria-label="open menu"
                onClick={handleDrawerToggle}
                sx={{
                    "&.MuiIconButton-root": {
                        marginLeft: "8px"
                    },
                }}
            >
                {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <ConfirmLink href={`/${locale}`} className='min-w-80 h-24 relative'>
                <Image src="/images/logo-main-admin.svg" alt="" fill />
            </ConfirmLink>
            <div className='grow'></div>

            <UserMenu/>
        </header>
    )
}