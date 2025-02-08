import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "@/components/ui/Button/Button";

import s from "./Feedback.module.scss";
import { messages } from "@/data/bookingStub";

type Props = Readonly<{
  handleClose: (() => void) | undefined;
  isOpen: boolean;
}>;

export default function Success({ handleClose, isOpen }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { push } = useRouter();
  const { title, subtitle, message } = messages[1];

  const locale = useLocale() as Language;
  const t = useTranslations("UI");

  useGSAP(
    () => {
      if (isOpen) {
        gsap.set(wrapperRef.current, { display: "flex" });
        gsap.to(wrapperRef.current, {
          autoAlpha: 1,
          ease: "power1.out",
          delay: 0.4,
          duration: 0.3,
        });
      } else gsap.set(wrapperRef.current, { display: "none" });
    },
    { dependencies: [isOpen] }
  );

  if (!handleClose) return;

  return (
    <div className={`${s.wrapper} ${s.success}`} ref={wrapperRef}>
      <Image
        src="/images/grandpas/Grandpa1.png"
        alt=""
        width={160}
        height={160}
      />
      <h1 className={s.title}>
        {title[locale]}{" "}
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5393 0.456086L12.1449 15.7108C11.7558 16.0964 11.1249 16.0964 10.7357 15.7108C10.7021 15.6775 10.6714 15.6424 10.6436 15.6058C10.6071 15.5787 10.5719 15.5484 10.5384 15.5153L0.459825 5.52803C0.355212 5.42437 0.354443 5.25553 0.458108 5.15091C0.508186 5.10038 0.576381 5.07195 0.647526 5.07195H2.70783C2.77813 5.07195 2.84559 5.09971 2.89553 5.14919L11.4399 13.6157L25.1036 0.0772387C25.1535 0.0277592 25.221 0 25.2913 0H27.3516C27.4989 0 27.6183 0.11939 27.6183 0.266666C27.6183 0.337812 27.5898 0.406008 27.5393 0.456086Z"
            fill="#24BB2B"
          />
        </svg>
      </h1>
      <h2 className={s.subTitle}>{subtitle[locale]}</h2>
      <p className={s.message}>{message[locale]}</p>
      <button className={s.closeBtn} onClick={handleClose}>
        &times;
      </button>
      <Button
        className={s.mainBtn}
        onClick={() => {
          handleClose();
          push("/");
        }}
        label={t('home')}
        size="large"
      />
    </div>
  );
}
