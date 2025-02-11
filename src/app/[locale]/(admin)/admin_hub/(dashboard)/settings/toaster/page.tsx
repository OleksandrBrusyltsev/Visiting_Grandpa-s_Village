import React from 'react';
import { getToasters } from '@/actions/getToasters';
import ToasterPage from '@/components/Admin/Pages/Toaster/ToasterPage';

export default async function Page() {
    //для удобства первым возвращаем действующее объявление
    const toasters = (await getToasters()).toSorted((a, b) => Number(b.is_active) - Number(a.is_active));
    
    return (
        <div className='p-8'>
            <h1 className='text-3xl text-center mb-10'>Редагування промо-оголошень</h1>
            {
                toasters.length
                    ? <ToasterPage data={toasters} />
                    : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
                        Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
                    </h2>
            }
        </div>
    )
}