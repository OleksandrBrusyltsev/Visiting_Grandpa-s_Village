import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import css from "@/components/Home/Home.module.scss";
import { illustration1 } from '@/components/Home/Home';

//все стили на костылях! ОСТОРОЖНО!!!
const HeroBlock = forwardRef<ResetType, Omit<EditPageProps<MainPageBlock>, 'position'>>(function HeroBlock({
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
    const { subtitle, quote, title } = item;

    useImperativeHandle(ref, () => ({
        reset() {
            setDescription(() => item.description[lang]);
        }
    }), [item.description, lang]);

    return (

        <>
            <div className={`${css.box1Ref} relative w-full`}>
                <div className={`${css.grandpa1} relative`}>
                    <Image
                        src={
                            typeof imagePreviews[0] === 'string'
                                ? imagePreviews[0]
                                : URL.createObjectURL(imagePreviews[0])}
                        alt=""
                        width={334}
                        height={334}
                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`opacity-0 absolute inset-0 cursor-pointer z-20`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0}
                        width={334}
                        height={334}
                    />
                </div>
                <div className={`${css.grandbox1} relative`}>
                    {lang === 'uk' && <input type="hidden" value={item.id} name='id-0' />}
                    <Input name={`title-${lang}-0`}
                        className={`${css.textBox1} ${css.mainTitle} bg-transparent relative z-10 w-[70%] @[768px]:!w-full`}
                        defaultValue={title[lang]}
                        onChange={handleTextChange} />
                </div>

                <div className={`${css.text1} ${css.textBox1} relative w-full`}>
                    <span className={`${css.text3} inline-block min-w-[280px] `}>
                        <Input name={`subtitle-${lang}-0`}
                            className={`bg-transparent relative z-10 w-full`}
                            defaultValue={subtitle[lang]}
                            onChange={handleTextChange} />
                    </span>{" "}
                    <div className={`relative`}>

                        <Input name={`description-${lang}-0`}
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
                <div className={`${css.text2} ${css.textBox1} !w-full @[1280px]:!w-[50%]`}>
                    <Input name={`quote-${lang}-0`}
                        className={`bg-transparent w-full relative z-20`}
                        defaultValue={quote[lang]}
                        onChange={handleTextChange} />
                </div>
                {/* </div> */}
            </div>

            <div className={css.imgBox}>
                <Image
                    src={typeof imagePreviews[1] === 'string'
                        ? imagePreviews[1]
                        : URL.createObjectURL(imagePreviews[1])}
                    alt=""
                    width={544}
                    height={492}
                    className={css.photo1}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.photo1} absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 1)}
                    tabIndex={0}
                    width={544}
                    height={492}
                />
                <Image
                    src={illustration1}
                    alt=""
                    width={410}
                    height={372}
                    className={css.illustration1}
                />
                <div className={css.line1Box}>
                    {isMobile ? (
                        <svg
                            viewBox="0 0 195 269"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${css.svg} ${css.line1}`}
                        >
                            <path
                                d="M0.431764 267C0.431764 267.736 1.02872 268.333 1.7651 268.333C2.50148 268.333 3.09843 267.736 3.09843 267C3.09843 266.264 2.50148 265.667 1.7651 265.667C1.02872 265.667 0.431764 266.264 0.431764 267ZM99.4135 128.901L99.3839 128.653L99.4135 128.901ZM191.667 2C191.667 2.73638 192.264 3.33333 193 3.33333C193.736 3.33333 194.333 2.73638 194.333 2C194.333 1.26362 193.736 0.666667 193 0.666667C192.264 0.666667 191.667 1.26362 191.667 2ZM2.01321 266.969C0.893455 257.898 -0.672243 226.525 11.0104 195.88C22.6861 165.253 47.5908 135.35 99.4432 129.15L99.3839 128.653C47.3147 134.88 22.2727 164.933 10.5432 195.702C-1.17917 226.451 0.391685 257.914 1.51698 267.031L2.01321 266.969ZM99.4432 129.15C138.517 124.477 161.99 108.814 175.681 86.2251C189.361 63.6535 193.25 34.2033 193.25 2H192.75C192.75 34.1805 188.86 63.5155 175.253 85.9659C161.658 108.399 138.337 123.995 99.3839 128.653L99.4432 129.15Z"
                                fill="#3F5540"
                            />
                        </svg>
                    ) : (
                        <svg
                            className={`${css.svg} ${css.line1}`}
                            viewBox="0 0 201 246"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.565852 243C0.565852 244.473 1.75976 245.667 3.23252 245.667C4.70528 245.667 5.89919 244.473 5.89919 243C5.89919 241.527 4.70528 240.333 3.23252 240.333C1.75976 240.333 0.565852 241.527 0.565852 243ZM96.6382 107.467L96.5814 106.97L96.6382 107.467ZM187.717 3C187.717 4.47276 188.911 5.66667 190.384 5.66667C191.857 5.66667 193.05 4.47276 193.05 3C193.05 1.52724 191.857 0.333333 190.384 0.333333C188.911 0.333333 187.717 1.52724 187.717 3ZM3.72807 242.933C1.00947 222.684 2.02618 191.46 14.8395 164.045C27.6376 136.662 52.2105 113.055 96.6951 107.963L96.5814 106.97C51.7234 112.104 26.8663 135.951 13.9336 163.621C1.01613 191.26 0.00123632 222.69 2.73697 243.067L3.72807 242.933ZM96.6951 107.963C138.484 103.18 169.399 92.1539 186.185 74.6548C194.591 65.8919 199.449 55.5106 200.348 43.5085C201.246 31.5162 198.189 17.9419 190.834 2.78175L189.934 3.21825C197.237 18.2715 200.231 31.6673 199.35 43.4339C198.47 55.1907 193.719 65.3571 185.464 73.9625C168.928 91.2003 138.311 102.194 96.5814 106.97L96.6951 107.963Z"
                                fill="#3F5540"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </>







        // <li className={s.entertainmentGroup} key={id}>
        //     <hgroup className={`${q.quoteWrapper} ${position % 2 ? q.right : q.left}`}>
        //         {lang === 'uk' && <input type="hidden" value={id} name={`id-${position + 1}`} />}
        //         <div
        //             className={`${q.quoteTitle} !text-start relative`}>
        //             { /* МЕГАКОСТЫЛЬ с тегом <p></p>!!! Не работает, если в textarea более 1 строки*/}
        //             <p className='opacity-0'>{title}</p>
        //             <Input name={`description-${lang}-${position + 1}`}
        //                 className={`bg-transparent absolute top-0 z-10 w-full`}
        //                 value={title}
        //                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //                     handleTextChange();
        //                     setTitle(e.target.value);
        //                 }} />
        //             <Icon name="ellipse" className={`${q.titleOutline} w-min`} />
        //         </div>
        //         <div className={`${s.quoteText} relative`} >
        //             <Input name={`description-${lang}-${position + 1}`}
        //                 className={`w-full -ml-[4px] ${isEditing
        //                     ? 'opacity-100'
        //                     : 'opacity-0 absolute top-0 left-0 z-10'}`}
        //                 value={description}
        //                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //                     handleTextChange();
        //                     setDescription(e.target.value);
        //                 }}
        //                 onFocus={() => setIsEditing(true)}
        //                 onBlur={() => setIsEditing(false)}
        //             />
        //             <MarkdownPreview className={
        //                 `${isEditing
        //                     ? 'opacity-0 absolute'
        //                     : 'opacity-100 static'}`}
        //                 markdown={description} />
        //         </div>
        //     </hgroup>
        //     <div className={`${s.entertainmentImgWrapper} !z-0 ${position % 2 ? s.left : s.right}`}>
        //         <Image
        //             src={
        //                 typeof imagePreviews[0] === 'string'
        //                     ? imagePreviews[0]
        //                     : URL.createObjectURL(imagePreviews[0])
        //             }
        //             alt=""
        //             sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
        //             fill
        //         />
        //         <input
        //             type="file"
        //             title=''
        //             accept='image/*'
        //             className={`absolute inset-0 opacity-0 cursor-pointer z-10`}
        //             onChange={(e) => handleFileChange(e, 0)}
        //             tabIndex={0} />
        //     </div>
        //     <div
        //         className={`${s.entertainmentImgWrapper} !z-0 ${position % 2 ? s.right : s.left}`}
        //     >
        //         <Image
        //             src={
        //                 typeof imagePreviews[1] === 'string'
        //                     ? imagePreviews[1]
        //                     : URL.createObjectURL(imagePreviews[1])
        //             }
        //             alt=""
        //             sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
        //             fill
        //         />
        //         <input
        //             type="file"
        //             title=''
        //             accept='image/*'
        //             className={`absolute inset-0 opacity-0 cursor-pointer z-10`}
        //             onChange={(e) => handleFileChange(e, 1)}
        //             tabIndex={0} />
        //     </div>
        // </li>

    )
});

export default HeroBlock;