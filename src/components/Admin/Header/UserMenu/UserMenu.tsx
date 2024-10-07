"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useMainStore } from '@/stores/auth/store-provider';
import { Login } from '@mui/icons-material';
import { logout } from '@/actions/admin/auth';
import {  useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const user = useMainStore((state) => state.user);
    const resetUser = useMainStore((state) => state.resetUser);
    const { refresh } = useRouter();
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose =  () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setAnchorEl(null);
        await logout();
        resetUser();
        refresh();
    };
    
    return (
        <>
            <Tooltip title={`${user.first_name} ${user.last_name}`}>
                <IconButton
                    onClick={handleClick}
                    size="large"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        alt={`${user.first_name} ${user.last_name}`}
                        sx={{ width: 48, height: 48, bgcolor: 'rgb(63, 85, 64)' }}>
                        {user.first_name?.charAt(0) || ''}{user.last_name?.charAt(0) || ''}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} href='/uk/dyadus_adm1n_hub/profile' onClick={handleClose}>
                    <Avatar src='/opengraph-image.jpg'/> Профіль користувача
                </MenuItem>
                <Divider />
                <MenuItem component={Link} href='/uk/dyadus_adm1n_hub/users' onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Додати користувача
                </MenuItem>
                <MenuItem component={Link} href='/uk/dyadus_adm1n_hub/settings' onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Налаштування
                </MenuItem>
                
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        {
                            user?.id_active ? 
                                <Logout fontSize="small" /> :
                                <Login fontSize="small" />
                        }
                    </ListItemIcon>
                    Вийти
                </MenuItem>
            </Menu>
        </>
    );
}
