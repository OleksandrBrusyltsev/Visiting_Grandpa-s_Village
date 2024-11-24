import React, { memo } from 'react'
import { Grid2 as Grid, Stack, TextField, Typography } from '@mui/material';

import { extraFieldsetData, NumberFieldsType } from '@/data/admin/defaultsForHousesInputs';
import { validateField } from '@/functions/validateField';
import { useMainStore } from '@/stores/store-provider';

const NumberFields = memo(function NumberFields() {
    const houseData = useMainStore((state) => state.houseAdding);
    const setHouseData = useMainStore((state) => state.setHouseAdding);
    return (
        <Stack component="fieldset" sx={{
            display: 'flex', flexDirection: 'column', gap: 2,
            border: '1px solid grey', p: 2, borderRadius: '8px',
            '& .MuiTextField-root input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                'WebkitAppearance': 'none',
                margin: 0,
            },
            '& .MuiTextField-root input[type=number]': {
                'MozAppearance': 'textfield',
            }
        }}>
            <Typography component={'legend'}>Вартість проживання</Typography>
            <Grid container spacing={2}>
                {extraFieldsetData.map(({ label, nameAttr, min }, index) => {
                    const { error, color, errorText, warningText } =
                        validateField(nameAttr, houseData!, min);

                    return (
                        <Grid size={{ xs: 12, md: index === extraFieldsetData.length - 1 ? 12 : 6 }} key={label} >
                            <TextField
                                label={label}
                                color={color}
                                id={nameAttr}
                                name={nameAttr}
                                variant="outlined"
                                fullWidth
                                required
                                focused={Boolean(warningText)}
                                error={error}
                                value={houseData?.[nameAttr as keyof typeof houseData]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setHouseData(houseData => {
                                        if (houseData) {
                                            (houseData[nameAttr as NumberFieldsType]) = +e.target.value.replace(/[^0-9]/g, '');
                                        }
                                        return houseData
                                    }
                                    )}
                                helperText={errorText || warningText}
                                slotProps={{
                                    formHelperText: {
                                        sx: (theme) => ({
                                            color: color && theme.palette[color].main
                                        })
                                    }
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Stack>
    )
})

export default NumberFields