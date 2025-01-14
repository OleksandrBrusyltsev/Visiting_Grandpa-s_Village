import { useMainStore } from '@/stores/store-provider';
import React, { useEffect, useRef } from 'react';

type Props = {
    defaultValue?: string;
    className?: string;
    name: string;
    onFocus?: () => void;
    onBlur?: () => void;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AutoResizeTextarea({ defaultValue, className, name, ...props }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const isDirtyPage = useMainStore((state) => state.isDirtyPage);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const handleChange = () => {
        if (!isDirtyPage && textareaRef.current && textareaRef.current.value !== defaultValue) setIsDirtyPage(true);
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Функция для обновления количества строк
        const updateHeight = () => {
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
            //нарочно устанавливаем мин высоту, т.к. дефолтное значение высоты textarea - 2 строки
            textarea.style.height = `${lineHeight}px`;
            textarea.style.height = `${Math.max(textarea.scrollHeight, lineHeight)}px`;
        };

        updateHeight();

        textarea.addEventListener('input', updateHeight);

        const textareaResizeObserver = new ResizeObserver(() => {
            updateHeight();
        });
        textareaResizeObserver.observe(textarea);

        return () => {
            textarea.removeEventListener('input', updateHeight);
            textareaResizeObserver.disconnect();
        };
    }, []);

    return (
        <textarea
            {...props}
            name={name}
            ref={textareaRef}
            className={className}
            defaultValue={defaultValue}
            onChange={props.onChange || handleChange}
            required
            style={{ resize: 'none', overflow: 'hidden' }}
        />
    );
}
