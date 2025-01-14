import React, { memo } from 'react'
import { Stack, TextField, Typography } from '@mui/material';
import { useMainStore } from '@/stores/store-provider';
import { MultiLangFieldsType } from '@/data/admin/defaultsForHousesInputs';

type Props = Readonly<{
    legend: string;
    nameAttr: string;
    multiLang?: boolean;
    multiline?: boolean;
}>

const HouseFieldset = memo(function HouseFieldset({ legend, nameAttr, multiLang, multiline }: Props) {
    const multiLangField = useMainStore((state) => state.houseAdding[nameAttr as MultiLangFieldsType]);
    const field = useMainStore((state) => (state?.houseAdding[nameAttr as keyof typeof state.houseAdding]) as string)
    const setHouseData = useMainStore((state) => state.setHouseAdding);

    if (!multiLang) return (
        <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component={'legend'}>{legend}</Typography>
            <TextField
                label=""
                id={nameAttr}
                name={nameAttr}
                variant="outlined"
                type='text'
                value={field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHouseData(houseData => {
                        if (houseData) {
                            return {
                                ...houseData,
                                [nameAttr]: e.target.value.replace(/[^a-z0-9-]/gi, '')
                            }
                        }
                        return houseData
                    }
                    )}
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
                value={multiLangField['uk' as Language]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHouseData(houseData => {
                        if (houseData) {
                            return {
                                ...houseData,
                                [nameAttr]: {
                                    ...houseData[nameAttr as MultiLangFieldsType],
                                    'uk': e.target.value
                                }
                            }
                        }
                        return houseData
                    }
                    )}
            />
            <TextField
                label="EN:"
                id={`${nameAttr}-en`}
                name={`${nameAttr}-en`}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                value={multiLangField['en' as Language]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHouseData(houseData => {
                        if (houseData) {
                            return {
                                ...houseData,
                                [nameAttr]: {
                                    ...houseData[nameAttr as MultiLangFieldsType],
                                    'en': e.target.value
                                }
                            }
                        }
                        return houseData
                    }
                    )}
            />
            <TextField
                label="RU:"
                id={`${nameAttr}-ru`}
                name={`${nameAttr}-ru`}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? 4 : undefined}
                required
                value={multiLangField['ru' as Language]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHouseData(houseData => {
                        if (houseData) {
                            return {
                                ...houseData,
                                [nameAttr]: {
                                    ...houseData[nameAttr as MultiLangFieldsType],
                                    'ru': e.target.value
                                }
                            }
                        }
                        return houseData
                    }
                    )}
            />
        </Stack>
    )
})

export default HouseFieldset