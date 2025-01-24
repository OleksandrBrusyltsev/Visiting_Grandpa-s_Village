"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs } from '@mui/material';

import { useMainStore } from '@/stores/store-provider';
import { ResizableContainer } from '../../UI/ResizableContainer/ResizableContainer';
import { CustomTabPanel } from '../Houses/Houses';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import { useTranslations } from '@/hooks/useTranslations';
import GalleryItemBlock from './Blocks/GalleryItemBlock';
import { useMatchContainerMedia } from '@/hooks/useMatchContainerMedia';
import GalleryHero from './Blocks/GalleryHeroBlock';

import s from "@/components/Gallery/Gallery.module.scss";
import { locales } from '@/data/locales';

type Props = Readonly<{ data: GalleryItem[] }>;

export default function GalleryPage({ data }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const t = useTranslations('Gallery', locales[activeTab], true);

    const formRef = useRef<HTMLFormElement | null>(null);
    const containerAdminRef = useRef<HTMLDivElement | null>(null);
    const galleryBlockRefs = useRef<Record<number, Record<Language, ImperativeHandleObjType | null>>>({});
    const changedBlocksRef = useRef(new Set<number>());

    const matchMedia = useMatchContainerMedia(containerAdminRef);

    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);

    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    useLayoutEffect(() => {
        setIsDirtyPage(false);
    }, [setIsDirtyPage]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = useState<(string | File)[]>(data.map((item) => item.cover));
    const [name, setName] = useState<string[]>(data.map((item) => item.name));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, blockIndex: number) => {
        const file = event.target.files?.[0];
        changedBlocksRef.current.add(blockIndex);
        file
            ? setPreview(prevState => prevState.with(blockIndex, file))
            : setPreview(prevState => prevState.with(blockIndex, data[blockIndex].cover));
        setIsDirtyPage(true);
    }
    const handleTextChange = (index: number) => {
        setIsDirtyPage(true);
        changedBlocksRef.current.add(index);
    }
    const handleResetForm = () => {
        formRef.current?.reset();
        setPreview(data.map((item) => item.cover));
        changedBlocksRef.current
        Object.entries(galleryBlockRefs.current).forEach(([index, langRefs]) => {
            if (changedBlocksRef.current.has(+index + 1))
                Object.values(langRefs).forEach((ref) => {
                    ref?.reset();
                });
            //разворачиваем перевернутые для редактирования блоки
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
        if (!changedBlocksRef.current.size) {
            return;
        }

        if (!formRef.current?.checkValidity()) {
            const invalidInputs = formRef.current?.querySelectorAll(':invalid') as NodeListOf<HTMLInputElement>;
            const errors: Record<Language, string> = { uk: '', ru: '', en: '' };
            invalidInputs?.forEach((input: HTMLInputElement) => {
                const name = input.name.split('-')[0];
                const lang = input.name.split('-')[1] as Language;
                const blockPosition = +input.name.split('-')[2] + 1;
                errors[lang] += 'Блок ' + blockPosition + ', поле ' + name + ', помилка: "' + input.validationMessage + '" \n';
            });
            const message = Object.entries(errors)
                .map(
                    ([lang, error]) => error.trim().length
                        ? `Мова ${lang.toUpperCase()}:\n${error}`
                        : null
                )
                .filter(Boolean)
                .join('\n');
            setDialogOpen(true, 'error', `Помилки в формі! \n ${message}`);
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
                formData.append(`cover-${blockIndex}`, preview[blockIndex]);
                //паровозиком цепляем неизмененные фотки из data[i].photo_urls
                data[blockIndex].photo_urls.forEach((url, index) => {
                    formData.append(`photo${index}-${blockIndex}`, url);
                })
            });

            try {
                const response = await fetch('/api/admin/gallery/edit', {
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
                <Tabs value={activeTab} onChange={handleChangeTab} aria-label="basic tabs example">
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
                            <div className={s.backgroundImages}>
                                <GalleryHero
                                    coverPreview={preview[0]}
                                    item={data[0]}
                                    lang={lang}
                                    handleFileChange={handleFileChange}
                                    handleTextChange={() => handleTextChange(0)}
                                />
                                <div className={s.main}>
                                    <section className={`${s.memoriesGallery} mb-[150px]`}>
                                        <p className={s.callToClick}>
                                            <span className={s.desktopOnly}>{t('clickMode', { mode: 'desktop' })}</span>
                                            <span className={s.mobileOnly}>{t('clickMode', { mode: 'mobile' })}</span>
                                        </p>
                                        <div className={s.galleryWrapper}>
                                            {data.slice(1).map((item, i) => (
                                                <GalleryItemBlock
                                                    imagePreview={preview[i + 1]}
                                                    item={item}
                                                    name={name[i + 1]}
                                                    setName={(newName: string) => setName(names => names.with(i + 1, newName))}
                                                    lang={lang}
                                                    key={item.id}
                                                    position={i}
                                                    handleFileChange={handleFileChange}
                                                    handleTextChange={() => handleTextChange(i + 1)}
                                                    matchMedia={matchMedia}
                                                    ref={(el) => {
                                                        if (!galleryBlockRefs.current[i]) {
                                                            galleryBlockRefs.current[i] = {} as Record<Language, ImperativeHandleObjType>;
                                                        }
                                                        galleryBlockRefs.current[i][lang] = el;
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className={s.backgroundCurve}></div>
                                    </section>
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






