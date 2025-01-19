import React from 'react';
import EntertainmentPage from '@/components/Admin/Pages/Entertainment/Entertainment';
import { getEntertainments } from '@/actions/getEntertainments';

export default async function Page() {
    const entertainments = await getEntertainments();
    return (
        <div className='p-8'>
            <h1 className='text-5xl text-center mb-10'>Редагування сторінки БАЙДИКУВАТИ</h1>
            {
                entertainments.length
                    ? <EntertainmentPage data={entertainments} />
                    : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
                        Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
                    </h2>
            }
        </div>
    )
}