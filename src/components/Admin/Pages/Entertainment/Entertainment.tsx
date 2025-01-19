"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs } from '@mui/material';

import { useMainStore } from '@/stores/store-provider';
import { ResizableContainer } from '../../UI/ResizableContainer/ResizableContainer';
import { CustomTabPanel } from '../Houses/Houses';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import Quote from './Quote';
import SeoBlock from './SeoBlock';
import EntertainmentHero from './EntertainmentHero';

import s from "@/components/Entertainment/Entertainment.module.scss";

type Props = Readonly<{ data: EntertainmentItem[] }>;

export default function EntertainmentPage({ data }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const changedBlocksRef = useRef(new Set<number>());
    const formRef = useRef<HTMLFormElement | null>(null);
    const containerAdminRef = useRef<HTMLDivElement | null>(null);
    const heroBlockResets = useRef<Record<Language, { reset: () => void } | null>>({
        en: null,
        uk: null,
        ru: null
    });
    const entBlockResets = useRef<Record<number, Record<Language, { reset: () => void } | null>>>({});
    const seoBlockResets = useRef<Record<Language, { reset: () => void } | null>>({
        en: null,
        uk: null,
        ru: null
    });
    const { refresh } = useRouter();

    const setDialogOpen = useMainStore((state) => state.setDialogOpen);

    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    useLayoutEffect(() => {
        setIsDirtyPage(false);
    }, [setIsDirtyPage]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const [preview, setPreview] = useState<(string | File)[][]>(data.map((item) => [...item.photos]));
    console.log('render main component');
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
            switch (blockIndex) {
                // очищаем hero блок
                case 0:
                    Object.values(heroBlockResets.current).forEach((ref) => {
                        ref?.reset();
                    });
                    break;
                // очищаем seo блок
                case data.length - 1:
                    Object.values(seoBlockResets.current).forEach((ref) => {
                        ref?.reset();
                    });
                    break;
                // очищаем измененные блоки с фотографиями
                default:
                    Object.values(entBlockResets.current[blockIndex - 1]).forEach((ref) => {
                        ref?.reset();
                    });
                    break;
            }
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

    return (
        <Box component='form' ref={formRef} onSubmit={handleSubmit} className='relative'>
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
                    (['uk', 'ru', 'en'] as Language[]).map((lang, index) => (
                        <CustomTabPanel value={activeTab} index={index} key={lang} className='container-admin overflow-hidden' ref={containerAdminRef}>

                            <EntertainmentHero
                                item={data[0]}
                                imagePreviews={preview[0]}
                                lang={lang}
                                handleTextChange={() => handleTextChange(0)}
                                handleFileChange={handleFileChange(0)}
                                ref={(el) => {
                                    heroBlockResets.current[lang] = el;
                                }}
                            />

                            <div className={`${s.main}`}>
                                <ul className={s.entertainmentList}>
                                    {data.slice(1, data.length - 1).map((item, i) => (
                                        <Quote
                                            key={item.id}
                                            item={item}
                                            imagePreviews={preview[i + 1]}
                                            position={i}
                                            lang={lang}
                                            handleTextChange={() => handleTextChange(i + 1)}
                                            handleFileChange={handleFileChange(i + 1)}
                                            ref={(el) => {
                                                if (!entBlockResets.current[i]) {
                                                    entBlockResets.current[i] = {} as Record<Language, { reset: () => void }>;
                                                }
                                                entBlockResets.current[i][lang] = el;
                                            }}
                                        />
                                    ))}
                                </ul>
                                <div className={s.treesWrapper}>
                                    <Image
                                        className={s.treesImage}
                                        src={"/images/backgrounds/christmasTrees.png"}
                                        alt=""
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        fill
                                    />
                                </div>
                                <div className={s.backgroundCurve}></div>
                            </div>
                            <SeoBlock
                                item={data[data.length - 1]}
                                position={data.length - 1}
                                lang={lang}
                                handleTextChange={() => handleTextChange(data.length - 1)}
                                ref={(el) => {
                                    seoBlockResets.current[lang] = el;
                                }}
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