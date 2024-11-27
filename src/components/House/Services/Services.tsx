import React from 'react'
import Icon from '@/components/ui/Icon/Icon';

import s from './Services.module.scss';

function Services() {
    return (
        <div className={s.servicesWrapper}>
            <div className={s.iconWrapper}>
                <Icon name="house-bath" className={s.servicesIcon} />
            </div>
            <div className={s.iconWrapper}>
                <Icon name="house-tv" className={s.servicesIcon} />
            </div>
            <div className={s.iconWrapper}>
                <Icon name="house-car" className={s.servicesIcon} />
            </div>
            <div className={s.iconWrapper}>
                <Icon name="house-pan" className={s.servicesIcon} />
            </div>
        </div>
    )
}

export default Services