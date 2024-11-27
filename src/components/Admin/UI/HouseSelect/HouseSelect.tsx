import React, { memo } from 'react'
import { TextField } from '@mui/material'

type Props = {
    housesList: SingleHousesListType
    defaultValue?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const HouseSelect = memo(function HouseSelect({ housesList, ...rest }: Props) {
    return (
        <TextField
            label="Тип будинку"
            id="house_type"
            name="house_type"
            select
            slotProps={{
                select: {
                    native: true,
                },
            }}
            fullWidth
            {...rest}
            helperText="Якщо номер є частиною іншого будинку, треба вибрати його назву"
        >
            {[{ id: 589486, name: 'null', title: 'ОКРЕМИЙ БУДИНОК' }, ...housesList].map((option) => (
                <option key={option.id} value={option.name} >
                    {option.title}
                </option>
            ))}
        </TextField>
    )
});
export default HouseSelect;