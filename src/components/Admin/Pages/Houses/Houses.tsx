"use client";

import React, { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs } from '@mui/material';

import { ResizableContainer } from '@/components/Admin/UI/ResizableContainer/ResizableContainer';
import SubmitFabGroup from '@/components/Admin/UI/SubmitFabGroup/SubmitFabGroup';
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { useMainStore } from '@/stores/store-provider';
import Icon from '@/components/ui/Icon/Icon';

import s from './Houses.module.scss';
import { locales } from '@/data/locales';
import showErrors from '@/functions/showErrors';

type Props = Readonly<{ data: HouseItem }>;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string
}

export const CustomTabPanel = forwardRef<HTMLDivElement | null, Readonly<TabPanelProps>>(function CustomTabPanel(props, ref) {

    const { children, value, index, className = '', ...other } = props;

    return (
        <div
            ref={ref}
            className={`${value !== index ? 'opacity-0 invisible h-0 overflow-hidden ' : ''}` + className}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {children}
        </div>
    );
})

const mockObj = {
    name: '',
    rental_price: '0',
    max_adults: '0',
    is_available: 'true',
    discount_percent: '0',
    extra_adults: '0',
    extra_children: '0',
    extra_adult_price: '0',
    extra_children_price: '0',
    house_type: 'null'
};

export default function HousesPage({ data }: Props) {

    const {
        id,
        title,
        long_title,
        decor_text,
        description,
        photo,
    } = data;

    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);

    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = React.useState<string | File>(photo[0]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(file);
        } else {
            setPreview(photo[0]);
        }
        setIsDirtyPage(true);
    }

    const handleResetForm = () => {
        formRef.current?.reset();
        setPreview(photo[0]);
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        if (!formRef.current?.checkValidity()) {
            showErrors(formRef.current, setDialogOpen, true);
        } else {
            setLoading(true);
            const formData = new FormData(e.currentTarget);

            for (const [key, value] of Object.entries(mockObj)) {
                formData.append(key, value);
            }

            formData.append('photo1', preview);

            try {
                const response = await fetch('/api/admin/houses/edit?id=' + id, {
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

    return (
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='relative' noValidate>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                            <section className={s.hero}>
                                <div className={s.heroWrapper}>
                                    <Input name={`title-${lang}`} className={`${s.descr1} bg-transparent`} defaultValue={title[lang]} />
                                    <Input name={`long_title-${lang}`} className={`${s.descr2} bg-transparent`} defaultValue={long_title[lang]} />
                                    <div className={s.grandpa}>
                                        <Image
                                            fill
                                            alt="Grandpa photo"
                                            src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)}
                                            sizes="100vw"
                                        />
                                        <input
                                            type="file"
                                            title=''
                                            accept='image/*'
                                            className={`absolute inset-0 opacity-0 cursor-pointer`}
                                            onChange={handleFileChange}
                                            tabIndex={0} />
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
                                <Input name={`decor_text-${lang}`} className={`${s.text} bg-transparent`} defaultValue={decor_text[lang]} />
                                <Input name={`description-${lang}`} className={`${s.text} bg-transparent`} defaultValue={description[lang]} />
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

    )
}