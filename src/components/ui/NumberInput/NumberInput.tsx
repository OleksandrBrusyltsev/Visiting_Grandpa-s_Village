import React from 'react'

import s from './NumberInput.module.scss';

interface GuestsProps {
    count: number;
    min: number;
    max: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    children?: React.ReactNode; 
}

export default function NumberInput({
    count,
    min = 0,
    max = 1,
    setCount,
    children
  }: GuestsProps) {
    
    const handleChange = (val: number) => {
        if (count < max && val > 0 || count > min && val < 0) {
          setCount(count + val);
        }
    };

    return (
        <div className={s.inputWrapper}>
            {children}
            <div className={s.buttonWrapper}>
                <button
                    className={`${s.changeButton} ${count === min ? s.disabled : ''}`}
                    type="button"
                    onClick={() => handleChange(-1)}
                >
                    -
                </button>
                <p className={s.value}>{count}</p>
                <button
                    className={`${s.changeButton} ${count === max ? s.disabled : ''}`}
                    type="button"
                    onClick={() => handleChange(1)}
                >
                    +
                </button>
            </div>
        </div>
    )
}
