import React from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

import css from "./LangBtn.module.scss";

type BtnProps = {
  name: 'uk' | 'en';
  isActive: boolean;
}

const Btn: React.FC<BtnProps> = ({name, isActive }) => {
  const locale = useLocale();
  const pathname = usePathname();

  const nextLocale = locales.filter(l => l !== locale)[0];
  const link = pathname.replace(`/${locale}`, `/${nextLocale}`);
  return (
    <>
      {
        isActive ?
          <span role="button"
            aria-pressed="true"
            tabIndex={0} 
            className={`${css.langBtn} ${css.active}`}>{name}</span> :
          <Link
            role="button"
            aria-pressed="false"
            tabIndex={0}
            className={css.langBtn}
            href={link}
          >
            {name}
          </Link>
      }
    </>
  );
}

const locales = ['uk', 'en'];

const LangBtn = () => {
  const locale = useLocale();
  
  return (
    <div className={css.langContainer}>
      <Btn name="uk" isActive={locale === "uk"} />
      <p>&nbsp;/&nbsp;</p>
      <Btn name="en" isActive={locale === "en"} />
    </div>
  );
};

export default LangBtn;
