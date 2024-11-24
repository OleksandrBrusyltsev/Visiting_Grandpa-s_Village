import React, { memo, useEffect, useState } from 'react'
import { Stack, SxProps } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import FloatButton from '../FloatButton/FloatButton';
import Spinner from '../Spinner/Spinner';

type Props = {
    loading: boolean
    onSubmit: () => void
    onReset: () => void
}

const fabStyle = {
    save: {
        bgcolor: 'rgb(63, 85, 64)',
        color: 'white',
        '&:hover': {
            bgcolor: 'rgb(31, 44, 31)',
        }
    },
    reset: {
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

const SubmitFabGroup = memo(function SubmitFabGroup({
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
        <>
            <Stack sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '23px',
            }}>
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
            <Spinner loading={loading} />
        </>
    )
});
export default SubmitFabGroup;