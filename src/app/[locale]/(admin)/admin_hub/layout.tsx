import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import "./admin.scss";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      {children}
    </AppRouterCacheProvider>
  );
}
