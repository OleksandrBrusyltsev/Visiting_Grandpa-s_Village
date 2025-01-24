"use client";
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useMainStore } from '@/stores/store-provider';
import { Box, Tab, Tabs } from '@mui/material';

import { ResizableContainer } from '../../UI/ResizableContainer/ResizableContainer';
import { CustomTabPanel } from '../Houses/Houses';
import { useMatchContainerMedia } from '@/hooks/useMatchContainerMedia';
import HeroBlock from './Blocks/HeroBlock';
import Block1 from './Blocks/Block1';
import Block2 from './Blocks/Block2';
import Block3 from './Blocks/Block3';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import WelcomeBlock from './Blocks/WelcomeBlock';

import css from "@/components/Home/Home.module.scss";
import { locales } from '@/data/locales';

type Props = Readonly<{ data: MainPageBlock[] }>

export default function MainPage({ data }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const changedBlocksRef = useRef(new Set<number>());
    const formRef = useRef<HTMLFormElement | null>(null);
    const containerAdminRef = useRef<HTMLDivElement | null>(null);

    const blockResets = useRef<Record<number, Record<Language, { reset: () => void } | null>>>({});

    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const matchMedia = useMatchContainerMedia(containerAdminRef);

    useLayoutEffect(() => {
        setIsDirtyPage(false);
    }, [setIsDirtyPage]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = useState<(string | File)[][]>(data.map((item) => [...item.photos]));

    const handleFileChange = (blockIndex: number) => (event: React.ChangeEvent<HTMLInputElement>, imgIndex: number) => {
        const file = event.target.files?.[0];

        changedBlocksRef.current?.add(blockIndex);

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
    const handleTextChange = (blockIndex: number) => {
        setIsDirtyPage(true);
        changedBlocksRef.current?.add(blockIndex);
    }
    const handleResetForm = () => {
        formRef.current?.reset();
        setPreview(() => data.map((item) => [...item.photos]));

        // очищаем все блоки с контролируемыми инпутами
        changedBlocksRef.current.forEach((blockIndex) => {
            Object.values(blockResets.current[blockIndex]).forEach((ref) => {
                ref?.reset();
            });
        });
        changedBlocksRef.current?.clear();
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
                }
            }

            changedBlocksRef.current.forEach((blockIndex) => {
                preview[blockIndex].forEach((photo, photoIndex) => {
                    formData.append(`photo${photoIndex}-${blockIndex}`, photo);
                })
            });

            try {
                const response = await fetch('/api/admin/home/edit', {
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
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='relative' noValidate >
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
                            <section
                                // className="flex flex-col items-center @[768px]:items-stretch max-w-[650px] @[768px]:max-w-[768px] w-full mx-auto @[1280px]:max-w-[1280px] @[1440px]:max-w-[1440px]"
                                className={`${css.section} !px-0`}
                            >
                                <HeroBlock
                                    item={data[0]}
                                    imagePreviews={preview[0]}
                                    matchMedia={matchMedia}
                                    lang={lang}
                                    handleTextChange={() => handleTextChange(0)}
                                    handleFileChange={handleFileChange(0)}
                                    ref={(el) => {
                                        if (!blockResets.current[0])
                                            blockResets.current[0] = {} as Record<Language, { reset: () => void }>;
                                        blockResets.current[0][lang] = el;
                                    }}
                                />
                                <Block1
                                    item={data[1]}
                                    lang={lang}
                                    matchMedia={matchMedia}
                                    imagePreviews={preview[1]}
                                    handleTextChange={() => handleTextChange(1)}
                                    handleFileChange={handleFileChange(1)}
                                    ref={(el) => {
                                        if (!blockResets.current[1])
                                            blockResets.current[1] = {} as Record<Language, { reset: () => void }>;
                                        blockResets.current[1][lang] = el;
                                    }}
                                />
                                <Block2
                                    item={data[2]}
                                    lang={lang}
                                    matchMedia={matchMedia}
                                    imagePreviews={preview[2]}
                                    handleTextChange={() => handleTextChange(2)}
                                    handleFileChange={handleFileChange(2)}
                                    ref={(el) => {
                                        if (!blockResets.current[2])
                                            blockResets.current[2] = {} as Record<Language, { reset: () => void }>;
                                        blockResets.current[2][lang] = el;
                                    }}
                                />

                                <Block3
                                    item={data[3]}
                                    lang={lang}
                                    matchMedia={matchMedia}
                                    imagePreviews={preview[3]}
                                    handleTextChange={() => handleTextChange(3)}
                                    handleFileChange={handleFileChange(3)}
                                    ref={(el) => {
                                        if (!blockResets.current[3])
                                            blockResets.current[3] = {} as Record<Language, { reset: () => void }>;
                                        blockResets.current[3][lang] = el;
                                    }}
                                />
                            </section>
                            <WelcomeBlock
                                item={data[4]}
                                lang={lang}
                                imagePreviews={preview[4]}
                                handleTextChange={() => handleTextChange(4)}
                                handleFileChange={handleFileChange(4)}
                            />
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
