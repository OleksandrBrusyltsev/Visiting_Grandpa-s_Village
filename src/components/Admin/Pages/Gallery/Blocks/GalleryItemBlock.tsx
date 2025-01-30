import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, TextField } from "@mui/material";

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { useTranslations } from "@/hooks/useTranslations";
import Button from "@/components/ui/Button/Button";

import s from "@/components/Gallery/GalleryItem.module.scss";

type Props = Omit<EditPageProps<GalleryItem>, 'imagePreviews'> & {
    imagePreview: string | File;
    name: string;
    setName: (newName: string) => void;
};

export default forwardRef<ImperativeHandleObjType, Props>(function GalleryItemBlock({
    imagePreview,
    item,
    name,
    setName,
    lang,
    position,
    matchMedia,
    handleFileChange,
    handleTextChange,
}, ref) {
    const t = useTranslations("UI", lang, true);
    const [title, setTitle] = useState(() => item.title[lang]);
    const [alt, setAlt] = useState(() => item.alt[lang]);
    const { isMobile, isTablet } = matchMedia ?? {};
    const [settings, setSettings] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        reset() {
            setTitle(item.title[lang]);
            setName(item.name);
            setAlt(item.alt[lang]);
            setSettings(false);
        },
        turnOver() {
            settings && setSettings(false);
        }
    }), [item.title, lang, item.alt, item.name, setName, settings]);

    return (
        <>
            {lang === 'uk' && <input type="hidden" value={item.id} name={`id-${position + 1}`} />}
            <div
                className={`${s.itemWrapper} relative active:!filter-none ${settings ? 'hover:!shadow-none' : ''}`}
                tabIndex={0}
                style={{
                    scale: 1
                }}
            >

                <div className={
                    `flex flex-col gap-4 bg-slate-400 h-full p-10 cursor-default transition-opacity ${settings
                        ? 'pointer-events-auto opacity-1 visible'
                        : 'pointer-events-none opacity-0 invisible absolute'}`
                }>
                    <TextField
                        name={`name-${position + 1}`}
                        value={name}
                        label={"Шлях в адресному рядку"}
                        fullWidth
                        autoComplete="off"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleTextChange();
                            setName(e.target.value.replace(/[^a-z0-9-]/gi, ''));
                        }}
                    />
                    <TextField
                        name={`title-${lang}-${position + 1}`}
                        value={title}
                        label={"Назва розділу"}
                        fullWidth
                        autoComplete="off"
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleTextChange();
                                setTitle(e.target.value);
                            }
                        }
                        sx={{
                            display: isMobile || isTablet ? 'block' : 'none'
                        }}
                    />
                    <TextField
                        name={`alt-${lang}-${position + 1}`}
                        value={alt}
                        label={"Альтернативний текст для cover-зображення"}
                        fullWidth
                        autoComplete="off"
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleTextChange();
                                setAlt(e.target.value);
                            }
                        }
                    />
                </div>
                <div className={`${s.imageWrapper} ${settings
                    ? 'pointer-events-none opacity-0 invisible !absolute'
                    : 'pointer-events-auto opacity-1 visible'}`
                }>
                    <Image
                        className={s.itemImage}
                        src={
                            typeof imagePreview === 'string'
                                ? imagePreview
                                : URL.createObjectURL(imagePreview)
                        }
                        alt={alt}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        fill
                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`absolute inset-0 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, position + 1)}
                        tabIndex={0} />
                </div>
                <div className={`${s.titleWrapper} hidden @[1280px]:flex ${settings ? 'absolute pointer-events-none opacity-0 invisible' : 'pointer-events-auto opacity-1 visible'}`}>
                    {/* <h2 className={s.itemTitle}>{title[lang]}</h2> */}
                    <Input name={`title-${lang}-${position + 1}`}
                        className={`${s.itemTitle} bg-transparent block text-center`}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleTextChange();
                            setTitle(e.target.value);
                        }}
                        value={title} />
                </div>
                <div className={`${s.btnWrapper} ${settings
                    ? `pointer-events-none opacity-0 invisible  ${settings ? 'group-hover:translate-y-[100px] group-hover:opacity-0 absolute' : ''}`
                    : 'pointer-events-auto opacity-1 visible'}`}>
                    <Button
                        label={isMobile || isTablet ? title : t('view')}
                        type="button"
                        tabIndex={-1}
                    />
                </div>
                <IconButton color="secondary" sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 100
                }}
                    onClick={() => setSettings(!settings)}
                >
                    <SettingsIcon fontSize="large" sx={{ color: 'white' }} />
                </IconButton>
            </div>
        </>
    );
});