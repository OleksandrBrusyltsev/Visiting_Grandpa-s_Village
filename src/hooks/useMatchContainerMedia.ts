import { useLayoutEffect, useState } from 'react';

export const initialValues: MatchedMediaResult = {
    isMobile: true,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
};

type UseMatchContainerMediaProps = Readonly<React.RefObject<HTMLElement>>;

export const useMatchContainerMedia = (container: UseMatchContainerMediaProps) => {
    const [values, setValues] = useState<MatchedMediaResult>(initialValues);

    useLayoutEffect(() => {
        if (!container?.current) return;
        const updateValues = () => {
            const width = container.current!.offsetWidth;

            const valuesObject = {
                isMobile: width <= 767,
                isTablet: width >= 768 && width <= 1279,
                isLaptop: width >= 1280 && width <= 1439,
                isDesktop: width >= 1440,
            };

            setValues(valuesObject);
        };

        updateValues();

        const resizeObserver = new ResizeObserver(updateValues);
        resizeObserver.observe(container.current);
        return () => resizeObserver.disconnect();
    }, [container]);

    return values;
};
