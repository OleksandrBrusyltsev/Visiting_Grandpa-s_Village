import { useTranslations } from 'next-intl';
import React from 'react'


export default function Page() {
  const t = useTranslations('Breadcrumbs');
  return (
    <div className='container'>
      <h1 style={{
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
      }}>Сторінка {t('leisure')}</h1>
    </div>
  )
}