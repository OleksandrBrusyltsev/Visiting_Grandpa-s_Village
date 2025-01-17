"use client";

import React, { useEffect, useState } from 'react';

type Props = Readonly<{
    children: React.ReactNode;
}>;

export function ResizableContainer({ children }: Props) {
    const [pageWidth, setPageWidth] = useState<number>(0);

    useEffect(() => {
        if (resizableBlockRef.current)
            setPageWidth(parseInt(window.getComputedStyle(resizableBlockRef.current).width, 10));
    }, []);

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            const entry = entries[0];
            if (entry) {
                setPageWidth(entry.contentRect.width);
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        if (resizableBlockRef.current) {
            resizeObserver.observe(resizableBlockRef.current);
        }

        return () => {
            if (resizableBlockRef.current) {
                resizeObserver.unobserve(resizableBlockRef.current);
            }
        };
    }, []);

    const resizableBlockRef = React.useRef<HTMLDivElement>(null);
    const resizeHandleRef = React.useRef<HTMLDivElement>(null);

    const handleResize = (e: React.MouseEvent) => {
        if (resizableBlockRef.current && resizeHandleRef.current) {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startWidth = parseInt(window.getComputedStyle(resizableBlockRef.current).width, 10);

            const onMouseMove = (e: MouseEvent) => {
                if (resizableBlockRef.current && resizeHandleRef.current) {
                    const newWidth = startWidth + (e.clientX - startX) * 2;
                    setPageWidth(newWidth);
                    resizableBlockRef.current.style.width = `${newWidth}px`;
                }
            }

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    }

    return (
        <div className="inline-block relative w-full">
            <h2 className='text-xl my-4'> Ширина блоку, в якому знаходиться превьюшка - {pageWidth} px</h2>

            <div className={`@container/resizeContainer w-full border rounded-lg border-base-green relative overflow-auto mx-auto`}
                ref={resizableBlockRef}
            >
                {children}
                <div className="w-1 h-full hover:bg-blue-500 absolute bottom-0 right-0 cursor-col-resize rounded-full" onMouseDown={handleResize} ref={resizeHandleRef}></div>
            </div>
        </div>
    )
};