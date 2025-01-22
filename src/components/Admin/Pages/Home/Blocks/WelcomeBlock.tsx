import { forwardRef, useImperativeHandle, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

import Input from '@/components/Admin/UI/AutoResizeTextarea/AutoResizeTextarea';
import { useTranslations } from "@/hooks/useTranslations";

import style from "@/components/WelcomeBlock/WelcomeBlock.module.scss";

const WelcomeBlock = forwardRef<ResetType, Omit<EditPageProps<MainPageBlock>, 'position'>>(function WelcomeBlock({
  item,
  imagePreviews,
  lang,
  handleTextChange,
  handleFileChange,
},
  ref) {
  const [description, setDescription] = useState(() => item.description[lang]);
  const tGlobal = useTranslations('UI', lang, true);

  const [isEditing, setIsEditing] = useState(false);
  const { title, photos } = item;

  useImperativeHandle(ref, () => ({
    reset() {
      setDescription(() => item.description[lang]);
    }
  }), [item.description, lang]);

  return (
    <>
      <div className={style.blockWrapper}>
        <div className={`${style.textWrapper} relative  z-20 `}>
          <Input name={`title-${lang}-1`}
            className={`bg-transparent relative`}
            defaultValue={title[lang]}
            onChange={handleTextChange} />

        </div>
        <div className={style.imageWrapper}>
          <Image
            src={typeof imagePreviews[0] === 'string'
              ? imagePreviews[0]
              : URL.createObjectURL(imagePreviews[0])}
            alt={'CTA picture'}
            sizes='(max-width: 1280px) 100vw, (max-width: 1440px) 80vw, 70vw'
            fill={true}
            priority
            className={style.image}
          />
          <input
            type="file"
            title=''
            accept='image/*'
            className={`absolute inset-0  !z-10 opacity-0 cursor-pointer`}
            onChange={(e) => handleFileChange(e, 0)}
            tabIndex={0}
          />
          <div className={`${style.buttonWrapper} relative`}>
            <Link href='#' className="relative z-20">
              <Button size="large" label={tGlobal('visit')} className={style.button} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
});

export default WelcomeBlock;
