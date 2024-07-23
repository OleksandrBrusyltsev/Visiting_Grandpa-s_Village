import Image from 'next/image'
import Button from '../ui/Button/Button'
import WelcomeBlockType from '../../types/welcomeBlock'
import style from './WelcomeBlock.module.scss'
import Link from 'next/link'
import { useLocale } from 'next-intl'

const image = '/images/home/welcomeBlock-70.jpg'
const alt = 'Landscape picture'

const WelcomeBlock: React.FC<WelcomeBlockType> = ({ text }) => {
  const locale = useLocale()
  return (
    <div className={style.blockWrapper}>
      <div className={style.textWrapper}>
        <p>{text}</p>
      </div>
      <div className={style.imageWrapper}>
        <Image
          src={image}
          alt={alt}
          fill={true}
          priority
          className={style.image}
        />
      </div>
      <div className={style.buttonWrapper}>
        <Link href={`/${locale}/booking`}>
          <Button size="large" label="Завітати" className={style.button} />
        </Link>
      </div>
    </div>
  )
}

export default WelcomeBlock
