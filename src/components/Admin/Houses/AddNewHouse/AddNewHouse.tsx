"use client";
import React, { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material'

import { useMainStore } from '@/stores/store-provider';
import FileUploadWithPreview from './components/FileUploadWithPreview'
import HouseFieldset from './components/HouseFieldset';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import HouseSelect from '../../UI/HouseSelect/HouseSelect';
import { initialAdminState } from '@/stores/adminSlice';
import { fieldsetData } from '@/data/admin/defaultsForHousesInputs';
import NumberFields from './components/NumberFields';

type Props = Readonly<{
    housesList: SingleHousesListType
}>
export default function AddNewHouse({ housesList }: Props) {
    const { refresh } = useRouter();

    const [loading, setLoading] = React.useState(false);

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const { photo } = useMainStore((state) => state.houseAdding);
    const setHouseData = useMainStore((state) => state.setHouseAdding);
    const setIsDirtyPage = useMainStore(state => state.setIsDirtyPage);

    useLayoutEffect(() => {
        setHouseData(initialAdminState.houseAdding, true);
    }, [setHouseData, setIsDirtyPage]);

    const formRef = React.useRef<HTMLFormElement>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
        setHouseData(initialAdminState.houseAdding);
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        //вытягиваем файлы изображений со стейта компонента FileUploadWithPreview и добавляем их в FormData
        photo.forEach((file, index) => {
            formData.append(`photo${index}`, file);
        });

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
            className='@container'
        >

            <HouseFieldset
                legend={'Назва шляху в адресному рядку (формат запису через дефіс: hatynka-dida-moroza)'}
                nameAttr="name"
            />

            <FileUploadWithPreview label={'Фото для галереї на сторінці будинку'} nameAttr={"photo"} multiple />

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
                <NumberFields as='adding' />
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