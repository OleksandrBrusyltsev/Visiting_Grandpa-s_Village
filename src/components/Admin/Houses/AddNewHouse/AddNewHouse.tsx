"use client";
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material'

import { useMainStore } from '@/stores/store-provider';
import HouseFieldset from './components/HouseFieldset';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import HouseSelect from '../../UI/HouseSelect/HouseSelect';
import { initialAdminState } from '@/stores/adminSlice';
import { fieldsetData } from '@/data/admin/defaultsForHousesInputs';
import NumberFields from './components/NumberFields';
import SimpleGallery from '../EditHouse/components/SimpleGallery';

type Props = Readonly<{
    housesList: SingleHousesListType
}>

const initialPhotos: File[] = [];

export default function AddNewHouse({ housesList }: Props) {
    const { refresh } = useRouter();

    const [loading, setLoading] = React.useState(false);

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const photosEditing = useMainStore((state) => state?.photosEditing);
    const setHouseData = useMainStore((state) => state.setHouseData);
    const setIsDirtyPage = useMainStore(state => state.setIsDirtyPage);
    
    const formRef = useRef<HTMLFormElement>(null);
    const resetGalleryRef = useRef<ResetType | null>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
        resetGalleryRef.current?.reset();
        setHouseData(initialAdminState.houseData, true);
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        if(photosEditing.length === 0) {
            setDialogOpen(true, 'error', 'Ви не вибрали фото для галереї!');
        } else {
            setLoading(true);

            const formData = new FormData(e.target as HTMLFormElement);

            //вытягиваем файлы изображений со стейта компонента FileUploadWithPreview и добавляем их в FormData
            photosEditing.forEach((file, index) => {
                formData.append(`photo${index}`, file.raw);
            });

            console.log(Object.fromEntries(formData));

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
                    handleResetForm();
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
                '& .MuiTextField-root': { m: 1, ml: 0, },
                '@media (max-width: 1280px)': {
                   maxWidth: 'initial',
               }
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            className='@container'
        >

            <HouseFieldset
                legend={'Назва шляху в адресному рядку (формат запису через дефіс: hatynka-dida-moroza)'}
                nameAttr="name"
            />

            <Typography>Фото для галереї на сторінці будинку</Typography>
            <SimpleGallery photo={initialPhotos} ref={resetGalleryRef} />
            {
                fieldsetData.map(({ legend, nameAttr, multiLang, multiline }, index) => (
                    <HouseFieldset
                        key={nameAttr}
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
            }}>
                <Typography component={'legend'}>Вартість проживання</Typography>
                <NumberFields />
            </Stack>

            <HouseSelect housesList={housesList} />

            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>
    )
}