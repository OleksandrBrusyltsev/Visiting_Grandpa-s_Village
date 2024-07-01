import { unstable_setRequestLocale } from 'next-intl/server';

import Entertainment from '@/components/Entertainment/Entertainment';
import { getData } from '@/actions/getData';

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const items = await getData<EntertainmentItem[]>('entertainments');
  return (
    <div className='container'>
      <Entertainment items={items}/>
    </div>
  )
}