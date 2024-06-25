import { unstable_setRequestLocale } from 'next-intl/server';

import Entertainment from '@/components/Entertainment/Entertainment';

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className='container'>
      <Entertainment />
    </div>
  )
}