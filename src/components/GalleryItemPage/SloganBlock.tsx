import React from 'react'
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import Icon from '../ui/Icon/Icon';
import Button from '../ui/Button/Button';

import s from './SloganBlock.module.scss';

export default function SloganBlock() {
    const locale = useLocale();
    const tGlobal = useTranslations('UI');
    const t = useTranslations('Gallery');

    return (
        <div className={`${s.callToAction} container`}>
            <div className={s.cloud}>
                <Icon name="cloud" />
            </div>
            <p className={s.slogan}>
                {t('slogan')}
            </p>
            <Link href={`/${locale}/booking`}>
                <Button
                    label={tGlobal('visit')}
                    type={"button"}
                    className={s.btnCallToAction}
                />
            </Link>
        </div>
    )
}