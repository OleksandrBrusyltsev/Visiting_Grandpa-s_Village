"use client";

import React, { useEffect, useMemo, useRef } from 'react'
import { Box, FormControlLabel, Grid2 as Grid, Stack, Switch, Tab, Tabs, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import HouseCard from './components/HouseCard'
import HousePage from './components/HousePage'
import HouseSelect from '../../UI/HouseSelect/HouseSelect';
import { CustomTabPanel } from '../../Pages/Houses/Houses';
import { useMainStore } from '@/stores/store-provider';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import SimpleGallery from './components/SimpleGallery';
import { ResizableContainer } from '../../UI/ResizableContainer/ResizableContainer';
import Button from '@/components/ui/Button/Button';
import NumberFields from '../AddNewHouse/components/NumberFields';

import s from '@/components/Houses/Houses.module.scss';

type Props = { data: HouseItem; housesList: SingleHousesListType; rooms: number }

export default function EditHouse({ data, housesList, rooms }: Props) {
    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);
    const { refresh, replace } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const houseData = useMainStore((state) => state.houseEditing);
    const setHouseData = useMainStore((state) => state.setHouseEditing);

    useEffect(() => {
        setHouseData(data);
    }, []);

    const houseDataPhoto = useMemo(() => ({
        photo: houseData?.photo || [],
    }), [houseData?.photo]);

    if (!houseData) return;

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleResetForm = () => {
        formRef.current?.reset();
        setHouseData(data);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        houseData.photo.forEach((image, index) => {
            formData.append(`photo${index}`, image);
        });

        formData.append('name', houseData.name);
        formData.has('is_available') ? formData.append('is_available', 'true') : formData.append('is_available', 'false');

        try {
            const response = await fetch('/api/admin/houses/edit?id=' + houseData.id, {
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
            }
        } catch (error) {
            setLoading(false);
            window?.scrollTo({ top: 0, behavior: 'smooth' });
            setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
        }
    }

    const handleRemoveHouse = async () => {
        try {
            const response = await fetch('/api/admin/houses/remove?id=' + houseData.id, {
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
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='@container/resizeContainer'>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChangeTab} aria-label="basic tabs example">
                    {
                        ['uk', 'ru', 'en'].map((lang) => (
                            <Tab key={lang} label={lang} />
                        ))
                    }
                    <Stack direction='row' flexGrow={1} justifyContent='flex-end'>
                        <Button label='Видалити'
                            className='hover:!bg-[#a80e0e] hover:!text-white'
                            onClick={() => handleRemoveHouse()}
                        />
                    </Stack>
                </Tabs>
            </Box>
            {(['uk', 'ru', 'en'] as Language[]).map((lang, index) => (
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
                            mt: 2,
                            border: '1px solid grey', p: 2, borderRadius: '8px',
                        }}
                    >
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Назва будинку на карточці"
                                id={`title-${lang}`}
                                name={`title-${lang}`}
                                variant="outlined"
                                multiline
                                fullWidth
                                required
                                value={houseData.title[lang]}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHouseData((houseData) => {
                                    if (houseData)
                                        houseData.title = {
                                            ...houseData.title, [lang]: e.target.value
                                        };
                                    return houseData;
                                })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Назва будинку біля Дідуся, де він вказує на карту"
                                id={`decor_text-${lang}`}
                                name={`decor_text-${lang}`}
                                variant="outlined"
                                multiline
                                fullWidth
                                required
                                value={houseData.decor_text[lang]}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHouseData((houseData) => {
                                    if (houseData)
                                        houseData.decor_text = {
                                            ...houseData.decor_text, [lang]: e.target.value
                                        };
                                    return houseData;
                                })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <HouseSelect housesList={housesList} value={houseData.house_type ?? 'null'} onChange={(e) => setHouseData((houseData) => {
                                if (houseData)
                                    houseData.house_type = e.target.value;
                                return houseData;
                            })} />
                        </Grid>

                        <NumberFields as='editing'>
                            <FormControlLabel
                                control={
                                    <Switch checked={houseData.is_available}
                                        onChange={() => setHouseData(houseData => {
                                            if (houseData)
                                                houseData.is_available = !houseData.is_available;
                                            return houseData;
                                        })}
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
                        </NumberFields>

                    </Grid>
                </CustomTabPanel>
            ))}

            {!rooms && <div className='mt-4 container-admin'>
                <SimpleGallery
                    setHouseData={setHouseData}
                    houseData={houseDataPhoto}
                />
            </div>}

            {(['uk', 'ru', 'en'] as Language[]).map((lang, index) => (
                <CustomTabPanel value={activeTab} index={index} key={lang} className='container-admin'>
                    <HousePage locale={lang} rooms={rooms} />
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