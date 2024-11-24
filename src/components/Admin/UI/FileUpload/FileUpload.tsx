import React, { useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
    setItems: React.Dispatch<React.SetStateAction<{
        id: UniqueIdentifier;
        src: string | File;
    }[]>>;
    disabled: boolean
};

export default function FileUpload({ setItems, disabled }: Props) {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        console.log(file)
        setItems(items => [...items, { id: items.length as UniqueIdentifier, src: file }]);
    }

    const onDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (!file) return;
        setItems(items => [...items, { id: items.length as UniqueIdentifier, src: file }]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    return (
        <>
            <div className={`min-h-[100px] flex items-center justify-center w-full after:rounded-lg after:border after:border-dashed after:border-transparent after:absolute  ${isDragOver && 'after:bg-base-green/30  after:border-base-green  after:inset-0'}`}
                onDrop={onDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className='flex items-center justify-stretch  w-full'>
                    <div className='relative cursor-pointer w-full'>

                        <button type='button' className={`relative bg-base-green w-full h-[55px] text-center text-white rounded-lg text-xl leading-[55px] hover::bg-dark-green shadow-xl active:shadow-inner transition ${disabled && 'blur-[2px] opacity-50  '}`} tabIndex={-1}>
                            Додати зображення (або перетягніть файл сюди)
                            <input type="file" title='' accept='image/*' disabled={disabled} className={`absolute inset-0 opacity-0 cursor-pointer ${disabled && 'cursor-auto'}`} onChange={handleAddFile} tabIndex={0} />
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};