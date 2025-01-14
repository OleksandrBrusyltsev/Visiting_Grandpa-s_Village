"use client";

import React, { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useMainStore } from "@/stores/store-provider";

interface ConfirmLinkProps extends LinkProps {
    confirmationMessage?: string; // Сообщение для подтверждения
    children: React.ReactNode;
}

const ConfirmLink = forwardRef<HTMLAnchorElement, ConfirmLinkProps>(function ConfirmLink({
    confirmationMessage = "У вас есть несохраненные изменения. Вы уверены, что хотите покинуть эту страницу?",
    children,
    href,
    ...props
}: ConfirmLinkProps, ref) {
    const router = useRouter();
    const isDirtyPage = useMainStore((state) => state.isDirtyPage);
    const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDirtyPage) {
            const confirmed = window.confirm(confirmationMessage);
            if (!confirmed) {
                event.preventDefault(); // Останавливаем переход
            } else {
                setIsDirtyPage(false);
                router.push(href.toString()); // Выполняем переход вручную
            }
        }
    };

    return (
        <Link href={href} {...props} onClick={handleClick} ref={ref}>
            {children}
        </Link>
    );
});

export default ConfirmLink;
