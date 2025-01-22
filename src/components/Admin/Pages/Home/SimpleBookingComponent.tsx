import Icon from '@/components/ui/Icon/Icon';
import React from 'react'
import dayjs from 'dayjs';

import { useTranslations } from '@/hooks/useTranslations';
import Button from '@/components/ui/Button/Button';

import s from '@/components/BookingComponent/BookingComponent.module.scss';

export default function SimpleBookingComponent() {
    const t = useTranslations("BookingForm");
    return (
        <div className={s.bookingComponentContainer}>
            <div className={s.bookingForm} >
                <div className={s.dateWrapper}>
                    <label htmlFor="start_date" className={s.dateLabel}>
                        {t('arrival')}
                    </label>
                    <span
                        id="start_date"
                        className={s.dateInput}
                        tabIndex={-1}
                    >{dayjs().format('DD.MM.YYYY')}</span>
                    <button
                        type="button"
                        className={s.dateOpenButton}
                        aria-label="toggle calendar"
                    >
                        <Icon
                            name="icon-down"
                            className={s.downIcon}
                        />
                    </button>
                </div>

                <div className={s.dateWrapper} >
                    <label htmlFor="end_date" className={s.dateLabel}>
                        {t('departure')}
                    </label>
                    <span
                        id="end_date"
                        className={s.dateInput}
                        tabIndex={-1}
                    >{dayjs().format('DD.MM.YYYY')}</span>
                    <button
                        type="button"
                        className={s.dateOpenButton}
                        aria-label="toggle calendar"
                    >
                        <Icon
                            name="icon-down"
                            className={s.downIcon}
                        />
                    </button>
                </div>

                <fieldset
                    className={s.guestWrapper}
                    name="guests"
                >
                    <p className={s.guestLegend}>
                        <legend>{t("guests")}</legend>
                    </p>
                    <label htmlFor="adult_guests" className={s.guestsLabel}>
                        {t('adults')}:
                        <span
                            className={s.guestsInput}
                            id="adult_guests"
                            tabIndex={-1}
                        >0</span>
                        ,
                    </label>
                    <label htmlFor="children_guests" className={s.guestsLabel}>
                        {t('children')}:
                        <span
                            className={s.guestsInput}
                            id="children_guests"
                            tabIndex={-1}
                        >0</span>
                    </label>
                    <button
                        type="button"
                        className={s.guestOpenButton}
                    >
                        <Icon
                            name="icon-down"
                            className={s.downIcon}
                        />
                    </button>
                </fieldset>

                <div className={s.buttonSearch}>
                    <Button
                        label={t('search', { search: false })}
                        type="button"
                    />
                </div>
            </div>
        </div>
    )
}