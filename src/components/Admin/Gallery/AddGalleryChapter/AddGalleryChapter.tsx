"use client";
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material'

import FileUploadWithPreview from '../../Houses/AddNewHouse/components/FileUploadWithPreview';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import { useMainStore } from '@/stores/store-provider';
import HouseFieldset from '../../Houses/AddNewHouse/components/HouseFieldset';
import SimpleGallery from '../../Houses/EditHouse/components/SimpleGallery';

const initialPhotos: File[] = [];

export default function AddGalleryChapter() {
    const { refresh } = useRouter();

    const [loading, setLoading] = React.useState(false);

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const photosEditing = useMainStore((state) => state?.photosEditing);
    const setIsDirtyPage = useMainStore(state => state.setIsDirtyPage);

    const formRef = React.useRef<HTMLFormElement>(null);
    const resetGalleryRef = useRef<ResetType | null>(null);
    const coverRef = useRef<ResetType & {photos: File[]} | null>(null);

    const handleResetForm = () => {
        formRef.current?.reset();
        coverRef.current?.reset();
        resetGalleryRef.current?.reset();
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        if(coverRef.current?.photos.length === 0 && photosEditing.length === 0) {
            setDialogOpen(true, 'error', 'Ви не вибрали фото обкладинки розділу галереї та не додали фото для галереї!');
        } else if(coverRef.current?.photos.length === 0 || photosEditing.length === 0) {
            const msg = coverRef.current?.photos.length === 0 
                ? 'Ви не вибрали фото обкладинки розділу галереї!' 
                : 'Ви не вибрали фото для галереї!';
            setDialogOpen(true, 'error', msg);
        } else {
            setLoading(true);

            const formData = new FormData(e.target as HTMLFormElement);

            //вытягиваем файлы изображений со стейта компонента FileUploadWithPreview и добавляем их в FormData
            photosEditing.forEach((file, index) => {
                formData.append(`photo${index}`, file.raw);
            });
            
            formData.append('cover', coverRef.current?.photos[0]!);
            
            try {
                const response = await fetch('/api/admin/gallery/add', {
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
                legend={'Назва шляху в адресному рядку (формат запису через дефіс: blue-lakes)'}
                nameAttr="name"
            />

            <HouseFieldset
                legend={'Альтернативний текст для обкладинки розділу галереї'}
                nameAttr="alt"
                multiLang={true}
            />

            <FileUploadWithPreview ref={coverRef} label={'Фото для обкладинки розділу галереї'} />
            
            <Typography>Фото для галереї на сторінці розділу галереї</Typography>
            
            <SimpleGallery photo={initialPhotos}
                classNames={{
                    wrapper: 'max-w-[1180px] !auto-rows-auto select-none grid grid-cols-1 @[768px]:grid-cols-3 @[1280px]:grid-cols-4 gap-[9px] @[1280px]:gap-[24px]',
                    item: 'max-w-[550px] p-[10px] rounded-[10px] bg-[#c2bfb7b3] aspect-[1.16] @[768px]:aspect-[1.09] @[1280px]:aspect-[1.11]'
                }}
                ref={resetGalleryRef}
            />


            <HouseFieldset
                key={'title'}
                legend={"Назва розділу галереї"}
                nameAttr={'title'}
                multiLang={true}
            />
            <HouseFieldset
                key={'description'}
                legend={"Текст на сторінці розділу галереї"}
                nameAttr={'description'}
                multiLang={true}
                multiline={true}
            />


            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>
    )
}