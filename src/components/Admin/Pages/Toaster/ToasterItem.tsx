import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { Paper, Radio, Stack, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';

import HouseFieldset from '../../Houses/AddNewHouse/components/HouseFieldset';
import { useMainStore } from '@/stores/store-provider';

type Props = Readonly<{
    data: AdvToaster;
    activeToaster: AdvToaster | null;
    setActiveToaster: () => void;
    handleDataChange: () => void;
    position: number,
    ref: React.ForwardedRef<ResetType>
}>

const ToasterItem = forwardRef<ResetType, Props>(function ToasterItem({
    data,
    activeToaster,
    setActiveToaster,
    position,
    handleDataChange
}, ref) {
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    useImperativeHandle(ref, () => ({
        reset() {
            setDateRange({
                start: dayjs(data.start_date),
                end: dayjs(data.end_date)
            });
        }
    }))

    const [dateRange, setDateRange] = useState({
        start: dayjs(data.start_date),
        end: dayjs(data.end_date)
    });

    const handleChangeActiveToaster = () => {
        setActiveToaster();
        handleDataChange();
    }

    return (
        <Stack className={'toaster-item'} sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0,
            width: '90%',
            maxWidth: 1200,
            mx: 'auto',
            borderRadius: 1,
            bgcolor: data.id === activeToaster?.id ? 'rgba(63, 85, 64, 0.6)' : 'rgba(127, 129, 127, 0.6)',
        }}>
            <div
                className='min-h-[100%] grid items-center cursor-pointer'
                onClick={handleChangeActiveToaster}
            >
                <Radio
                    disableRipple
                    checked={data.id === activeToaster?.id}
                    onChange={handleChangeActiveToaster}
                    sx={{
                        px: 2,
                        '&': {
                            verticalAlign: 'middle',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: 28,
                        },
                        color: 'rgba(63, 85, 64, 0.8)',
                        '&.Mui-checked': {
                            color: 'rgba(63, 85, 64, 1)',
                        },
                    }}
                />
            </div>

            <Paper elevation={data.id === activeToaster?.id ? 12 : 1} sx={{
                flex: 1,
                padding: '2rem',
                display: 'grid',
                gridTemplateAreas:
                    `"start end timeout"
                            "translations translations translations"`,
                gap: 2,
                // opacity: data.id === activeToaster?.id ? 1 : 0.7,
                position: data.id === activeToaster?.id ? 'relative' : 'absolute',
                // pointerEvents: data.id === activeToaster?.id ? 'initial' : 'none',
                userSelect: data.id === activeToaster?.id ? 'auto' : 'initial',
                height: data.id === activeToaster?.id ? 'initial' : '1px',
                overflow: 'hidden',
                opacity: data.id === activeToaster?.id ? '1' : '0',
            }}>
                <input type="hidden" value={data.id} name={`id-${position}`} />
                <DateTimePicker
                    label="З"
                    value={dateRange.start}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            required: true
                        }
                    }}
                    onChange={(newValue: Dayjs | null) => {
                        if (newValue) {
                            setDateRange({
                                start: newValue,
                                end: dateRange.end
                            });
                        };
                        handleDataChange();
                        setIsDirtyPage(true);
                    }}
                    name={`start_date-${position}`}
                    viewRenderers={{
                        hours: null,
                        minutes: null,
                        seconds: null,
                    }}
                    views={['year', 'month', 'day']}
                    sx={{
                        gridArea: 'start'
                    }}
                />
                <DateTimePicker
                    label="По"
                    value={dateRange.end}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            required: true
                        }
                    }}
                    onChange={(newValue: Dayjs | null) => {
                        if (newValue) {
                            setDateRange({
                                start: dateRange.start,
                                end: newValue
                            });
                        };
                        handleDataChange();
                        setIsDirtyPage(true);
                    }}
                    name={`end_date-${position}`}
                    viewRenderers={{
                        hours: null,
                        minutes: null,
                        seconds: null,
                    }}
                    views={['year', 'month', 'day']}
                    sx={{
                        gridArea: 'end'
                    }}
                />
                <TextField
                    label="Таймаут (в хвилинах)"
                    name={`timeout-${position}`}
                    defaultValue={data.timeout}
                    type='number'
                    required
                    onChange={() => {
                        handleDataChange();
                        setIsDirtyPage(true);
                    }}
                    sx={{
                        gridArea: 'timeout'
                    }}
                />
                <Stack sx={{
                    gridArea: 'translations'
                }}>
                    <HouseFieldset
                        legend="Текст повідомлення"
                        value={data.translations}
                        nameAttr={(lang: string) => `translations-${lang}-${position}`}
                        multiline
                        handleDataChange={handleDataChange}
                        multiLang
                    />
                </Stack>
            </Paper>

            <Paper
                elevation={data.id === activeToaster?.id ? 12 : 1}
                sx={{
                    flex: 1,
                    padding: '2rem',
                    opacity: data.id === activeToaster?.id ? 1 : 0.7,
                    // pointerEvents: data.id === activeToaster?.id ? 'initial' : 'none',
                    // userSelect: data.id === activeToaster?.id ? 'auto' : 'initial',
                    // height: data.id === activeToaster?.id ? 'initial' : '1px',
                    // overflow: 'hidden',
                    visibility: data.id === activeToaster?.id ? 'hidden' : 'initial',
                    position: data.id !== activeToaster?.id ? 'initial' : 'absolute',
                }}
            >
                <TextField
                    label="Текст повідомлення)"
                    defaultValue={data.translations.uk}
                    fullWidth
                />
            </Paper>


        </Stack>
    )
})

export default memo(ToasterItem);