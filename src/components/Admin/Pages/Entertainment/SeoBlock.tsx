import React, { forwardRef, useImperativeHandle, useState } from 'react'

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import s from "@/components/Entertainment/Entertainment.module.scss";

type Props = Omit<EditPageProps<EntertainmentItem>, 'handleFileChange' | 'imagePreviews'>

const SeoBlock = forwardRef<ResetType, Props>(function Quote({ item, position, lang, handleTextChange }, ref) {
    const [description, setDescription] = useState(() => item.description[lang]);
    const [quote, setQuote] = useState(() => item.quote[lang]);

    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [isQuoteEditing, setIsQuoteEditing] = useState(false);

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
            setQuote(() => item.quote[lang]);
        }
    }), [item.description, lang, item.quote]);

    return (
        <div className={`${s.textWrapper}`}>
            <div className={`${s.text} relative`}>
                {lang === 'uk' && <input type="hidden" value={item.id} name={`id-${position}`} />}
                <Input name={`description-${lang}-${position}`}
                    className={`w-full bg-transparent relative z-10 ${isDescriptionEditing
                        ? 'opacity-100 relative'
                        : 'opacity-0 !absolute top-0 left-0'}`}
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleTextChange();
                        setDescription(e.target.value);
                    }}
                    onFocus={() => setIsDescriptionEditing(true)}
                    onBlur={() => setIsDescriptionEditing(false)}
                />
                <MarkdownPreview className={
                    `${isDescriptionEditing
                        ? 'opacity-0 absolute'
                        : 'opacity-100 static'}`}
                    markdown={description} />
            </div>
            <div className={`${s.text} relative`}>
                <Input name={`quote-${lang}-${position}`}
                    className={`w-full bg-transparent z-10 ${isQuoteEditing
                        ? 'opacity-100 relative'
                        : 'opacity-0 !absolute top-0 left-0'}`}
                    value={quote}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleTextChange();
                        setQuote(e.target.value);
                    }}
                    onFocus={() => setIsQuoteEditing(true)}
                    onBlur={() => setIsQuoteEditing(false)}
                />
                <MarkdownPreview className={
                    `${isQuoteEditing
                        ? 'opacity-0 absolute'
                        : 'opacity-100 static'}`}
                    markdown={quote} />
            </div>
        </div>

    )
});

export default SeoBlock;