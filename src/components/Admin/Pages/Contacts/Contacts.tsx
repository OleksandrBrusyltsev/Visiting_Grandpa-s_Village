"use client";

import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

import HouseFieldset from '../../Houses/AddNewHouse/components/HouseFieldset';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import { useMainStore } from '@/stores/store-provider';
import { CustomTabPanel } from '../Houses/Houses';

import { locales } from '@/data/locales';

type Props = { data: ContactItem };
const singleFields = [
    {
        name: 'phone',
        label: 'Телефон'
    },
    {
        name: 'email',
        label: 'Е-mail'
    },
    {
        name: 'facebook_link',
        label: 'Facebook'
    },
    {
        name: 'instagram_link',
        label: 'Instagram'
    },
    {
        name: 'telegram_link',
        label: 'Telegram'
    },
    {
        name: 'linkedin_link',
        label: 'LinkedIn'
    }
];
const multiFields = [
    {
        name: 'address',
        label: 'Адреса',
    },
    {
        name: 'directions_from_city',
        label: 'Заголовок для опису маршруту',
    },
    {
        name: 'transit_options',
        label: 'Опис маршруту до садиби',
        multiline: true
    },
    {
        name: 'route_change_notice',
        label: 'Попередження про зміну маршруту',
    }
]
export default function Contacts({ data }: Props) {

    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);

     const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

     const handleResetForm = () => {
        formRef.current?.reset();
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/admin/contacts/edit', {
                method: 'PUT',
                body: formData
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setDialogOpen(true, 'success', data.description);
                window?.scrollTo({ top: 0, behavior: 'smooth' });
                setIsDirtyPage(false);
                refresh();
            } else {
                const errorData = await response.json();
                setLoading(false);
                setDialogOpen(true, 'error', errorData.message);
                window?.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            setLoading(false);
            window?.scrollTo({ top: 0, behavior: 'smooth' });
            setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
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
                gap: 2,
                '& .MuiTextField-root': { m: 1, ml: 0, },
                 '@media (max-width: 1280px)': {
                    maxWidth: 'initial',
                }
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            className='@container'
        >

            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                {
                    singleFields.map((item, index) => (
                        <HouseFieldset
                            key={item.name}
                            className=' lg:w-[48%] w-full'
                            legend={item.label}
                            value={data[item.name as keyof ContactItem] as string}
                            nameAttr={item.name}
                            />
                        ))
                    }
            </Box>

            {
                multiFields.map((item, index) => (
                    <HouseFieldset
                        key={item.name}
                        legend={item.label}
                        value={data[item.name as keyof ContactItem] as Record<Language, string>}
                        nameAttr={item.name}
                        multiLang={true}
                        multiline={item?.multiline}
                    />
                ))
            }

            <Typography component={'h2'} textAlign={'center'} variant='h4' mt={3}>FAQ</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                <Tabs value={activeTab} onChange={handleChangeTab} >
                    {
                        locales.map((lang) => (
                            <Tab key={lang} label={lang} />
                        ))
                    }
                </Tabs>
                {locales.map((lang, index) => (
                    <CustomTabPanel value={activeTab} index={index} key={lang} >
                        <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                            {
                                data.faq[lang].map((item, index) => (
                                    <Stack
                                        component="fieldset"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            border: '1px solid grey',
                                            p: 2,
                                            
                                            borderRadius: '8px',
                                            '& .MuiInputBase-input::-webkit-scrollbar': {
                                                width: '6px'
                                            },
                                            '& .MuiInputBase-input::-webkit-scrollbar-track': {
                                                background: 'rgb(179, 179, 179)'
                                            },

                                            '& .MuiInputBase-input::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgb(63, 85, 64)',
                                                borderRadius: 10,
                                            },
                                            '& .MuiInputBase-input::-webkit-scrollbar-thumb:hover': {
                                                backgroundColor: 'rgb(61, 73, 63)',
                                            }
                                    }}
                                        key={item.question}
                                    >
                                        <Typography component={'legend'}>{`Блок ${index + 1}`}</Typography>
                                        <HouseFieldset
                                            legend="Питання"
                                            value={item.question}
                                            nameAttr={`question-${lang}-${index}`}
                                        />
                                        <HouseFieldset
                                            legend="Відповідь"
                                            value={item.answer}
                                            nameAttr={`answer-${lang}-${index}`}
                                            multiline
                                        />
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </CustomTabPanel>
                ))}
            </Box>

            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>
    )
}