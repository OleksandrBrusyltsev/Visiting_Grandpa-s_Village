import React from "react";
import css from "./LangBtn.module.scss";

const LangBtn = () => {
  return (
    <div className={css.langContainer}>
      <button className={`${css.langBtn} ${css.active}`}>UA</button>
      <p>/</p>
      <button className={css.langBtn}>EN</button>
    </div>
  );
};

export default LangBtn;
