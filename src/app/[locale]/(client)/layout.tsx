import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'

import { ReactNode } from 'react'

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      {children}
      <Footer />
    </>
  )
}
