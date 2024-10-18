import React from 'react'
import { Stack, TextField, Typography } from '@mui/material';

type Props = {
    legend: string;
    nameAttr: string;
    multiLang?: boolean;
    multiline?: boolean;
}

export const HouseFieldset: React.FC<Props> = function HouseFieldset({ legend, nameAttr, multiLang, multiline }) {
    if (!multiLang) return (
        <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component={'legend'}>{legend}</Typography>
            <TextField
                label=""
                id={nameAttr}
                name={nameAttr}
                variant="outlined"
                type='text'
                inputProps={{ pattern: "^[a-z][a-z0-9-]*$" }}
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
            />
        </Stack>
    )
    return (
        <Stack
            component="fieldset"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: '1px solid grey',
                p: 2,
                borderRadius: '8px',
                '& .MuiInputBase-input::-webkit-scrollbar': {
                    width: '6px'
                },
                '& .MuiInputBase-input::-webkit-scrollbar-track': {
                    background: 'rgb(179, 179, 179)'
                },

                '& .MuiInputBase-input::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgb(63, 85, 64)',
                    borderRadius: 10,
                },
                '& .MuiInputBase-input::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgb(61, 73, 63)',
                }

            }}>
            <Typography component={'legend'}>{legend}</Typography>
            <TextField
                label="UK:"
                id={`${nameAttr}-uk`}
                name={`${nameAttr}-uk`}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
            />
            <TextField
                label="EN:"
                id={`${nameAttr}-en`}
                name={`${nameAttr}-en`}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
            />
            <TextField
                label="RU:"
                id={`${nameAttr}-ru`}
                name={`${nameAttr}-ru`}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
            />
        </Stack>
    )
}