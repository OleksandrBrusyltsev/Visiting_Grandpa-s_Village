import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image';

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import MarkdownPreview from '@/components/ui/MarkdownPreview/MarkdownPreview';

import css from "@/components/Home/Home.module.scss";
import { illustration2 } from '@/components/Home/Home';

//все стили на костылях! ОСТОРОЖНО!!!
const Block3 = forwardRef<ResetType, Omit<EditPageProps<MainPageBlock>, 'position'>>(function Block3({
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
            <div className={`${css.textContainer2} w-full`}>
                <Image
                    src={illustration2}
                    alt=""
                    width={506}
                    height={498}
                    className={css.illustration2}
                />
                {lang === 'uk' && <input type="hidden" value={item.id} name='id-3' />}
                <div>
                    <Input name={`title-${lang}-3`}
                        className={`${css.title1} ${css.add1} bg-transparent relative z-10`}
                        defaultValue={title[lang]}
                        onChange={handleTextChange} />
                    <div className={`${css.text1} relative`}>
                        <Input name={`description-${lang}-3`}
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
            </div>
            <div className={css.imgBox4}>
                <Image
                    src={typeof imagePreviews[1] === 'string'
                        ? imagePreviews[1]
                        : URL.createObjectURL(imagePreviews[1])}
                    alt=""
                    width={453}
                    height={469}
                    className={css.grandpa3}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.grandpa3} absolute inset-0 opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 1)}
                    tabIndex={0}
                    width={453}
                    height={469}
                />
                <div className={`${css.photo7} relative`}>
                    <Image
                        src={
                            typeof imagePreviews[0] === 'string'
                                ? imagePreviews[0]
                                : URL.createObjectURL(imagePreviews[0])
                        }
                        alt=""
                        width={668}
                        height={668}

                    />
                    <input
                        type="file"
                        title=''
                        accept='image/*'
                        className={`absolute inset-0 opacity-0 cursor-pointer`}
                        onChange={(e) => handleFileChange(e, 0)}
                        tabIndex={0}
                        width={668}
                        height={668}
                    />
                </div>
                <Image
                    src={typeof imagePreviews[2] === 'string'
                        ? imagePreviews[2]
                        : URL.createObjectURL(imagePreviews[2])}
                    alt=""
                    width={550}
                    height={352}
                    className={css.photo8}
                />
                <input
                    type="file"
                    title=''
                    accept='image/*'
                    className={`${css.photo8} opacity-0 cursor-pointer`}
                    onChange={(e) => handleFileChange(e, 2)}
                    tabIndex={0}
                    width={550}
                    height={352}
                />
                <div className={css.line4Box}>
                    {isMobile ? (
                        <svg
                            viewBox="0 0 237 375"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${css.svg} ${css.line4}`}
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M21.666 2C21.666 2.73638 22.2629 3.33333 22.9993 3.33333C23.7357 3.33333 24.3327 2.73638 24.3327 2C24.3327 1.26362 23.7357 0.666667 22.9993 0.666667C22.2629 0.666667 21.666 1.26362 21.666 2ZM137 117L136.934 117.241L137 117ZM220.5 273L220.312 272.835L220.307 272.841L220.303 272.846L220.5 273ZM45.6667 373.5C45.6667 374.236 46.2636 374.833 47 374.833C47.7364 374.833 48.3333 374.236 48.3333 373.5C48.3333 372.764 47.7364 372.167 47 372.167C46.2636 372.167 45.6667 372.764 45.6667 373.5ZM22.8407 1.80678C10.9498 11.5699 3.3604 21.3002 0.891256 31.0178C-1.5832 40.7563 1.09594 50.4335 9.62855 60.0443C18.1528 69.6457 32.5285 79.1947 53.4861 88.7157C74.4476 98.2385 102.013 107.741 136.934 117.241L137.066 116.759C102.158 107.263 74.6213 97.7682 53.6929 88.2605C32.7606 78.751 18.4586 69.2371 10.0025 59.7123C1.55467 50.1971 -1.04923 40.6851 1.37586 31.1409C3.80624 21.5759 11.299 11.9301 23.158 2.19322L22.8407 1.80678ZM136.934 117.241C202.113 134.972 227.278 168.911 234.005 200.864C237.371 216.852 236.125 232.36 232.945 245.119C229.763 257.885 224.652 267.875 220.312 272.835L220.688 273.165C225.098 268.125 230.237 258.053 233.43 245.24C236.625 232.421 237.879 216.836 234.495 200.761C227.722 168.589 202.387 134.528 137.066 116.759L136.934 117.241ZM220.303 272.846C209.816 286.302 184.978 308.677 153.501 329.055C122.025 349.433 83.9396 367.795 46.9635 373.253L47.0365 373.747C84.1121 368.275 122.267 349.872 153.772 329.475C185.276 309.079 210.163 286.669 220.697 273.154L220.303 272.846Z"
                                fill="#3F5540"
                            />
                        </svg>
                    ) : (
                        <svg
                            className={`${css.svg} ${css.line4}`}
                            viewBox="0 0 804 726"
                            fill="none"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.80013 3.5C0.80013 4.97276 1.99404 6.16667 3.4668 6.16667C4.93956 6.16667 6.13346 4.97276 6.13346 3.5C6.13346 2.02724 4.93956 0.833333 3.4668 0.833333C1.99404 0.833333 0.80013 2.02724 0.80013 3.5ZM685.467 501L685.861 501.307L685.866 501.301L685.467 501ZM318.8 722.5C318.8 723.973 319.994 725.167 321.467 725.167C322.94 725.167 324.133 723.973 324.133 722.5C324.133 721.027 322.94 719.833 321.467 719.833C319.994 719.833 318.8 721.027 318.8 722.5ZM3.09873 3.83842C58.403 63.9881 252.815 172.911 588.532 128.496L588.401 127.504C252.918 171.889 58.8639 63.0119 3.83486 3.16158L3.09873 3.83842ZM588.532 128.496C672.393 117.401 726.976 126.253 760.048 147.883C793.076 169.484 804.755 203.904 802.63 244.261C800.504 284.636 784.559 330.889 762.407 375.997C740.259 421.096 711.927 465.011 685.067 500.699L685.866 501.301C712.756 465.572 741.124 421.604 763.305 376.438C785.481 331.279 801.492 284.885 803.629 244.314C805.766 203.725 794.013 168.902 760.595 147.046C727.22 125.218 672.34 116.399 588.401 127.504L588.532 128.496ZM685.072 500.693C660.52 532.236 612.856 581.177 549.692 625.428C486.529 669.679 407.893 709.22 321.394 722.005L321.54 722.995C408.241 710.18 487.022 670.554 550.266 626.247C613.511 581.94 661.247 532.93 685.861 501.307L685.072 500.693Z"
                                fill="#3F5540"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </>
    )
});

export default Block3;