"use client";
import React, { useEffect } from 'react'
import { Box, Fab, Grid2 as Grid, Stack, TextField, Tooltip, Typography, Zoom } from '@mui/material'
import { SxProps } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import FileUploadWithPreview from '../../UI/FileUploadWithPreview/FileUploadWithPreview'
import { HouseFieldset } from './HouseFieldset';

type Props = {
    housesList: {
        id: number
        name: string
        title: string
    }[]
}

const fabStyle = {
    save: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: 'rgb(63, 85, 64)',
        color: 'white',
        '&:hover': {
            bgcolor: 'rgb(31, 44, 31)',
        }
    },
    reset: {
        position: 'fixed',
        bottom: 95,
        right: 16,
        bgcolor: 'rgba(180, 133, 79, 0.6)',
        color: 'white',
        '&:hover': {
            bgcolor: 'rgb(180, 133, 79)',
        }
    },
};

const fabs = [
    {
        color: 'primary' as 'primary',
        sx: fabStyle.save as SxProps,
        icon: <SaveOutlinedIcon />,
        label: 'Зберегти',
        type: 'submit' as 'submit',
    },
    {
        color: 'secondary' as 'secondary',
        sx: fabStyle.reset as SxProps,
        icon: <AutorenewOutlinedIcon />,
        label: 'Очистити форму',
        type: 'button' as 'button',
    }
]

const fieldsetData = [
    {
        legend: 'Назва будинку на карточці',
        nameAttr: "title",
        multiLang: true,
    },
    {
        legend: 'Назва будинку у заголовку на власній сторінціНазва будинку у заголовку на власній сторінці',
        nameAttr: "long_title",
        multiLang: true
    },
    {
        legend: 'Текст з назвою будинку на власній сторінці (Дідусь показує, де побудував будиночок)',
        nameAttr: "decor_text",
        multiLang: true
    }, {

        legend: 'Опис будинку (для виділення тексту жирним шрифтом необхідно використати зірочки: **текст**)',
        nameAttr: "description",
        multiLang: true
    }

]

const extraFieldsetData = [
    {
        label: "Кількість основний гостей",
        nameAttr: "max_adults",
        defaultValue: 2
    },
    {
        label: "Вартість проживання (грн)",
        nameAttr: "rental_price",
    },
    {
        label: "Кількість додаткових гостей (дорослих)",
        nameAttr: "extra_adults",
        defaultValue: 0
    },
    {
        label: "Вартість додаткового місяця (для дорослого) (грн)",
        nameAttr: "extra_adult_price",
        defaultValue: 0
    },
    {
        label: "Кількість додаткових гостей (дітей)",
        nameAttr: "extra_children",
        defaultValue: 0
    },
    {
        label: "Вартість додаткового місяця (для дітей) (грн)",
        nameAttr: "extra_children_price",
        defaultValue: 0
    },
    {
        label: "Знижка у відсотках (%)",
        nameAttr: "discount_percent",
        defaultValue: 0
    },
]

export default function AddNewHouse({ housesList }: Props) {
    const [showFab, setShowFab] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>('Error');
    const [success, setSuccess] = React.useState<string | null>(null);

    const formRef = React.useRef<HTMLFormElement>(null);
    const coverRef = React.useRef<{ reset: () => void } | null>(null);
    const galleryRef = React.useRef<{ reset: () => void } | null>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
        coverRef.current?.reset();
        galleryRef.current?.reset();
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch('/api/admin/houses/add', {
                method: 'POST',
                headers: {
                },
                body: formData,
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setSuccess(data.description);
                handleResetForm();
            } else {
                const error = await response.json();
                setError(error.message)
                setLoading(false);
                return
            };
        }
        catch (error) {
            setError('Щось пішло не так, як планувалось! Спробуйте ще раз!');
            setLoading(false);
            return
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowFab(true);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    //обнуляем сообщения об успешном или неуспешном добавлении нового домика 
    useEffect(() => {
        if (!success && !error) return;
        const delay = error ? 10000 : 5000;
        
        const timeout = setTimeout(() => {
            success && setSuccess(null);
            error && setError(null);
        }, delay);
        return () => clearTimeout(timeout);
        
    }, [success, error]);

    return (
        <Box sx={{
            maxWidth: '60%', minWidth: 900, mx: 'auto',
        }}>
            <Typography variant="h3" textAlign={"center"} my={5}>Сторінка додавання нового будиночка</Typography>

            {error && (
                <Typography component="p" variant="h6" color="error" sx={{ textAlign: 'center', mb: 3 }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography component="p" variant="h6" color="success" sx={{ textAlign: 'center', mb: 3 }}>
                    {success}
                </Typography>
            )}
            <Box
                component="form"
                ref={formRef}
                sx={{
                    display: 'flex', flexDirection: 'column', gap: 5, '& .MuiTextField-root': { m: 1, ml: 0, }
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >

                <HouseFieldset
                    legend={'Назва шляху в адресному рядку (формат запису через дефіс: hatynka-dida-moroza)'}
                    nameAttr="name"
                />

                <FileUploadWithPreview label={'Фото будинку на карточці'} nameAttr={"cover_photo"} ref={coverRef} />
                <FileUploadWithPreview label={'Фото для галереї на сторінці будинку'} nameAttr={"photo"} ref={galleryRef} multiple />

                {
                    fieldsetData.map(({ legend, nameAttr, multiLang }, index) => (
                        <HouseFieldset
                            key={index}
                            legend={legend}
                            nameAttr={nameAttr}
                            multiLang={multiLang}
                        />
                    ))
                }
                
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
                        {extraFieldsetData.map(({ label, nameAttr, defaultValue }, index) => (
                            <Grid size={index === extraFieldsetData.length - 1 ? 12 : 6} key={label} >
                                <TextField
                                    label={label}
                                    type="number"
                                    id={nameAttr}
                                    name={nameAttr}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    defaultValue={defaultValue ?? ''}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

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
                    required
                    defaultValue={'null'}
                    helperText="Якщо номер є частиною іншого будинку, треба вибрати його назву"
                >
                    {[{ id: 589486, name: 'null', title: 'ОКРЕМИЙ БУДИНОК' }, ...housesList].map((option) => (
                        <option key={option.id} value={option.name} >
                            {option.title}
                        </option>
                    ))}
                </TextField>

                <Stack
                    sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}

                >
                    {fabs.map((fab, index) => (
                        <Tooltip title={fab.label} key={fab.color} placement="left">

                            <Zoom
                                
                                in={showFab}
                                timeout={300}
                                style={{
                                    transitionDelay: '300ms',
                                }}
                                unmountOnExit
                            >
                                <Fab
                                    sx={fab.sx}
                                    aria-label={fab.label}
                                    color={fab.color}
                                    type={fab.type}
                                    disabled={loading}
                                    onClick={index === fabs.length - 1 ? () => handleResetForm() : () => { }}
                                    >
                                    {fab.icon}
                                </Fab>
                            </Zoom>
                        </Tooltip>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}