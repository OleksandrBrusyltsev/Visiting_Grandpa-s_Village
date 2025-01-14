import React, { CSSProperties, forwardRef, useEffect, useRef } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { Transform } from '@dnd-kit/utilities';
import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';

interface SortableItemProps {
    classNames?: string;
    id: UniqueIdentifier;
    index: number;
    children: React.ReactNode;
    onRemove(id: UniqueIdentifier): void;
    onChange(id: UniqueIdentifier): (event: React.ChangeEvent<HTMLInputElement>) => void;
    animateLayoutChanges?: AnimateLayoutChanges;
    dragOverlay?: boolean;
}

export default function SortableItem({
    classNames,
    id,
    children,
    index,
    onRemove,
    onChange,
    animateLayoutChanges,
    dragOverlay
}: SortableItemProps) {
    const data = useSortable({
        id,
        animateLayoutChanges,
        transition: {
            duration: 150,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)"
        }
    });
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = data;

    return (
        <Item
            classNames={classNames}
            ref={setNodeRef}
            dragging={isDragging}
            index={index}
            onChange={onChange(id)}
            onRemove={() => onRemove(id)}
            transform={transform}
            transition={transition}
            listeners={listeners}
            data-index={index}
            data-id={id}
            dragOverlay={dragOverlay}
            {...attributes}
        >{children}</Item>
    );
}

export interface ItemProps {
    classNames?: string;
    dragOverlay?: boolean;
    dragging?: boolean;
    handleProps?: any;
    index?: number;
    fadeIn?: boolean;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    style?: React.CSSProperties;
    transition?: string | null;
    children: React.ReactNode;
    onRemove?(): void;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Item = React.memo(
    React.forwardRef<HTMLLIElement, ItemProps>(
        (
            {
                classNames,
                dragOverlay,
                dragging,
                fadeIn,
                index,
                listeners,
                onRemove,
                onChange,
                style,
                transition,
                transform,
                children,
                ...props
            },
            ref
        ) => {
            const inputRef = useRef<HTMLInputElement>(null);

            useEffect(() => {
                if (!dragOverlay) {
                    return;
                }

                document.body.style.cursor = 'grabbing';

                return () => {
                    document.body.style.cursor = '';
                };
            }, [dragOverlay]);

            return (
                <li
                    className={`touch-none flex box-border list-none origin-top-left [transform:translate3d(var(--translate-x,0),_var(--translate-y,0),0)_scaleX(var(--scale-x,1))_scaleY(var(--scale-y,1))] ${fadeIn && 'animate-fadeIn'} ${dragOverlay && 'w-full h-full z-[999]'} group ${classNames}`}
                    style={
                        {
                            '--translate-x': transform
                                ? `${Math.round(transform.x)}px`
                                : undefined,
                            '--translate-y': transform
                                ? `${Math.round(transform.y)}px`
                                : undefined,
                            '--scale-x': transform?.scaleX
                                ? `${transform.scaleX}`
                                : undefined,
                            '--scale-y': transform?.scaleY
                                ? `${transform.scaleY}`
                                : undefined,
                            '--scale': '1.05'
                        } as React.CSSProperties
                    }
                    ref={ref}
                >
                    <div
                        className={`relative flex flex-grow items-center rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[rgba(76,159,254,1)]
                        ${dragging && !dragOverlay ? 'opacity-[var(--dragging-opacity,0.5)] z-0 focus:shadow-[0_0_0_calc(1px_/_var(--scale-x,_1))_rgba(63,_63,_68,_0.05),_0_1px_calc(3px_/_var(--scale-x,_1))_rgba(34,_33,_81,_0.15)]' : ''} 
                        ${dragOverlay ? 'h-full w-full cursor-inherit animation-pop scale-[var(--scale)] opacity-100' : ''}`}
                        style={style}
                        {...listeners}
                        {...props}
                        tabIndex={0}
                        role='listitem'
                    >
                        {children}
                    </div>
                    <span
                        className={`${dragOverlay ? 'opacity-0' : 'opacity-100'} absolute gap-3 flex self-start top-3 right-3 justify-end items-center invisible group-hover:visible`}
                    >
                        <input type='file' className='hidden' ref={inputRef} onChange={onChange} />

                        <Edit
                            onClick={() => inputRef.current?.click()} />

                        <Remove
                            onClick={onRemove} />
                    </span>

                </li>
            );
        }
    )
);

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> { }

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
    function Action({ className, style, ...props }, ref) {
        return (
            <button
                ref={ref}
                {...props}
                className={`flex w-8 h-8 @[1200px]:w-[45px] @[1200px]:h-[45px] items-center justify-center flex-[0_0_auto] rounded-full border-none outline-none appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[rgba(76,159,254,1)] group 
                    fill-[var(--fill-default)] hover:fill-[var(--fill-hover)] active:fill-[var(--fill-active)]
                    bg-[var(--bg-default)] hover:bg-[var(--bg-hover)] active:bg-[var(--bg-active)]
                    ${className || ''}`}
                tabIndex={0}
                type='button'
                style={{ ...style, } as CSSProperties} />
        );
    }
);



export function Remove(props: ActionProps) {
    return (
        <Action
            {...props}
            style={{ '--fill-default': '#0c0c0c', '--fill-hover': '#FAFAFA', '--fill-active': '#0c0c0c', '--bg-default': '#FAFAFA', '--bg-hover': '#a80e0e', '--bg-active': '#a80e0e' } as React.CSSProperties}
        >
            <svg className='w-[13px] h-[14px] @[1200px]:w-[19px] @[1200px]:h-[17px]' viewBox="0 0 19 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.71587 0.559273L9.50004 7.41025L16.2838 0.559278C16.3213 0.521343 16.3725 0.5 16.4259 0.5H17.9636C18.0741 0.5 18.1636 0.589543 18.1636 0.7C18.1636 0.752702 18.1428 0.803275 18.1057 0.840724L10.5503 8.47091L18.1627 16.1593C18.2404 16.2378 18.2398 16.3644 18.1613 16.4421C18.1239 16.4792 18.0733 16.5 18.0206 16.5H16.4833C16.4299 16.5 16.3788 16.4787 16.3412 16.4407L9.50004 9.53157L2.65844 16.4407C2.62088 16.4787 2.56971 16.5 2.51633 16.5H0.979541C0.869084 16.5 0.779541 16.4105 0.779541 16.3C0.779541 16.2473 0.800341 16.1967 0.837419 16.1593L8.44979 8.47091L0.894389 0.840723C0.81667 0.762235 0.817293 0.635603 0.895782 0.557884C0.933231 0.520802 0.983803 0.5 1.0365 0.5H2.57376C2.62714 0.5 2.67831 0.521342 2.71587 0.559273Z" />
            </svg>
        </Action>
    );
}
export function Edit(props: ActionProps) {
    return (
        <Action
            {...props}
            style={{ '--fill-default': '#FAFAFA', '--fill-hover': '#FAFAFA', '--fill-active': '#0c0c0c', '--bg-default': '#3f5540', '--bg-hover': '#b4854f', '--bg-active': '#b4854f' } as React.CSSProperties}
        >
            <svg className='w-[14px] h-[14px] @[1200px]:w-[19px] @[1200px]:h-[19px]' viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3279 1.42238C18.558 2.65266 18.5575 4.64726 17.3274 5.87753L4.85879 18.3467C4.76027 18.445 4.62675 18.5 4.48759 18.5H1.30008C0.720138 18.5 0.250001 18.0298 0.250001 17.4499V14.2628C0.249752 14.1234 0.304904 13.9897 0.40331 13.891L12.8735 1.42239C14.1036 0.192538 16.0977 0.192538 17.3279 1.42238ZM18.5382 17C18.6794 17 18.75 17.0667 18.75 17.2V18.3C18.75 18.4333 18.6794 18.5 18.5382 18.5H9.96176C9.82059 18.5 9.75 18.4333 9.75 18.3V17.2C9.75 17.0667 9.82059 17 9.96176 17H18.5382ZM11.836 4.6855L1.88654 14.6361C1.84717 14.6755 1.82512 14.729 1.82512 14.7847V16.7159C1.82512 16.8319 1.9191 16.9259 2.03513 16.9259H3.96517C4.02096 16.9259 4.07442 16.9035 4.11375 16.8639L14.064 6.9135L11.836 4.6855ZM18.5278 13.5C18.6759 13.5 18.75 13.5667 18.75 13.7V14.8C18.75 14.9333 18.6759 15 18.5278 15H13.9722C13.8241 15 13.75 14.9333 13.75 14.8V13.7C13.75 13.5667 13.8241 13.5 13.9722 13.5H18.5278ZM14.0538 2.47252L13.9861 2.53552L12.9355 3.586L15.1635 5.814L16.2138 4.76442C16.8037 4.17465 16.8316 3.2272 16.2773 2.60379L16.2143 2.53658L16.2143 2.53552C15.6244 1.94572 14.677 1.9181 14.0538 2.47252Z" />
            </svg>
        </Action>
    );
}