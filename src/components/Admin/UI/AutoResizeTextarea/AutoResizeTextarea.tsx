import React, { useEffect, useRef } from 'react';

type Props = {
    defaultValue: string;
    className?: string;
    name: string
};

export default function AutoResizeTextarea({ defaultValue, className, name }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Функция для обновления количества строк
        const updateHeight = () => {
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
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
            name={name}
            ref={textareaRef}
            className={className}
            defaultValue={defaultValue}
            required
            style={{ resize: 'none', overflow: 'hidden' }}
        />
    );
}
