import React, { memo } from 'react'
import { Stack, TextField, Typography } from '@mui/material';
import { useMainStore } from '@/stores/store-provider';

type Props = Readonly<{
    legend: string;
    nameAttr: string | ((lang: string) => string);
    multiLang?: boolean;
    multiline?: boolean;
    className?: string;
    value?: string | Record<Language, string>;
    handleDataChange?: () => void
}>

const HouseFieldset = memo(function HouseFieldset({ 
    legend, 
    nameAttr, 
    multiLang, 
    multiline, 
    className,
    value,
    handleDataChange
}: Props) {
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(nameAttr === 'name') {
            e.target.setCustomValidity("");
        }
        handleDataChange?.();
        setIsDirtyPage(true)};

    if (!multiLang) return (
        <Stack component="fieldset" className={className} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component={'legend'}>{legend}</Typography>
            <TextField
                label=""
                id={nameAttr as string}
                name={nameAttr as string}
                variant="outlined"
                type='text'
                onInvalid={(e: any) => {
                    if(nameAttr === 'name') e.target.setCustomValidity("Тільки латинські символи, цифри або дефіс");
                }}
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                defaultValue={value}
                slotProps={
                    {
                        htmlInput: {
                            pattern: nameAttr === 'name' ? "[a-z0-9\\-]+" : undefined
                        }
                    }
                }
                onChange={handleChange}
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
                id={typeof nameAttr === 'string' ? `${nameAttr}-uk` : nameAttr('uk')}
                name={typeof nameAttr === 'string' ? `${nameAttr}-uk` : nameAttr('uk')}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                defaultValue={value && typeof value !== 'string' ? value['uk'] : value}
                onChange={handleChange}
            />
            <TextField
                label="EN:"
                id={typeof nameAttr === 'string' ? `${nameAttr}-en` : nameAttr('en')}
                name={typeof nameAttr === 'string' ? `${nameAttr}-en` : nameAttr('en')}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                defaultValue={value && typeof value !== 'string' ? value['en'] : value}
                onChange={handleChange}
            />
            <TextField
                label="RU:"
                id={typeof nameAttr === 'string' ? `${nameAttr}-ru` : nameAttr('ru')}
                name={typeof nameAttr === 'string' ? `${nameAttr}-ru` : nameAttr('ru')}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                defaultValue={value && typeof value !== 'string' ? value['ru'] : value}
                onChange={handleChange}
            />
        </Stack>
    )
})

export default HouseFieldset