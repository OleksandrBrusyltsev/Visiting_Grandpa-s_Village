"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { ResizableContainer } from '@/components/Admin/UI/ResizableContainer/ResizableContainer';
import SimpleGallery from '@/components/Admin/Houses/EditHouse/components/SimpleGallery';
import SubmitFabGroup from '@/components/Admin/UI/SubmitFabGroup/SubmitFabGroup';
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { CustomTabPanel } from '@/components/Admin/Pages/Houses/Houses';
import { useTranslations } from '@/hooks/useTranslations';
import { useMainStore } from '@/stores/store-provider';
import showErrors from '@/functions/showErrors';
import Icon from '@/components/ui/Icon/Icon';

import s from '@/components/GalleryItemPage/GalleryItemPage.module.scss';
import { locales } from '@/data/locales';
import Button from '@/components/ui/Button/Button';


type Props = Readonly<{ data: GalleryItem }>;

export default function EditChapterPage({ data }: Props) {
    const {
        description,
        photo_urls,
    } = data;

    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const t = useTranslations('Gallery', locales[activeTab], true);
    const formRef = useRef<HTMLFormElement | null>(null);
    const resetGalleryRef = useRef<ResetType | null>(null);

    const { refresh, replace } = useRouter();
    
    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);
    const photosEditing = useMainStore((state) => state?.photosEditing);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleResetForm = () => {
        formRef.current?.reset();
        resetGalleryRef.current?.reset();
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        if (!formRef.current?.checkValidity()) {
            showErrors(formRef.current, setDialogOpen);
        } else {
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            formData.append('cover-0', data.cover);
            formData.append('name-0', data.name);
            locales.forEach((lang) => {
                formData.append(`title-${lang}-0`, data.title[lang]);
                formData.append(`alt-${lang}-0`, data.alt[lang]);
            });
            photosEditing.forEach((item, index) => {
                formData.append(`photo${index}-0`, item.raw);
            })

            try {
                const response = await fetch('/api/admin/gallery/edit', {
                    method: 'PUT',
                    body: formData
                });
                if (response.ok) {
                    setLoading(false);
                    const data = await response.json();
                    setDialogOpen(true, 'success', data.description);
                    setIsDirtyPage(false);
                    refresh();
                } else {
                    const errorData = await response.json();
                    window?.scrollTo({ top: 0, behavior: 'smooth' });
                    setDialogOpen(true, 'error', errorData.message);
                    setLoading(false);
                }
            } catch (error) {
                window?.scrollTo({ top: 0, behavior: 'smooth' });
                setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
                setLoading(false);
            }
        }
    }

    const handleRemoveGalleryChapter = async () => {
        try {
            const response = await fetch('/api/admin/gallery/remove?id=' + data.id, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                setDialogOpen(true, 'success', data.description);
                replace('/dyadus_adm1n_hub');
                refresh();
            } else {
                const errorData = await response.json();
                setDialogOpen(true, 'error', errorData.message);
            }
        } catch (error) {
            setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
        }
    }

    return (
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='relative' noValidate>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                <Stack sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 10
                }}>
                    <Button label='Видалити'
                        className='hover:!bg-[#a80e0e] hover:!text-white'
                        onClick={handleRemoveGalleryChapter}
                    />
                </Stack>
                <Tabs value={activeTab} onChange={handleChangeTab} aria-label="tabs for editing page data">
                    {
                        locales.map((lang) => (
                            <Tab key={lang} label={lang} />
                        ))
                    }
                </Tabs>
            </Box>
            <ResizableContainer>
                {
                    locales.map((lang, index) => (
                        <CustomTabPanel value={activeTab} index={index} key={lang} className='container-admin'>

                            <div className={`${s.galleryItemWrapper} mt-[100px] !mb-[40px]`}>
                                <section className={`${s.hero} relative @[768px]:flex flex-row-reverse justify-between`}>
                                    {lang === 'uk' && <input type="hidden" value={data.id} name='id-0' />}
                                    <div className={`${s.grandpaWrapper} @[768px]:!relative @[768px]:!float-none`}>
                                        <Image
                                            src={"/images/grandpas/Grandpa1.png"}
                                            alt={"Grandpa photo"}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            fill
                                        />
                                    </div>
                                    <div className={`${s.heroTitle} relative grow`}>
                                        <Input name={`description-${lang}-0`}
                                            className={` bg-transparent w-full`}
                                            defaultValue={description[lang]}
                                            onChange={() => { setIsDirtyPage(true) }}
                                        />
                                    </div>
                                </section>
                                <div className={s.main}>
                                    <p className={`${s.callToClick}`}>
                                        <span className={s.desktopOnly}>{t('clickMode', { mode: 'desktop' })}</span>
                                        <span className={s.mobileOnly}>{t('clickMode', { mode: 'mobile' })}</span>
                                        <Icon name="curve-gallery-chapter" className={s.curve} />
                                    </p>
                                </div>
                            </div>
                        </CustomTabPanel>
                    ))
                }
                <section className={`pb-[50px] container-admin`}>
                    <SimpleGallery photo={photo_urls}
                        classNames={{
                            wrapper: 'max-w-[1180px] !auto-rows-auto select-none grid grid-cols-1 @[768px]:grid-cols-3 @[1280px]:grid-cols-4 gap-[9px] @[1280px]:gap-[24px]',
                            item: 'max-w-[550px] p-[10px] rounded-[10px] bg-[#c2bfb7b3] aspect-[1.16] @[768px]:aspect-[1.09] @[1280px]:aspect-[1.11]'
                        }}
                        ref={resetGalleryRef}
                    />
                </section>
            </ResizableContainer>

            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>

    )
}