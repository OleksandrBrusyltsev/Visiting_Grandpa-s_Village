import React from 'react';

import Header from '@/components/Admin/Header/Header'
import MainMenu from '@/components/Admin/MainMenu/MainMenu';
import { verifySession } from '@/functions/dal';
import { getData } from '@/actions/getData';
import getMainMenu from '@/functions/getMainMenu';
import { getHouses } from '@/actions/getHouses';
import Modal from '@/components/Admin/Dialog/Dialog';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
}
// export const dynamic = 'force-dynamic';
export default async function DashboardLayout({ children, params: { locale } }: Props) {
  
  const session = await verifySession();
  const houses = await getHouses();
  
  const gallery = (await getData<GalleryItem[]>("gallery")).filter(gal => gal.name);
  
  const menuAdmin = getMainMenu(houses, gallery, locale);
  
  const menu = session?.role === 'superadmin' ? menuAdmin : menuAdmin.filter((item) => session?.role === item.admission);
  
  return (

    <>
      <Header />
      <div className="mx-auto flex">
        <MainMenu menu={menu} />
        <main className="mx-auto grow" style={{ minHeight: 'calc(100dvh - 96px)' }}>
          {children}
        </main>
        <Modal />
      </div>
    </>
  )
}