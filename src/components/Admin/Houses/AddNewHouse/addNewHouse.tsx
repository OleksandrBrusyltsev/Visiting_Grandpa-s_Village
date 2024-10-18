"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Box, Grid2 as Grid, Stack, TextField, Typography } from '@mui/material'

import { useMainStore } from '@/stores/store-provider';
import FileUploadWithPreview from '../../UI/FileUploadWithPreview/FileUploadWithPreview'
import { HouseFieldset } from './HouseFieldset';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';

type Props = {
    housesList: {
        id: number
        name: string
        title: string
    }[]
}

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
        multiLang: true,
        multiline: true
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
    const { refresh } = useRouter();

    const [loading, setLoading] = React.useState(false);

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);

    const formRef = React.useRef<HTMLFormElement>(null);
    const coverRef = React.useRef<{ reset: () => void; getSelectedFiles: () => File[] } | null>(null);
    const galleryRef = React.useRef<{ reset: () => void; getSelectedFiles: () => File[] } | null>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
        coverRef.current?.reset();
        galleryRef.current?.reset();
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!coverRef.current || !galleryRef.current) return;
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        //чистим данные полученные из формы от файлов изображений, чтобы потом заменить файлами со стейта
        for (let [key, value] of Array.from(formData)) {
            if (key.startsWith('photo') || key.startsWith('cover_photo')) {
                formData.delete(key);
            }
        }
        //вытягиваем файлы изображений со стейта компонента FileUploadWithPreview
        const coverFromState = coverRef.current?.getSelectedFiles();
        const galleryFromState = galleryRef.current?.getSelectedFiles().filter(file => file);

        coverFromState[0] && formData.append('cover_photo', coverFromState[0]);
        galleryFromState && galleryFromState.forEach((file, index) => {
            formData.append(`photo${index}`, file);
        })

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
                setDialogOpen(true, 'success', data.description);
                refresh();
            } else {
                const error = await response.json();
                window?.scrollTo({ top: 0, behavior: 'smooth' });
                setDialogOpen(true, 'error', error.message);
                setLoading(false);
                return
            };
        }
        catch (error) {
            window?.scrollTo({ top: 0, behavior: 'smooth' });
            setDialogOpen(true, 'error', 'Щось пішло не так, як планувалось! Спробуйте ще раз!');
            setLoading(false);
            return
        }
    }

    return (
        <Box
            component="form"
            ref={formRef}
            sx={{
                display: 'flex',
                maxWidth: '80%',
                mx: 'auto',
                flexDirection: 'column',
                gap: 5,
                '& .MuiTextField-root': { m: 1, ml: 0, }
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
                fieldsetData.map(({ legend, nameAttr, multiLang, multiline }, index) => (
                    <HouseFieldset
                        key={index}
                        legend={legend}
                        nameAttr={nameAttr}
                        multiLang={multiLang}
                        multiline={multiline || false}
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
                        <Grid size={{ xs: 12, md: index === extraFieldsetData.length - 1 ? 12 : 6 }} key={label} >
                            <TextField
                                label={label}
                                type="number"
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
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
                // required
                defaultValue={'null'}
                helperText="Якщо номер є частиною іншого будинку, треба вибрати його назву"
            >
                {[{ id: 589486, name: 'null', title: 'ОКРЕМИЙ БУДИНОК' }, ...housesList].map((option) => (
                    <option key={option.id} value={option.name} >
                        {option.title}
                    </option>
                ))}
            </TextField>

            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>
    )
}