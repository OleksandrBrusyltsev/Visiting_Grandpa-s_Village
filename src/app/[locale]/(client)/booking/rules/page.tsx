import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Rules from '@/components/Rules/Rules';

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
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
      }}><Rules/></h1>
    </div>
  )
}