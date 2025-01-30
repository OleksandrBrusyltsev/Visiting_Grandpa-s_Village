import React from 'react';
import MainPage from '@/components/Admin/Pages/Home/Home';
import { getHome } from '@/actions/getHome';

export default async function Page() {
    const data = await getHome();
    return (
        <div className='p-8'>
            <h1 className='text-5xl text-center mb-10'>Редагування Головної сторінки </h1>
            {
                data.length
                    ? <MainPage data={data} />
                    : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
                        Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
                    </h2>
            }
        </div>
    )
}