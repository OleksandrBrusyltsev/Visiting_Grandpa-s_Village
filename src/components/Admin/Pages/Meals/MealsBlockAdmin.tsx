import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";

import MarkdownPreview from "@/components/ui/MarkdownPreview/MarkdownPreview";
import Icon from "@/components/ui/Icon/Icon";
import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';

import s from "@/components/Meals/MealsBlock.module.scss";

const MealsBlockAdmin = forwardRef<ResetType, EditPageProps<MealsItem>>(function MealsBlockAdmin({
    imagePreviews,
    item,
    position,
    lang,
    handleFileChange,
    handleTextChange,
    isMobile,
}, ref) {

    const { title, id } = item;
    const [description, setDescription] = useState(() => item.description[lang]);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
        }
    }), [item.description, lang]);
    return (
        <div className={s.mealsBlockWrapper}>
            {lang === 'uk' && <input type="hidden" value={id} name={`id-${position + 1}`} />}
            <Input name={`title-${lang}-${position + 1}`}
                className={`${s.mealsTitle} bg-transparent block`}
                onChange={handleTextChange}
                defaultValue={title[lang]} />

            <div className={s.mealsDescriptionWrapper}>
                {position !== 0 && isMobile ? (
                    <div className={s.mainPhoto}>
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
                            className={`absolute inset-0 opacity-0 cursor-pointer`}
                            onChange={(e) => handleFileChange(e, 0)}
                            tabIndex={0} />
                    </div>
                ) : null}
                <div className={s.mealsDescription}>
                    <Input
                        name={`description-${lang}-${position + 1}`}
                        className={
                            `w-full px-1 ${isEditing
                                ? 'opacity-100 relative'
                                : 'opacity-0 absolute top-0 left-0 z-10'}`
                        }
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
            </div>
            {position === 0 || !isMobile ? (
                <div className={s.mainPhoto}>
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
                        className={`absolute inset-0 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0} />
                </div>
            ) : null}
            <div className={s.topPhoto}>
                <Image
                    src={
                        typeof imagePreviews[1] === 'string'
                            ? imagePreviews[1]
                            : URL.createObjectURL(imagePreviews[1])
                    }
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fill
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 1)}
                    tabIndex={0} />
            </div>
            <div className={s.bottomPhoto}>
                <Image
                    src={
                        typeof imagePreviews[2] === 'string'
                            ? imagePreviews[2]
                            : URL.createObjectURL(imagePreviews[2])
                    }
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fill
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 2)}
                    tabIndex={0} />
            </div>
            {position !== 2 ? (
                <Icon
                    name={position === 0 ? "curve-meals-middle" : "curve-meals-768"}
                    className={s.mealsCurve}
                />
            ) : null}
        </div>
    );
});

export default MealsBlockAdmin;