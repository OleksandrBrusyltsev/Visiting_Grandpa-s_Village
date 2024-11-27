import { useTranslations as useNextIntlTranslations } from 'next-intl';
import customTranslations from '@/functions/customTranslations';

export function useTranslations(namespace: string, locale?: Language, isAdmin?: boolean) {
    const nextIntlTranslations = useNextIntlTranslations(namespace);

    if (!isAdmin) return nextIntlTranslations;

    if (!locale) throw new Error('Locale is required when isAdmin is true');

    return customTranslations(namespace, locale);
}
