import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
    DndContext, DragEndEvent, DragOverlay, UniqueIdentifier, closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MeasuringStrategy,
    defaultDropAnimationSideEffects,
    DropAnimation,
    DragStartEvent,
    TouchSensor,
} from '@dnd-kit/core';
import SortableItem, { Item } from '@/components/Admin/UI/DnD/SortableItem/SortableItem';
import {
    AnimateLayoutChanges,
    arrayMove,
    defaultAnimateLayoutChanges,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import FileUpload from '@/components/Admin/UI/FileUpload/FileUpload';
import { stubImage } from '@/data/stubs';
import SimpleGalleryWrapper from './SimpleGalleryWrapper';
import { useMainStore } from '@/stores/store-provider';

type SimpleGalleryProps = {
    photo: (string | File)[];
    classNames?: {
        wrapper?: string;
        item?: string;
    },
    ref: React.ForwardedRef<ResetType>;
}

const SimpleGallery = forwardRef<ResetType, SimpleGalleryProps>(function SimpleGallery({ photo, classNames }, ref) {
    const photosEditing = useMainStore((state) => state.photosEditing);
    const setPhotosEditing = useMainStore((state) => state.setPhotosEditing);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setPhotosEditing(photo.map((image, i) => ({
                id: `${i}` as UniqueIdentifier,
                raw: image,
                src: typeof image === 'string' ? image : URL.createObjectURL(image),
            })))
        }
    }), [photo, setPhotosEditing]);

    //храним одновременно и изображения, и локальную ссылку на него, т.к. динамическая генерация ссылок при рендере вызывает мерзание UI
    useEffect(() => {
        setPhotosEditing(photo.map((image, i) => ({
            id: `${i}` as UniqueIdentifier,
            raw: image,
            src: typeof image === 'string' ? image : URL.createObjectURL(image),
        })), true)
    }, [photo, setPhotosEditing]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleRemove = (id: UniqueIdentifier) => {
        setPhotosEditing((items) => items.filter((item) => item.id !== id));
        setIsDirtyPage(true);
    };

    const handleChange = (id: UniqueIdentifier) => {
        const currentItemIndex = photosEditing.findIndex((item) => item.id === id);
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setPhotosEditing((items) => {
                    const newItems = [...items];
                    newItems[currentItemIndex] = { id, src: URL.createObjectURL(file), raw: file };
                    return newItems;
                });
                setIsDirtyPage(true);
            }
            event.target.value = '';
        }
    };

    function handleDragStart(event: DragStartEvent) {
        if (event.active) setActiveId(event.active.id);
    }

    function handleDragEnd({ active, over }: DragEndEvent) {

        if (!over || !activeId) return;

        if (active.id !== over.id) {
            setPhotosEditing((items) => {

                const oldIndex = getIndex(activeId, items);
                const newIndex = getIndex(over?.id, items);

                return arrayMove(items, oldIndex, newIndex);
            });
            setIsDirtyPage(true);
        }
        setActiveId(null);
    }

    const sizeOfRow = photosEditing.length > 5 ? '@[1024px]:auto-rows-[225px]' : '@[1280px]:auto-rows-[265px]';

    return (
        <SimpleGalleryWrapper setItems={setPhotosEditing}>
            {
                photosEditing.length ?
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={() => setActiveId(null)}
                        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
                    >
                        <SortableContext items={photosEditing} strategy={rectSortingStrategy}>

                            {/* <ul className={`max-w-[1180px] !auto-rows-auto select-none grid grid-cols-1 @[768px]:grid-cols-3 @[1280px]:grid-cols-4 gap-[9px] @[1280px]:gap-[24px] ${sizeOfRow}`}> */}
                            <ul className={`${classNames
                                ? classNames.wrapper
                                : 'max-w-[1180px] select-none mx-auto grid grid-cols-12 gap-4 auto-rows-[160px]'} ${sizeOfRow}`}>
                                {
                                    (photosEditing.length ?
                                        photosEditing :
                                        [{
                                            id: '0',
                                            src: stubImage
                                        }]
                                    ).map((value, index) => (
                                        <SortableItem
                                            classNames={classNames ? classNames.item : getGridClasses(photosEditing.length, index + 1)}
                                            // classNames='aspect-[1.16] @[768px]:aspect-[1.09] @[1280px]:aspect-[1.11]'
                                            key={value.id}
                                            id={value.id}
                                            index={index}
                                            onChange={handleChange}
                                            onRemove={handleRemove}
                                            animateLayoutChanges={animateLayoutChanges}
                                            dragOverlay={false}
                                        >
                                            <Image src={value.src}
                                                alt="house image"
                                                width={400}
                                                height={400}
                                                className='w-full h-full object-cover' />
                                        </SortableItem>
                                    ))
                                }
                            </ul>
                        </SortableContext>
                        {createPortal(
                            <DragOverlay
                                adjustScale={true}
                                dropAnimation={dropAnimationConfig}
                            >
                                {activeId ? (
                                    <Item
                                        fadeIn
                                        dragOverlay
                                    >
                                        <Image src={photosEditing[getIndex(activeId, photosEditing)].src}
                                            alt="house image"
                                            width={400}
                                            height={400}
                                            className={`w-full h-full object-cover`} />
                                    </Item>
                                ) : null}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>
                    : <Image src={stubImage}
                        draggable={false}
                        alt="no house data"
                        width={400}
                        height={400}
                        className={`mx-auto`} />
            }
            <FileUpload setItems={setPhotosEditing} />
        </SimpleGalleryWrapper>
    );
});

export default memo(SimpleGallery);

//хелпер для определения количества колонок
export function getGridClasses(total: number, i: number) {
    if (total < 3) {
        return 'col-span-6 row-span-2';
    } else if (total === 3) {
        switch (i) {
            case 1: return 'col-span-7 row-span-2';
            case 2: return 'col-span-5';
            case 3: return 'col-span-5';
        }
    } else if (total === 4) {
        switch (i) {
            case 1: return 'col-span-7 row-span-2';
            case 2: return 'col-span-5';
            case 3: return 'col-span-2';
            case 4: return 'col-span-3';
        }
    } else {
        switch (i) {
            case 1: return 'col-span-7 row-span-2';
            case 2: return 'col-span-2';
            case 3: return 'col-span-3';
            case 4: return 'col-span-3';
            case 5: return 'col-span-2';
            default: return 'col-span-2';
        }
    }
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

const getIndex = (id: UniqueIdentifier, items: {
    id: UniqueIdentifier;
    src: string | File;
}[]) => items.findIndex((item) => item.id === id);
