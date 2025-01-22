import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Icon from '@/components/ui/Icon/Icon';
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import q from '@/components/Entertainment/Quote/Quote.module.scss';
import s from "@/components/Entertainment/Entertainment.module.scss";

const Quote = forwardRef<ResetType, EditPageProps<EntertainmentItem>>(function Quote({
    item,
    imagePreviews,
    position,
    lang,
    handleTextChange,
    handleFileChange
}, ref) {
    const [description, setDescription] = useState(() => item.description[lang]);
    const [title, setTitle] = useState(() => item.title[lang]);

    const [isEditing, setIsEditing] = useState(false);
    const { id } = item;

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
            setTitle(() => item.title[lang]);
        }
    }), [item.description, lang, item.title]);

    return (
        <li className={s.entertainmentGroup} key={id}>
            <hgroup className={`${q.quoteWrapper} ${position % 2 ? q.right : q.left}`}>
                {lang === 'uk' && <input type="hidden" value={id} name={`id-${position + 1}`} />}
                <div
                    className={`${q.quoteTitle} !text-start relative`}>
                    { /* МЕГАКОСТЫЛЬ с тегом <p></p>!!! Не работает, если в textarea более 1 строки*/}
                    <p className='opacity-0'>{title}</p>
                    <Input name={`description-${lang}-${position + 1}`}
                        className={`bg-transparent absolute top-0 z-10 w-full`}
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleTextChange();
                            setTitle(e.target.value);
                        }} />
                    <Icon name="ellipse" className={`${q.titleOutline} w-min`} />
                </div>
                <div className={`${s.quoteText} relative`} >
                    <Input name={`description-${lang}-${position + 1}`}
                        className={`w-full -ml-[4px] ${isEditing
                            ? 'opacity-100'
                            : 'opacity-0 absolute top-0 left-0 z-10'}`}
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleTextChange();
                            setDescription(e.target.value);
                        }}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                    />
                    <MarkdownPreview className={
                        `${isEditing
                            ? 'opacity-0 absolute'
                            : 'opacity-100 static'}`}
                        markdown={description} />
                </div>
            </hgroup>
            <div className={`${s.entertainmentImgWrapper} !z-0 ${position % 2 ? s.left : s.right}`}>
                <Image
                    src={
                        typeof imagePreviews[0] === 'string'
                            ? imagePreviews[0]
                            : URL.createObjectURL(imagePreviews[0])
                    }
                    alt=""
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
            <div
                className={`${s.entertainmentImgWrapper} !z-0 ${position % 2 ? s.right : s.left}`}
            >
                <Image
                    src={
                        typeof imagePreviews[1] === 'string'
                            ? imagePreviews[1]
                            : URL.createObjectURL(imagePreviews[1])
                    }
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                    fill
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`absolute inset-0 opacity-0 cursor-pointer z-10`}
                    onChange={(e) => handleFileChange(e, 1)}
                    tabIndex={0} />
            </div>
        </li>

    )
});

export default Quote;