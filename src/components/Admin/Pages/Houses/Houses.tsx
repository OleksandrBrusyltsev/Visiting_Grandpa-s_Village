"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, styled, Tab, Tabs } from '@mui/material';

import Icon from '@/components/ui/Icon/Icon';
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { useMainStore } from '@/stores/store-provider';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import {ResizableContainer} from '../../UI/ResizableContainer/ResizableContainer';

import s from './Houses.module.scss';

type Props = { data: HouseItem }

export const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            className={`${value !== index && 'opacity-0 invisible h-0 overflow-hidden'} ` + className}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}
export default function HousesPage({ data }: Props) {
    const {
        id,
        title,
        long_title,
        decor_text,
        description,
        cover_photo
    } = data;

    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = React.useState<string>(cover_photo);
    const coverPhotoRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
        } else {
            setPreview(cover_photo);
        }
    }

    const handleResetForm = () => {
        formRef.current?.reset();
        setPreview(cover_photo);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append('name', '');
        formData.append('rental_price', '0');
        formData.append('max_adults', '0');
        formData.append('is_available', 'true');
        formData.append('discount_percent', '0');
        formData.append('extra_adults', '0');
        formData.append('extra_children', '0');
        formData.append('extra_adult_price', '0');
        formData.append('extra_children_price', '0');
        formData.append('house_type', 'null');
        formData.append('photo', '');

        try {
            const response = await fetch('/api/admin/houses/edit?id=' + id, {
                method: 'PUT',
                body: formData
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setDialogOpen(true, 'success', data.description);
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

    return (
        <>
            <Box component='form' ref={formRef} onSubmit={handleSubmit}>
                <HiddenInput
                    type="file"
                    name={`${cover_photo === preview ? '' : 'cover_photo'}`}
                    accept={"image/png, image/jpeg"}
                    ref={coverPhotoRef}
                    onChange={handleFileChange}
                />
                <HiddenInput
                    type='text'
                    name={`${cover_photo === preview ? 'cover_photo' : ''}`}
                    defaultValue={cover_photo}
                />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleChangeTab} aria-label="basic tabs example">
                        {
                            ['uk', 'ru', 'en'].map((lang) => (
                                <Tab key={lang} label={lang} />
                            ))
                        }
                    </Tabs>
                </Box>
                <ResizableContainer>
                    {
                        ['uk', 'ru', 'en'].map((lang, index) => (
                            <CustomTabPanel value={activeTab} index={index} key={lang} >
                                <section className={`${s.hero} container-admin`}>
                                    <div className={s.heroWrapper}>
                                        <Input name={`title-${lang}`} className={`${s.descr1} bg-transparent`} defaultValue={title[lang as keyof typeof title]} />
                                        <Input name={`long_title-${lang}`} className={`${s.descr2} bg-transparent`} defaultValue={long_title[lang as keyof typeof long_title]} />
                                        <div
                                            className={s.grandpa}
                                            onClick={() => coverPhotoRef.current?.click()}
                                        >
                                            <Image
                                                fill
                                                alt="Grandpa photo"
                                                src={preview}
                                                sizes="100vw"
                                            />
                                        </div>
                                        <Icon name="curve-houses" className={s.curve} />
                                    </div>
                                </section>
                                <section className={s.map}>
                                    <div className={s.mapWrapper}>
                                        <Image
                                            fill
                                            alt={"Карта еко садиби Дідуся"}
                                            src="/images/backgrounds/illustration-map.png"
                                            sizes="100vw"
                                        />
                                    </div>
                                    <div className={s.cloudBackground}>
                                        <Icon name="map-cloud" className={s.cloud} />
                                    </div>
                                </section>
                                <div className={s.textWrapper}>
                                    <Input name={`decor_text-${lang}`} className={s.text} defaultValue={decor_text[lang as keyof typeof decor_text]} />
                                    <Input name={`description-${lang}`} className={s.text} defaultValue={description[lang as keyof typeof description]} />
                                </div>
                            </CustomTabPanel>

                        ))
                    }
                </ResizableContainer>

                <SubmitFabGroup
                    loading={loading}
                    onReset={handleResetForm}
                    onSubmit={() => { }}
                />
            </Box>
        </>

    )
}