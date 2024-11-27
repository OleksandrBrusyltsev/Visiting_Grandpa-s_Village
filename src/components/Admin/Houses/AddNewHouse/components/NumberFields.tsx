import React, { memo } from 'react'
import { TextField } from '@mui/material';

import { extraFieldsetData } from '@/data/admin/defaultsForHousesInputs';
import { validateField } from '@/functions/validateField';
import { useMainStore } from '@/stores/store-provider';
import { AdminSlice } from '@/stores/adminSlice';

type Props = {
    children?: React.ReactNode;
    as: 'adding' | 'editing';
}

const NumberFields = memo(function NumberFields({ children, as }: Props) {
    const houseData: Omit<HouseItem, "photo"> & { photo: (string | File)[] } | null =
        useMainStore((state) => {
            if (as === 'editing') {
                return state.houseEditing
            }
            return state.houseAdding
        });
    const setHouseData: typeof houseData extends infer T ? AdminSlice['setHouseAdding'] | AdminSlice['setHouseEditing'] : never =
        useMainStore((state) => {
            if (as === 'editing') {
                return state.setHouseEditing
            }
            return state.setHouseAdding
        });

    const lastItemIndex = children ? extraFieldsetData.length : extraFieldsetData.length - 1;
    const isLastOdd = (lastItemIndex + 1) % 2;

    const getGridItemSize = (index: number) => index === lastItemIndex ? `col-span-12 @[1024px]:col-span-${isLastOdd ? 12 : 6}` :
        'col-span-12 @[1024px]:col-span-6';

    if (!houseData) return

    return (
        <div className='grid grid-cols-12 gap-4 w-full'>
            {extraFieldsetData.map(({ label, nameAttr, min }, index) => {
                const { error, color, errorText, warningText } =
                    validateField(nameAttr, houseData, min);

                return (
                    <div className={getGridItemSize(index)} key={label}>
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
                            value={houseData?.[nameAttr]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setHouseData((houseData: any
                                ) => {
                                    if (houseData) {
                                        (houseData[nameAttr]) = +e.target.value.replace(/\D/g, '');
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
                    </div>
                )
            })}
            {children && <div className={getGridItemSize(extraFieldsetData.length)} style={{
                alignSelf: 'center'
            }} key={'children'}>
                {children}
            </div>}
        </div>
    )
})

export default NumberFields