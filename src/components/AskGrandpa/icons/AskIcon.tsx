import { FC } from "react";
import style from "../AskGrandpa.module.scss";

const AskIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 32"
      fill="none"
      className={style.iconAsk}
    >
      <path
        d="M18.0026 1C8.8026 1 1.33594 7.66667 1.33594 16C1.34084 18.4848 2.02049 20.9215 3.30249 23.05L1.33594 31L8.53564 28.3334C11.3781 30.0937 14.6592 31.0178 18.0026 31C27.2026 31 34.6693 24.3333 34.6693 16C34.6693 7.66667 27.2026 1 18.0026 1Z"
        stroke="#3F5540"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
      />
      <circle cx="9.5" cy="15.5" r="2.5" fill="#FEFEFE" />
      <circle cx="17.5762" cy="15.5" r="2.5" fill="#FEFEFE" />
      <circle cx="25.6543" cy="15.5" r="2.5" fill="#FEFEFE" />
    </svg>
  );
};

export default AskIcon;
