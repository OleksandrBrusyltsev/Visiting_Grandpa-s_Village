import React, { useEffect, useState } from 'react'
import { Stack, SxProps } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import FloatButton from '../FloatButton/FloatButton';

type Props = {
    loading: boolean
    onSubmit: () => void
    onReset: () => void
}

const fabStyle = {
    save: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: 'rgb(63, 85, 64)',
        color: 'white',
        '&:hover': {
            bgcolor: 'rgb(31, 44, 31)',
        }
    },
    reset: {
        position: 'fixed',
        bottom: 95,
        right: 16,
        bgcolor: 'rgba(180, 133, 79, 0.6)',
        color: 'white',
        '&:hover': {
            bgcolor: 'rgb(180, 133, 79)',
        }
    },
};

const fabs = [
    {
        sx: fabStyle.save as SxProps,
        icon: <SaveOutlinedIcon />,
        label: 'Зберегти',
        type: 'submit' as 'submit',
    },
    {
        sx: fabStyle.reset as SxProps,
        icon: <AutorenewOutlinedIcon />,
        label: 'Очистити форму',
        type: 'button' as 'button',
    }
]

export default function SubmitFabGroup({
    loading, onSubmit, onReset
}: Props) {
    const [showFab, setShowFab] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowFab(true);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Stack
            // sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}

        >
            {
                fabs.map((fab, index) => (
                    <FloatButton
                        key={fab.type}
                        showFab={showFab}
                        title={fab.label}
                        type={fab.type}
                        icon={fab.icon}
                        loading={loading}
                        sx={fab.sx}
                        cb={fab.type === 'submit' ? onSubmit : onReset}
                        
                    />
                ))
            }
        </Stack>
    )
}