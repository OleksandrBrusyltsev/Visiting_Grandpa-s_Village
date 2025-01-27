"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs } from '@mui/material';

import { ResizableContainer } from '@/components/Admin/UI/ResizableContainer/ResizableContainer';
import SubmitFabGroup from '@/components/Admin/UI/SubmitFabGroup/SubmitFabGroup';
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { CustomTabPanel } from '@/components/Admin/Pages/Houses/Houses';
import { useMatchContainerMedia } from '@/hooks/useMatchContainerMedia';
import { useMainStore } from '@/stores/store-provider';
import showErrors from '@/functions/showErrors';
import MealsBlockAdmin from './MealsBlockAdmin';
import Icon from '@/components/ui/Icon/Icon';

import s from "@/components/Meals/Meals.module.scss";
import { locales } from '@/data/locales';

type Props = Readonly<{ data: MealsItem[] }>;

export default function MealsPage({ data }: Props) {

    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);
    const containerAdminRef = useRef<HTMLDivElement | null>(null);
    const mealsBlockRefs = useRef<Record<number, Record<Language, ResetType | null>>>({});
    const changedBlocksRef = useRef(new Set<number>());

    const matchMedia = useMatchContainerMedia(containerAdminRef);

    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = useState<(string | File)[][]>(data.map((item) => [...item.photos]));

    const handleFileChange = (blockIndex: number) => (event: React.ChangeEvent<HTMLInputElement>, imgIndex: number) => {
        const file = event.target.files?.[0];
        changedBlocksRef.current.add(blockIndex);
        if (file) {
            setPreview(prevState => {
                const res = [...prevState];
                res[blockIndex][imgIndex] = file;
                return res;
            });
        } else {
            setPreview(prevState => {
                const res = [...prevState];
                res[blockIndex][imgIndex] = data[blockIndex].photos[imgIndex];
                return res;
            });
        }
        setIsDirtyPage(true);
    }

    const handleTextChange = (index: number) => {
        setIsDirtyPage(true);
        changedBlocksRef.current.add(index);
    }

    const handleResetForm = () => {
        formRef.current?.reset();
        setPreview(() => data.map((item) => [...item.photos]));
        changedBlocksRef.current
        Object.entries(mealsBlockRefs.current).forEach(([index, langRefs]) => {
            if (changedBlocksRef.current.has(+index + 1))
                Object.values(langRefs).forEach((ref) => {
                    ref?.reset();
                });
        });
        changedBlocksRef.current.clear();
        setIsDirtyPage(false);
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changedBlocksRef.current.size || !formRef.current) {
            return;
        }

        if (!formRef.current?.checkValidity()) {
            showErrors(formRef.current, setDialogOpen);
        } else {
            setLoading(true);
            const formData = new FormData(e.currentTarget);

            for (let key of Array.from(formData.keys())) {
                const keyPartsLength = key.split('-').length;
                const blockIndex = +key.split('-')[keyPartsLength - 1];
                if (!changedBlocksRef.current.has(blockIndex)) {
                    formData.delete(key);
                    continue;
                }
            }

            changedBlocksRef.current.forEach((blockIndex) => {
                preview[blockIndex].forEach((photo, photoIndex) => {
                    formData.append(`photo${photoIndex}-${blockIndex}`, photo);
                })
            });

            try {
                const response = await fetch('/api/admin/meals/edit', {
                    method: 'PUT',
                    body: formData
                });
                if (response.status === 200) {
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
                        <CustomTabPanel value={activeTab} index={index} key={lang} className='container-admin overflow-hidden' ref={containerAdminRef}>
                            <div className={`${s.mealsWrapper}`}>
                                <div className={s.heroWrapper}>
                                    {lang === 'uk' && <input type="hidden" value={data[0].id} name='id-0' />}
                                    <Input name={`title-${lang}-0`}
                                        className={`${s.title} bg-transparent relative z-10`}
                                        defaultValue={data[0].title[lang]}
                                        onChange={() => handleTextChange(0)} />
                                    <div className={s.heroImage}>
                                        <Image
                                            src={"/images/meals/dog.png"}
                                            alt=""
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                                            fill
                                        />
                                        <div className={s.callToEatWrapper}>
                                            <Input name={`description-${lang}-0`}
                                                className={`${s.callToEat} bg-transparent z-10 relative w-full`}
                                                defaultValue={data[0].description[lang]}
                                                onChange={() => handleTextChange(0)}
                                            />
                                            <Icon name="meals-outline" className={s.callToEatOutline} />
                                        </div>
                                    </div>
                                    <Icon
                                        name={matchMedia.isMobile ? "curve-meals-375" : "curve-meals-768"}
                                        className={s.heroCurve}
                                    />
                                </div>
                                <div className={s.main}>
                                    {data.slice(1).map((item, i) => (
                                        <MealsBlockAdmin
                                            imagePreviews={preview[i + 1]}
                                            item={item}
                                            lang={lang}
                                            key={item.id}
                                            position={i}
                                            handleFileChange={handleFileChange(i + 1)}
                                            handleTextChange={() => handleTextChange(i + 1)}
                                            matchMedia={matchMedia}
                                            ref={(el) => {
                                                if (!mealsBlockRefs.current[i]) {
                                                    mealsBlockRefs.current[i] = {} as Record<Language, ResetType>;
                                                }
                                                mealsBlockRefs.current[i][lang] = el;
                                            }}
                                        />
                                    ))}
                                </div>
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