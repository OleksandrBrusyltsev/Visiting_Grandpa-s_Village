import React, { memo } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useMainStore } from '@/stores/store-provider';

type Props = Readonly<{
    setItems: React.Dispatch<React.SetStateAction<{
        id: UniqueIdentifier;
        src: string;
        raw: string | File
    }[]>>;
}>;

const FileUpload = memo(function FileUpload({ setItems }: Props) {
    const setIsDirtyPage = useMainStore(state => state.setIsDirtyPage);

    const onAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files?.length) return;

        const getNewItems = (startIndex: number) => Array.from(files).map((file, index) => ({ id: (startIndex + index) as UniqueIdentifier, src: URL.createObjectURL(file), raw: file }));
        setItems(items => [...items, ...getNewItems(items.length)]);
        setIsDirtyPage(true);
    }

    return (
        <div className={`min-h-[100px] flex items-center justify-center w-full `}>
            <div className='flex items-center justify-stretch  w-full'>
                <div className='relative cursor-pointer w-full'>
                    <button type='button' className={`relative bg-base-green w-full h-[55px] text-center text-white rounded-lg text-xl leading-[55px] hover::bg-dark-green shadow-xl active:shadow-inner transition`} tabIndex={-1}>
                        Додати зображення (або перетягніть файл сюди)
                        <input type="file" title='' accept='image/*' multiple
                            className={`absolute inset-0 opacity-0 cursor-pointer`}
                            onChange={onAddFiles} tabIndex={0} />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default FileUpload;