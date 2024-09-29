import Header from '@/components/Admin/Header/Header'
import MainMenu, { DrawerHeader } from '@/components/Admin/MainMenu/MainMenu';

import { menuAdmin } from '@/data/admin/menu';

type Props = { children: React.ReactNode; }

export default function DashboardLayout({ children }: Props) {
  
  return (
    <>
      <Header />
      <div className="container 2xl mx-auto flex">
        <MainMenu menu={menuAdmin} />
        <main className="mx-auto grow p-3" style={{ minHeight: 'calc(100dvh - 96px)' }}>
          <DrawerHeader />
          {children}
        </main>
      </div>
    </>
  )
}