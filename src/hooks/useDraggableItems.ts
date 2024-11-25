import React, { useEffect, useRef } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
    houseData: {
        photo: (string | File)[];
    };
};

//хук для генерации и хранения инфы для drag&drop изображений в SimpleGallery
function useDraggableItems({ houseData }: Props) {
    //храним одновременно и изображения, и локальную ссылку на него, т.к. динамическая генерация ссылок при рендере вызывает мерзание UI
    const [items, setItems] = React.useState<
        {
            id: UniqueIdentifier;
            raw: string | File;
            src: string;
        }[]
    >([]);
    const shouldUpdateHouseData = useRef<boolean>(true);

    //эффект только для обновления items после reset-а данных формы по изменению домика
    useEffect(() => {
        setItems(
            houseData.photo.map((image, i) => ({
                id: `${i}` as UniqueIdentifier,
                raw: image,
                src: typeof image === 'string' ? image : URL.createObjectURL(image),
            })),
        );
        shouldUpdateHouseData.current = false;
    }, [houseData]);

    return [items, setItems, shouldUpdateHouseData] as const;
}

export default useDraggableItems;
