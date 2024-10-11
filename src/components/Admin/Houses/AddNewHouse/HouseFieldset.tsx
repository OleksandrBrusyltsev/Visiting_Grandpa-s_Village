import { Stack, TextField, Typography } from '@mui/material';
import React from 'react'

type Props = {
    legend: string;
    nameAttr: string;
    multiLang?: boolean;
}

export const HouseFieldset: React.FC<Props> = function HouseFieldset({ legend, nameAttr, multiLang }) {
    if (!multiLang) return (
        <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component={'legend'}>{ legend }</Typography>
            <TextField
                label=""
                id={nameAttr}
                name={nameAttr}
                variant="outlined"
                required
            />
        </Stack>
    )
    return (
      <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px' }}>
          <Typography component={'legend'}>{ legend}</Typography>
          <TextField
              label="UK:"
              id={`${nameAttr}-uk`}
              name={`${nameAttr}-uk`}
              variant="outlined"
              required
          />
          <TextField
              label="EN:"
              id={`${nameAttr}-en`}
              name={`${nameAttr}-en`}
              variant="outlined"
              required
          />
          <TextField
              label="RU:"
              id={`${nameAttr}-ru`}
              name={`${nameAttr}-ru`}
              variant="outlined"
              required
          />
      </Stack>
  )
}