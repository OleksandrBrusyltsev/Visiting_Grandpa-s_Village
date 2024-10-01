import React from 'react';
import Header from '@/components/Admin/Header/Header'
import MainMenu from '@/components/Admin/MainMenu/MainMenu';

import { menuAdmin } from '@/data/admin/menu';
import { verifySession } from '@/functions/dal';

type Props = { children: React.ReactNode; }

export default async function DashboardLayout({ children }: Props) {
  
  const session = await verifySession();
  const menu = session?.role === 'superadmin' ? menuAdmin : menuAdmin.filter((item) => session?.role === item.admission);

  return (
    <>
      <Header />
      <div className="container 2xl mx-auto flex">
        <MainMenu menu={menu} />
        <main className="mx-auto grow p-3" style={{ minHeight: 'calc(100dvh - 96px)' }}>
          {children}
        </main>
      </div>
    </>
  )
}