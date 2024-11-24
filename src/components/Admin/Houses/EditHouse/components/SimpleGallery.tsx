import React, { memo, useEffect, useRef, useState } from 'react'
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
import SortableItem, { Item } from '../../../UI/DnD/SortableItem/SortableItem';
import {
    AnimateLayoutChanges,
    arrayMove,
    defaultAnimateLayoutChanges,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { AdminSlice } from '@/stores/adminSlice';
import FileUpload from '../../../UI/FileUpload/FileUpload';
import { stubImage } from '@/data/stubs';
type Props = {
    houseData: { photo: (string | File)[] };
    setHouseData: AdminSlice['setHouseEditing'];
}

const SimpleGallery = memo(function SimpleGallery({ houseData, setHouseData }: Props) {

    const initialRender = useRef(true);
    const update = useRef<boolean>(true);

    const [items, setItems] = useState([...houseData.photo.map((image, i) => ({
        id: `${i}` as UniqueIdentifier,
        src: image
    }))]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [portalVisible, setPortalVisible] = useState(false);

    //для блокирование ошибок во время пререндинга на сервере
    useEffect(() => {
        if (!document.body) return;
        setPortalVisible(true);
    }, []);


    useEffect(() => {
        setItems(houseData.photo.map((image, i) => ({
            id: `${i}` as UniqueIdentifier,
            src: image
        })));
        update.current = false;
    }, [houseData]);

    //актуализируем данные в сторе после локальных изменений
    useEffect(() => {
        if (initialRender.current) {
            //блокируем обновление данных в сторе, для первого рендера
            initialRender.current = false;
            return;
        }
        if (!update.current) {
            //блокируем обновление данных в сторе, вызванное изменением пропсов
            update.current = true;
            return;
        }
        setHouseData(houseData => {
            if (houseData) {
                houseData.photo = items.map(item => item.src);
            }
            return houseData;
        });
    }, [items, setHouseData]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleRemove = (id: UniqueIdentifier) => {
        setItems((items) => items.filter((item) => item.id !== id))
    };

    const handleChange = (id: UniqueIdentifier) => {
        const changeItemIndex = items.findIndex((item) => item.id === id);
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                console.log(file)
                setItems((items) => {
                    const newItems = [...items];
                    newItems[changeItemIndex] = { id, src: file };
                    return newItems;
                });
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
            setItems((items) => {

                const oldIndex = getIndex(activeId, items);
                const newIndex = getIndex(over?.id, items);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }

    return (
        <div className='relative'>
            {
                items.length ?
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={() => setActiveId(null)}
                        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
                    >
                        <SortableContext items={items} strategy={rectSortingStrategy}>

                            <ul className={`max-w-[1180px] mx-auto grid grid-cols-12 gap-4 grid-rows-2 aspect-[3] @[1280px]/resizeContainer:aspect-auto @[1280px]/resizeContainer:h-[450px]`}>
                                {
                                    (items.length ?
                                        items :
                                        [{
                                            id: '0',
                                            src: stubImage
                                        }]
                                    ).map((value, index) => (
                                        <SortableItem
                                            classNames={getGridClasses(items.length, index)}
                                            key={value.id}
                                            id={value.id}
                                            index={index}
                                            onChange={handleChange}
                                            onRemove={handleRemove}
                                            animateLayoutChanges={animateLayoutChanges}
                                            dragOverlay={false}
                                        >
                                            <Image src={
                                                typeof value.src === 'string' ? value.src : URL.createObjectURL(value.src)
                                            }
                                                alt="house image"
                                                width={400}
                                                height={400}
                                                className='w-full h-full object-cover' />
                                        </SortableItem>
                                    ))
                                }
                            </ul>
                        </SortableContext>
                        {portalVisible && createPortal(
                            <DragOverlay
                                adjustScale={true}
                                dropAnimation={dropAnimationConfig}
                            >
                                {activeId ? (
                                    <Item
                                        fadeIn
                                        dragOverlay
                                    >
                                        <Image src={
                                            (typeof items[getIndex(activeId, items)].src === 'string'
                                                ? items[getIndex(activeId, items)].src
                                                : URL.createObjectURL(items[getIndex(activeId, items)].src as File)) as string
                                        }
                                            alt="house image"
                                            width={400}
                                            height={400}
                                            className={`w-full h-full object-cover`} />
                                    </Item>
                                ) : null}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext> :
                    <Image src={stubImage}
                        alt="no house data"
                        width={400}
                        height={400}
                        className={`mx-auto`} />
            }
            <FileUpload setItems={setItems} disabled={items.length >= 5} />
        </div>
    );
});

export default SimpleGallery;

//хелпер для определения количества колонок
export function getGridClasses(total: number, i: number) {
    if (total < 3) {
        switch (i) {
            case 0: return 'col-span-6 row-span-2';
            case 1: return 'col-span-6 row-span-2';
        }
    } else if (total === 3) {
        switch (i) {
            case 0: return 'col-span-7 row-span-2';
            case 1: return 'col-span-5';
            case 2: return 'col-span-5';
        }
    } else if (total === 4) {
        switch (i) {
            case 0: return 'col-span-7 row-span-2';
            case 1: return 'col-span-5';
            case 2: return 'col-span-2';
            case 3: return 'col-span-3';
        }
    } else {
        switch (i) {
            case 0: return 'col-span-7 row-span-2';
            case 1: return 'col-span-2';
            case 2: return 'col-span-3';
            case 3: return 'col-span-3';
            case 4: return 'col-span-2';
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
