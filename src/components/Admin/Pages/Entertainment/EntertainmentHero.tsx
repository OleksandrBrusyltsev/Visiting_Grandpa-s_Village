import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import s from "@/components/Entertainment/Entertainment.module.scss";

const EntertainmentHero = forwardRef<ResetType, EditPageProps<EntertainmentItem>>(function Quote({
    item,
    imagePreviews,
    lang,
    handleTextChange,
    handleFileChange
}, ref) {
    const [quote, setQuote] = useState(() => item.quote[lang]);
    const [isEditing, setIsEditing] = useState(false);

    const { title, description, subtitle } = item;

    useImperativeHandle(ref, () => ({
        reset() {
            setQuote(() => item.quote[lang]);
        }
    }), [item.quote, lang]);

    return (
        <section className={`${s.hero} mt-[80px] @[768px]:mt-0`}>
            <div className={`${s.grandpaWrapper} !z-0`}>
                <Image
                    src={typeof imagePreviews[0] === 'string'
                        ? imagePreviews[0]
                        : URL.createObjectURL(imagePreviews[0])}
                    alt="Grandpa photo"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                    fill
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`absolute inset-0 opacity-0 cursor-pointer z-10`}
                    onChange={(e) => handleFileChange(e, 0)}
                    tabIndex={0} />
            </div>
            {lang === 'uk' && <input type="hidden" value={item.id} name='id-0' />}
            <Input name={`title-${lang}-0`}
                className={`${s.heroTitle} !w-[70%] bg-transparent absolute @[768px]:relative @[768px]:!w-full z-10 `}
                defaultValue={title[lang]}
                onChange={handleTextChange} />

            <div className={s.topQuoteWrapper}>
                <div className={`${s.topQuote} relative`}>
                    <Input name={`quote-${lang}-0`}
                        className={`w-full -ml-[4px] !text-end @[768px]:!text-start ${isEditing
                            ? 'opacity-100'
                            : 'opacity-0 absolute top-0 left-0 z-10'}`}
                        value={quote}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleTextChange();
                            setQuote(e.target.value);
                        }}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                    />
                    <MarkdownPreview className={
                        `${isEditing
                            ? 'opacity-0 absolute'
                            : 'opacity-100 static'}`}
                        markdown={quote} />
                </div>
            </div>
            <Input name={`subtitle-${lang}-0`}
                className={`${s.question} bg-transparent relative z-10 w-full`}
                defaultValue={subtitle[lang]}
                onChange={handleTextChange} />
            <Input name={`description-${lang}-0`}
                className={`${s.answer} bg-transparent relative z-10`}
                defaultValue={description[lang]}
                onChange={handleTextChange} />
        </section>

    )
});

export default EntertainmentHero;