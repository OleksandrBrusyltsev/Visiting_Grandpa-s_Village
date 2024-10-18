import React from 'react'
import { Fab, SxProps, Tooltip, Zoom } from '@mui/material'

type Props = {
    showFab: boolean;
    title: string;
    type: 'submit' | 'button';
    icon: JSX.Element;
    loading: boolean;
    sx?: SxProps;
    cb: () => void;
}

export default function FloatButton({
    showFab, title, type, icon, loading, sx, cb
}: Props) {
    return (
        <Tooltip title={title} placement="left">
            <Zoom
                in={showFab}
                timeout={300}
                style={{
                    transitionDelay: '300ms',
                }}
                unmountOnExit
            >
                <Fab
                    sx={sx}
                    aria-label={title}
                    type={type}
                    disabled={loading}
                    onClick={cb}
                >
                    {icon}
                </Fab>
            </Zoom>
        </Tooltip>
    )
}