import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

type Props = { loading: boolean }

export default function Spinner({ loading }: Props) {
    return (

        <Backdrop
            sx={{ color: '#fff', zIndex: 1300 }}
            open={loading}
        >
            <CircularProgress size="3rem" />
        </Backdrop>
    )
}