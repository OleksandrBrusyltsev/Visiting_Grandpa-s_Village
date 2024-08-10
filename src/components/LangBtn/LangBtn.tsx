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
    </div>
  );
};

export default LangBtn;
