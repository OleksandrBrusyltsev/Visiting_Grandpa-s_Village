import React, { useState } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core';
import { validateTransferImages } from '@/functions/validateTransferImages';

type Props = {
    children: React.ReactNode;
    setItems: React.Dispatch<React.SetStateAction<{
        id: UniqueIdentifier;
        raw: string | File
        src: string;
    }[]>>
}

function SimpleGalleryWrapper({ children, setItems }: Props) {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    //--> обработка добавления изображений с помощью перетаскивания
    const onDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();

        setIsDragOver(false);
        const files = event.dataTransfer.files;

        //фильтруем не изображения
        const filteredFileList = validateTransferImages(files);
        if (!filteredFileList.length) return;

        const getNewItems = (startIndex: number) => Array.from(files).map((file, index) => ({ id: (startIndex + index) as UniqueIdentifier, src: URL.createObjectURL(file), raw: file }));
        setItems(items => [...items, ...getNewItems(items.length)]);
    };

    const onDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const onDragLeave = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        if ((event.currentTarget as HTMLElement).contains(event.relatedTarget as HTMLElement)) return;
        setIsDragOver(false);
    };

    const overlay = isDragOver ? 'after:bg-base-green/30  after:border-base-green' : 'after:border-transparent';

    return (
        <div className={`mt-4 container-admin relative after:rounded-lg after:border after:border-dashed after:absolute after:inset-0 after:pointer-events-none ${overlay}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            role='listbox'
        >
            {children}
        </div>
    )
}

export default SimpleGalleryWrapper