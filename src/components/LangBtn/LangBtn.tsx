<<<<<<< HEAD
import React from "react";
import css from "./LangBtn.module.scss";

const LangBtn = () => {
  return (
    <div className={css.langContainer}>
      <button className={`${css.langBtn} ${css.active}`}>UA</button>
      <p>/</p>
      <button className={css.langBtn}>EN</button>
=======
import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import css from "./LangBtn.module.scss";

const LangBtn = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const changeLanguageHandler = (nextLocal: string) => {
    startTransition(() => {
      router.replace(`/${nextLocal}`);
    });
    // setActiveButton(nextLocal);
  };

  useEffect(() => {
    setActiveButton(localActive);
  }, [localActive]);

  return (
    <div className={css.langContainer}>
      <button
        disabled={isPending}
        value="uk"
        className={
          activeButton === "uk" ? `${css.langBtn} ${css.active}` : css.langBtn
        }
        onClick={() => changeLanguageHandler("uk")}
      >
        UA
      </button>
      <p>/&nbsp;</p>
      <button
        disabled={isPending}
        value="en"
        className={
          activeButton === "en" ? `${css.langBtn} ${css.active}` : css.langBtn
        }
        onClick={() => changeLanguageHandler("en")}
      >
        EN
      </button>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    </div>
  );
};

export default LangBtn;
