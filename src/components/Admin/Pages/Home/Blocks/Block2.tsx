import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import css from "@/components/Home/Home.module.scss";
import { illustration3 } from '@/components/Home/Home';

//все стили на костылях! ОСТОРОЖНО!!!
const Block2 = forwardRef<ResetType, Omit<EditPageProps<MainPageBlock>, 'position'>>(function Block2({
    item,
    imagePreviews,
    lang,
    handleTextChange,
    handleFileChange,
    matchMedia
},
    ref) {
    const { isMobile } = matchMedia ?? {};

    const [description, setDescription] = useState(() => item.description[lang]);

    const [isEditing, setIsEditing] = useState(false);
    const { title } = item;

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
        }
    }), [item.description, lang]);

    return (

        <>
            <div className={`${css.textContainer1} w-full`}>
                {lang === 'uk' && <input type="hidden" value={item.id} name='id-2' />}

                <Input name={`title-${lang}-2`}
                    className={`${css.title1} ${css.add} bg-transparent relative z-10 `}
                    defaultValue={title[lang]}
                    onChange={handleTextChange} />

                <div className={`${css.text1} relative w-full`}>
                    <Input name={`description-${lang}-2`}
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
            </div>

            <div className={css.imgBox3}>
                <Image
                    src={illustration3}
                    alt=""
                    width={488}
                    height={458}
                    className={css.illustration3}
                />

                <div className={`${css.photo6} relative`}>
                    <Image
                        src={
                            typeof imagePreviews[0] === 'string'
                                ? imagePreviews[0]
                                : URL.createObjectURL(imagePreviews[0])
                        }
                        alt=""
                        width={660}
                        height={496}

                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`absolute inset-0 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0}
                        width={660}
                        height={496}
                    />
                </div>
                <Image
                    src={typeof imagePreviews[1] === 'string'
                        ? imagePreviews[1]
                        : URL.createObjectURL(imagePreviews[1])}
                    alt=""
                    width={499}
                    height={430}
                    className={css.photo5}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.photo5} absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 1)}
                    tabIndex={0}
                    width={499}
                    height={430}
                />
                <div className={css.line3Box}>
                    {isMobile ? (
                        <svg
                            viewBox="0 0 237 340"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${css.svg} ${css.line3}`}
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M214.845 2.6671C215.213 3.30482 216.028 3.52332 216.666 3.15513C217.304 2.78693 217.522 1.97148 217.154 1.33376C216.786 0.696032 215.971 0.477532 215.333 0.845727C214.695 1.21392 214.477 2.02938 214.845 2.6671ZM58.8449 339.167C59.2131 339.804 60.0285 340.023 60.6662 339.655C61.304 339.287 61.5225 338.471 61.1543 337.833C60.7861 337.196 59.9706 336.977 59.3329 337.345C58.6952 337.714 58.4767 338.529 58.8449 339.167ZM215.77 2.09964C220.851 13.851 226.902 27.5755 231.007 42.1068C235.112 56.6374 237.264 71.9563 234.561 86.8921C229.16 116.729 204.347 145.164 136.553 162.681L136.678 163.165C204.562 145.625 229.602 117.094 235.053 86.9812C237.775 71.9424 235.604 56.5409 231.488 41.9709C227.373 27.4015 221.307 13.6453 216.229 1.90121L215.77 2.09964ZM136.553 162.681C102.626 171.447 74.0473 180.932 51.9673 191.703C29.8922 202.471 14.2827 214.538 6.33627 228.483C-1.62077 242.448 -1.8735 258.258 6.68087 276.445C15.2293 294.62 32.5763 315.18 59.8363 338.689L60.1628 338.311C32.9234 314.819 15.6378 294.314 7.13331 276.233C-1.36526 258.164 -1.0913 242.529 6.7707 228.731C14.6433 214.915 30.1452 202.904 52.1865 192.152C74.223 181.403 102.765 171.927 136.678 163.165L136.553 162.681Z"
                                fill="#3F5540"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 981 440"
                            className={`${css.svg} ${css.line3}`}
                            fill="none"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M975.416 2.80078C975.416 4.27354 976.61 5.46745 978.083 5.46745C979.556 5.46745 980.75 4.27354 980.75 2.80078C980.75 1.32802 979.556 0.134115 978.083 0.134115C976.61 0.134115 975.416 1.32802 975.416 2.80078ZM0.27181 436.699C0.27181 438.172 1.46572 439.366 2.93848 439.366C4.41124 439.366 5.60514 438.172 5.60514 436.699C5.60514 435.227 4.41124 434.033 2.93848 434.033C1.46572 434.033 0.27181 435.227 0.27181 436.699ZM977.588 2.73202C968.916 65.1878 958.506 149.167 900.797 206.088C843.128 262.971 738.062 292.961 539.726 246.976L539.5 247.95C737.965 293.965 843.467 264.041 901.499 206.8C959.492 149.599 969.917 65.2471 978.578 2.86955L977.588 2.73202ZM539.726 246.976C341.306 200.971 222.339 204.547 145.281 241.586C68.1913 278.641 33.1671 349.128 2.46673 436.534L3.41022 436.865C34.1008 349.487 69.0141 279.355 145.714 242.488C222.446 205.605 341.121 201.955 539.5 247.95L539.726 246.976Z"
                                fill="#3F5540"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </>
    )
});

export default Block2;