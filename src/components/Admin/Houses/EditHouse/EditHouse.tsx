"use client";

import React, { memo, useEffect, useRef, useState } from 'react'
import { Box, FormControlLabel, Grid2 as Grid, Stack, Switch, Tab, Tabs, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import { ResizableContainer } from '@/components/Admin/UI/ResizableContainer/ResizableContainer';
import SubmitFabGroup from '@/components/Admin/UI/SubmitFabGroup/SubmitFabGroup';
import HouseSelect from '@/components/Admin/UI/HouseSelect/HouseSelect';
import { CustomTabPanel } from '@/components/Admin/Pages/Houses/Houses';
import HouseDescriptionPage from './components/HouseDescriptionPage'
import NumberFields from '../AddNewHouse/components/NumberFields';
import SimpleGallery from './components/SimpleGallery';
import { useMainStore } from '@/stores/store-provider';
import Button from '@/components/ui/Button/Button';
import HouseCard from './components/HouseCard'

import s from '@/components/Houses/Houses.module.scss';
import { locales } from '@/data/locales';

type Props = Readonly<{ data: HouseItem; housesList: SingleHousesListType; rooms: number }>;

const MainTitleInput = memo(function MainTitleInput({ lang }: { lang: Language }) {
    const title = useMainStore((state) => state?.houseData?.title);
    const setHouseData = useMainStore((state) => state.setHouseData);
    if (!title) return;
    return (
        <TextField
            label="Назва будинку на карточці"
            id={`title-${lang}`}
            name={`title-${lang}`}
            variant="outlined"
            multiline
            fullWidth
            required
            value={title[lang]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHouseData((houseData) => {
                    if (houseData) {
                        houseData.title = {
                            ...houseData.title, [lang]: e.target.value
                        };
                    }
                    return houseData;
                })
            }}
        />
    )
});

const DecorTextInput = memo(function DecorTextInput({ lang }: { lang: Language }) {
    const decor_text = useMainStore((state) => state?.houseData?.decor_text);
    const setHouseData = useMainStore((state) => state.setHouseData);
    if (!decor_text) return;
    return (
        <TextField
            label="Назва будинку біля Дідуся, де він вказує на карту"
            id={`decor_text-${lang}`}
            name={`decor_text-${lang}`}
            variant="outlined"
            multiline
            fullWidth
            required
            value={decor_text[lang]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHouseData((houseData) => {
                    if (houseData) {
                        houseData.decor_text = {
                            ...houseData.decor_text, [lang]: e.target.value
                        };
                    }
                    return houseData;
                })
            }}
        />
    )
});

const HouseTypeSelect = memo(function HouseTypeSelect({ housesList, house_type }:
    { housesList: SingleHousesListType; 
        house_type: string | null
     }) {
    return (
        <HouseSelect housesList={housesList} defaultValue={house_type ?? 'null'} />
    )
});

const IsAvailableCheckbox = memo(function IsAvailableCheckbox() {
    const is_available = useMainStore((state) => state?.houseData?.is_available);
    const setHouseData = useMainStore((state) => state.setHouseData);
    return (
        <FormControlLabel
            control={
                <Switch checked={is_available}
                    onChange={() => {
                        setHouseData(houseData => {
                            if (houseData) {
                                houseData.is_available = !houseData.is_available;
                            }
                            return houseData;
                        })
                    }}
                    color="success"
                />
            }
            label="Доступний для заселення"
            name='is_available'

            sx={{
                '& .MuiFormControlLabel-label': {
                    color: 'rgba(0, 0, 0, 0.87)',
                }
            }}
        />
    );
});

export default function EditHouse({ data, housesList, rooms }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);
    const resetGalleryRef = useRef<ResetType | null>(null);
    const { refresh, replace } = useRouter();

    const photosEditing = useMainStore((state) => state?.photosEditing);

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const setHouseData = useMainStore((state) => state.setHouseData);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    useEffect(() => {
        setHouseData(data, true);
    }, [data, setHouseData]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleResetForm = () => {
        formRef.current?.reset();
        setHouseData(data, true);
        resetGalleryRef.current?.reset();
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        photosEditing.forEach((item, index) => {
            formData.append(`photo${index}`, item.raw);
        });

        formData.append('name', data.name);
        formData.has('is_available') 
            ? formData.append('is_available', 'true') 
            : formData.append('is_available', 'false');
        //костыль чтобы правильно обработать "null"
        formData.set('house_type', formData.get('house_type') ?? 'null');

        try {
            const response = await fetch('/api/admin/houses/edit?id=' + data.id, {
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
            }
        } catch (error) {
            setLoading(false);
            window?.scrollTo({ top: 0, behavior: 'smooth' });
            setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
        }
    }

    const handleRemoveHouse = async () => {
        try {
            const response = await fetch('/api/admin/houses/remove?id=' + data.id, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                setDialogOpen(true, 'success', data.description);
                replace('/admin_hub');
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
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='@container/resizeContainer'>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                <Stack sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 10
                }}>
                    <Button label='Видалити'
                        className='hover:!bg-[#a80e0e] hover:!text-white'
                        onClick={handleRemoveHouse}
                    />
                </Stack>
                <Tabs value={activeTab} onChange={handleChangeTab} >
                    {
                        locales.map((lang) => (
                            <Tab key={lang} label={lang} />
                        ))
                    }
                </Tabs>
            </Box>
            {locales.map((lang, index) => (
                <CustomTabPanel value={activeTab} index={index} key={lang} >
                    <ResizableContainer>
                        <div className="container-admin">
                            <div className={`${s.housesWrapper} adminHousesWrapper`} style={{ marginBlock: 50, paddingBottom: 0 }}>
                                <HouseCard locale={lang} rooms={rooms} />
                                <HouseCard locale={lang} rooms={rooms} />
                                <style jsx global>{`
                                    .adminHousesWrapper > :last-child {
                                    opacity: 0.4;
                                    }
                                `}</style>
                            </div>
                        </div>
                    </ResizableContainer>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            maxWidth: '1180px',
                            mx: 'auto',
                            my: 2,
                            border: '1px solid grey', p: 2, borderRadius: '8px',
                        }}
                    >
                        <Grid size={{ xs: 12 }}>
                            <MainTitleInput lang={lang}/>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <DecorTextInput lang={lang} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <HouseTypeSelect housesList={housesList} house_type={data.house_type} />
                        </Grid>

                        <NumberFields>
                            <IsAvailableCheckbox />
                        </NumberFields>

                    </Grid>
                </CustomTabPanel>
            ))}

            {!rooms && <SimpleGallery photo={data.photo} ref={resetGalleryRef} />}

            {locales.map((lang, index) => (
                <CustomTabPanel value={activeTab} index={index} key={lang} className='container-admin'>
                    <HouseDescriptionPage locale={lang} rooms={rooms} />
                </CustomTabPanel>
            ))}

            <SubmitFabGroup
                loading={loading}
                onReset={handleResetForm}
                onSubmit={() => { }}
            />
        </Box>
    )
}