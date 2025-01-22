import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import css from "@/components/Home/Home.module.scss";
import SimpleBookingComponent from '../SimpleBookingComponent';

//все стили на костылях! ОСТОРОЖНО!!!
const Block1 = forwardRef<ResetType, Omit<EditPageProps<MainPageBlock>, 'position'>>(function Block1({
    item,
    imagePreviews,
    lang,
    handleTextChange,
    handleFileChange,
    isMobile
},
    ref) {
    const [description, setDescription] = useState(() => item.description[lang]);

    const [isEditing, setIsEditing] = useState(false);
    const { quote, title } = item;

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
        }
    }), [item.description, lang]);

    return (
        <>
            <div className={`${css.grandbox2} `}>
                <div className={`${css.imgMask} relative !z-0`}>
                    <Image
                        src={
                            typeof imagePreviews[0] === 'string'
                                ? imagePreviews[0]
                                : URL.createObjectURL(imagePreviews[0])
                        }
                        alt=""
                        width={327}
                        height={324}
                        className={`${css.grandpa2}`}
                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`${css.grandpa2} absolute inset-0 @[768px]:inset-[unset] @[1280px]:inset-0 !z-10 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0}
                        width={327}
                        height={324}
                    />
                </div>
                {lang === 'uk' && <input type="hidden" value={item.id} name='id-1' />}
                <Input name={`title-${lang}-1`}
                    className={`${css.title1} ${css.textContainer} bg-transparent relative z-10 `}
                    defaultValue={title[lang]}
                    onChange={handleTextChange} />
            </div>
            <div className={`${css.textContainer}`}>
                <div className={`${css.text1} relative w-full`}>
                    <Input name={`description-${lang}-1`}
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
                <div className={`${css.text2} ${css.boxForAlign} w-full relative z-20`}>
                    <Input name={`quote-${lang}-1`}
                        className={`bg-transparent w-full relative `}
                        defaultValue={quote[lang]}
                        onChange={handleTextChange} />
                </div>
            </div>
            <div className={css.imgBox2}>
                <div className={`${css.photo2} relative`}>
                    <Image
                        src={typeof imagePreviews[1] === 'string'
                            ? imagePreviews[1]
                            : URL.createObjectURL(imagePreviews[1])}
                        alt=""
                        width={748}
                        height={410}
                    // className={`${css.photo2}`}
                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`absolute inset-0 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 1)}
                        tabIndex={0}
                        width={748}
                        height={410}
                    />
                </div>
                <Image
                    src={typeof imagePreviews[3] === 'string'
                        ? imagePreviews[3]
                        : URL.createObjectURL(imagePreviews[3])}
                    alt=""
                    width={556}
                    height={354}
                    className={`${css.photo4}`}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.photo4} absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 3)}
                    tabIndex={0}
                    width={556}
                    height={354}
                />
                <Image
                    src={typeof imagePreviews[2] === 'string'
                        ? imagePreviews[2]
                        : URL.createObjectURL(imagePreviews[2])}
                    alt=""
                    width={606}
                    height={526}
                    className={`${css.photo3}`}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.photo3} opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 2)}
                    tabIndex={0}
                    width={606}
                    height={526}
                />
                <div className={css.line2Box}>
                    {isMobile ? (
                        <svg
                            viewBox="0 0 265 271"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${css.svg} ${css.line2}`}
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M27.6664 1.5C27.6664 2.23638 28.2634 2.83333 28.9997 2.83333C29.7361 2.83333 30.3331 2.23638 30.3331 1.5C30.3331 0.76362 29.7361 0.166667 28.9997 0.166667C28.2634 0.166667 27.6664 0.76362 27.6664 1.5ZM107 156.5L107.047 156.745L107.058 156.743L107.069 156.74L107 156.5ZM261.666 269C261.666 269.736 262.263 270.333 262.999 270.333C263.736 270.333 264.333 269.736 264.333 269C264.333 268.264 263.736 267.667 262.999 267.667C262.263 267.667 261.666 268.264 261.666 269ZM28.8345 1.31238C-4.77145 30.905 -5.82887 73.7417 11.8051 107.172C29.4363 140.597 65.7838 164.678 107.047 156.745L106.952 156.255C65.9542 164.136 29.8011 140.217 12.2473 106.939C-5.30377 73.6655 -4.23054 31.095 29.165 1.68762L28.8345 1.31238ZM107.069 156.74C166.555 139.592 246.876 176.02 262.753 269.042L263.246 268.958C247.319 175.644 166.704 139.029 106.93 156.26L107.069 156.74Z"
                                fill="#3F5540"
                            />
                        </svg>
                    ) : (
                        <svg
                            className={`${css.svg} ${css.line2}`}
                            viewBox="0 0 920 920"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM382.885 503.037L382.965 503.531L382.984 503.528L383.003 503.523L382.885 503.037ZM914.333 917C914.333 918.473 915.527 919.667 917 919.667C918.473 919.667 919.667 918.473 919.667 917C919.667 915.527 918.473 914.333 917 914.333C915.527 914.333 914.333 915.527 914.333 917ZM2.50023 3.01517C5.17382 91.1123 12.308 230.501 62.7407 340.73C87.9618 395.854 124.026 443.718 175.805 474.219C227.59 504.724 295.038 517.829 382.965 503.531L382.804 502.544C295.061 516.812 227.858 503.721 176.312 473.358C124.76 442.991 88.8144 395.314 63.6501 340.314C13.3122 230.293 6.17381 91.097 3.49977 2.98483L2.50023 3.01517ZM383.003 503.523C510.223 472.502 626.615 491.836 719.682 560.914C812.758 629.999 882.569 748.888 916.51 917.099L917.49 916.901C883.516 748.529 813.61 629.386 720.278 560.111C626.936 490.828 510.228 471.472 382.766 502.552L383.003 503.523Z"
                                fill="#3F5540"
                            />
                        </svg>
                    )}
                </div>
            </div>

            <div className={css.calendarBox}>
                <SimpleBookingComponent />
            </div>
        </>
    )
});

export default Block1;