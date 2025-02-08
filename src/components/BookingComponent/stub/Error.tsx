import Image from "next/image";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "@/components/ui/Button/Button";

import s from "./Feedback.module.scss";
import { messages } from "@/data/bookingStub";

type Props = Readonly<{
  isOpen: boolean;
  handleClose: (() => void) | undefined;
  handleRepeatFilling: () => void;
}>;

export default function Error({
  handleClose,
  isOpen,
  handleRepeatFilling,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { title, subtitle, message } = messages[2];

  const locale = useLocale() as Language;
  const t = useTranslations("BookingStub");

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
    <div className={`${s.wrapper} ${s.error}`} ref={wrapperRef}>
      <Image
        style={{
          position: "relative",
          zIndex: -2,
        }}
        src="/images/grandpas/Grandpa3.png"
        alt=""
        width={186}
        height={210}
      />
      <h1 className={s.title}>{title[locale]}</h1>
      <h2 className={s.subTitle}>{subtitle[locale]}</h2>
      <p className={s.message}>{message[locale]}</p>
      <button className={s.closeBtn} onClick={handleClose}>
        &times;
      </button>
      <Button
        className={s.mainBtn}
        onClick={handleRepeatFilling}
        label={t('fillForm')}
        size="default"
      />
    </div>
  );
}
