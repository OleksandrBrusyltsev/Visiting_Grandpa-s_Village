"use client";
import React from 'react'
import { Box, Fab, MenuItem, Stack, TextField, Typography, Zoom } from '@mui/material'
import { SxProps } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import FileUploadWithPreview from '../../UI/FileUploadWithPreview/FileUploadWithPreview'

type Props = {
    housesList: {
        id: number
        name: string
        title: string
}[] }

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

export default function AddNewHouse({ housesList }: Props) {
    const [showFab, setShowFab] = React.useState(false);
    
    const formRef = React.useRef<HTMLFormElement>(null);
    const coverRef = React.useRef<{reset: () => void} | null>(null); 
    const galleryRef = React.useRef<{ reset: () => void } | null>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!coverRef.current || !galleryRef.current) return
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        handleResetForm();
        coverRef.current.reset();
        galleryRef.current.reset();
    }

    const fabs = [
        {
            color: 'primary' as 'primary',
            sx: fabStyle.save as SxProps,
            icon: <SaveOutlinedIcon />,
            label: 'Save',
            type: 'submit' as 'submit',
        },
        {
            color: 'secondary' as 'secondary',
            sx: fabStyle.reset as SxProps,
            icon: <AutorenewOutlinedIcon />,
            label: 'Reset',
            type: 'reset' as 'reset',
        }
    ]


    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowFab(true);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Box sx={{
            maxWidth: '60%', minWidth: 900, mx: 'auto', 
        }}>
            <Typography variant="h3" textAlign={"center"} mb={5}>Сторінка додавання нового будиночка</Typography>
            <Box
                component="form"
                ref={formRef}
                sx={{
                    display: 'flex', flexDirection: 'column', gap: 5, '& .MuiTextField-root': { m: 1, ml: 0, } }}
                // noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography component={'legend'}>Назва шляху в адресному рядку (формат запису через дефіс: hatynka-dida-moroza)</Typography>
                    <TextField
                        label=""
                        id="name"
                        name="name"
                        variant="outlined"
                        required
                    />
                </Stack>

                <FileUploadWithPreview label={'Фото будинку на карточці'} inputName={"cover_photo"} ref={coverRef} />
                <FileUploadWithPreview label={'Фото для галереї на сторінці будинку'} inputName={"photo"} ref={galleryRef} multiple/>
                    
                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px'}}>
                    <Typography component={'legend'}>Назва будинку на карточці</Typography>
                    <TextField
                        label="UK:"
                        id="uk-title"
                        name="uk-title"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="EN:"
                        id="en-title"
                        name="en-title"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="RU:"
                        id="ru-title"
                        name="ru-title"
                        variant="outlined"
                        required
                    />
                </Stack>

                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px' }}>
                    <Typography component={'legend'}>Назва будинку у заголовку на власній сторінці</Typography>
                    <TextField
                        label="UK:"
                        id="uk-long_title"
                        name="uk-long_title"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="EN:"
                        id="en-long_title"
                        name="en-long_title"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="RU:"
                        id="ru-long_title"
                        name="ru-long_title"
                        variant="outlined"
                        required
                    />
                </Stack>

                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px' }}>
                    <Typography component={'legend'}>Текст з назвою будинку на власній сторінці (Дідусь показує, де побудував будиночок)</Typography>
                    <TextField
                        label="UK:"
                        id="uk-decor_text"
                        name="uk-decor_text"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="EN:"
                        id="en-decor_text"
                        name="en-decor_text"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="RU:"
                        id="ru-decor_text"
                        name="ru-decor_text"
                        variant="outlined"
                        required
                    />
                </Stack>

                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px' }}>
                    <Typography component={'legend'}>Опис будинку (для виділення тексту жирним шрифтом необхідно використати зірочки: **текст**)</Typography>
                    <TextField
                        multiline
                        label="UK:"
                        id="uk-description"
                        name="uk-description"
                        variant="outlined"
                        required
                    />
                    <TextField
                        multiline
                        label="EN:"
                        id="en-description"
                        name="en-description"
                        variant="outlined"
                        required
                    />
                    <TextField
                        multiline
                        label="RU:"
                        id="ru-description"
                        name="ru-description"
                        variant="outlined"
                        required
                    />
                </Stack>

                <Stack component="fieldset" sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid grey', p: 2, borderRadius: '8px' }}>
                    <Typography component={'legend'}>Вартість проживання</Typography>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="Кількість основний гостей"
                            type="number"
                            sx={{
                                flex: 1,
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="max_adults"
                            name="max_adults"
                            variant="outlined"
                            required
                            defaultValue={2}
                        />
                        <TextField
                            label="Вартість проживання (грн)"
                            type="number"
                            sx={{
                                flex: 1,

                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="rental_price"
                            name="rental_price"
                            variant="outlined"
                            required
                        />
                    </Stack>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="Кількість додаткових гостей (дорослих)"
                            type="number"
                            sx={{
                                flex: 1,
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="extra_adults"
                            name="extra_adults"
                            variant="outlined"
                            required
                            defaultValue={0}
                        />
                        <TextField
                            label="Вартість додаткового місяця (для дорослого) (грн)"
                            type="number"
                            sx={{
                                flex: 1,
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="extra_adult_price"
                            name="extra_adult_price"
                            variant="outlined"
                            required
                            defaultValue={0}
                        />
                    </Stack>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="Кількість додаткових гостей (дітей)"
                            type="number"
                            sx={{
                                flex: 1,
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="extra_children"
                            name="extra_children"
                            variant="outlined"
                            required
                            defaultValue={0}
                        />

                        <TextField
                            label="Вартість додаткового місяця (для дітей) (грн)"
                            type="number"
                            sx={{
                                flex: 1,
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    'WebkitAppearance': 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    'MozAppearance': 'textfield',
                                }
                            }}
                            id="extra_children_price"
                            name="extra_children_price"
                            variant="outlined"
                            required
                            defaultValue={0}
                        />
                    </Stack>
                    <TextField
                        label="Знижка у відсотках (%)"
                        slotProps={{ htmlInput: { pattern: '[0-9]*', min: 0, max: 100 } }}
                        type="number"
                        sx={{
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                'MozAppearance': 'textfield',
                            }
                        }}
                        id="discount_percent"
                        name="discount_percent"
                        variant="outlined"
                        required
                        defaultValue={0}
                    />
                </Stack>
               
                <TextField
                    label="Тип будинку"
                    id="house_type"
                    name="house_type"
                    select
                    required
                    defaultValue={''}
                    helperText="Якщо номер є частиною іншого будинку, треба вибрати його назву"
                >
                    {[{ id: 589486, name: 'null', title: 'ОКРЕМИЙ БУДИНОК' }, ...housesList].map((option) => (
                            <MenuItem key={option.id} value={option.name} >
                                {option.title}
                            </MenuItem>
                        ))}
                </TextField>
                
                <Stack
                    sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}
                        
                >
                    {fabs.map((fab, index) => (
                        <Zoom
                            key={fab.color}
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
                            >
                                {fab.icon}
                            </Fab>
                        </Zoom>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}