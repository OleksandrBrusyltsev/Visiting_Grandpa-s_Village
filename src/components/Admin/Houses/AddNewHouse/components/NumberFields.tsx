import React, { memo } from 'react'
import { TextField } from '@mui/material';

import { extraFieldsetData } from '@/data/admin/defaultsForHousesInputs';
import { validateField } from '@/functions/validateField';
import { useMainStore } from '@/stores/store-provider';
import { AdminSlice } from '@/stores/adminSlice';

type Props = Readonly<{
    children?: React.ReactNode;
}>;

const NumberFields = memo(function NumberFields({ children }: Props) {
    const houseData = useMainStore((state) => state.houseData);
    const setHouseData = useMainStore((state) => state.setHouseData);

    const getGridItemSize = (index: number) => {
        const lastItemIndex = children ? extraFieldsetData.length : extraFieldsetData.length - 1;
        const isLastOdd = (lastItemIndex + 1) % 2;
        if (index === lastItemIndex) {
            return `col-span-12 @[1024px]:col-span-${isLastOdd ? 12 : 6}`
        } else return 'col-span-12 @[1024px]:col-span-6';
    };

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newValue = +e.target.value.replace(/\D/g, '');
                                if (houseData && houseData[nameAttr] === newValue) return;
                                setHouseData((houseData: any) => {
                                    const newValue = +e.target.value.replace(/\D/g, '');
                                    if (houseData) {
                                        houseData[nameAttr] = newValue;
                                    }
                                    return houseData
                                })
                            }}
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