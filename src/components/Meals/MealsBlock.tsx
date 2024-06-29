import Image from 'next/image';
import { useContext } from 'react';

import Icon from '../ui/Icon/Icon';
import { MatchMediaContext } from '@/context/MatchMediaContext';

import s from './MealsBlock.module.scss';

type Props = {
  item: MealsItem;
  position: number;
}

export default function MealsBlock({item, position}: Props) {
  const {title, description, photo} = item;
  const {isMobile} = useContext(MatchMediaContext);
  
  return (
    <div className={s.mealsBlockWrapper}>
      <div className={s.mealsTitle}>{title}</div>
      <div className={s.mealsDescriptionWrapper} >
        {
          position !== 0 && isMobile ? 
            <div className={s.mainPhoto}>
              <Image
                src={photo[0]}
                alt={`${photo[0]} image`}
                fill
              /> 
            </div> : 
            null
        }
        <p className={s.mealsDescription} dangerouslySetInnerHTML={{ __html: description}}/>
      </div>
        {
          position === 0 || !isMobile ? 
            <div className={s.mainPhoto}>
              <Image
                src={photo[0]}
                alt={`${photo[0]} image`}
                fill
              /> 
            </div> : 
            null
        }
        <div className={s.topPhoto}>
          <Image
            src={photo[1]}
            alt={`${photo[1]} image`}
            fill
          />
        </div>
        <div className={s.bottomPhoto}>
          <Image
            src={photo[2]}
            alt={`${photo[2]} image`}
            fill
          />
        </div>
        {
          position !== 2 ? 
            <Icon 
              name={position === 0 ? 
                      "curve-meals-middle" : 
                      "curve-meals-768"} 
              className={s.mealsCurve}/> : 
            null
        }
    </div>
  )
}