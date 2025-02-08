import React from 'react';
import MealsPage from '@/components/Admin/Pages/Meals/Meals';
import { getMeals } from '@/actions/getMeals';


export default async function Page() {
    const meals = await getMeals();
    return (
        <div className='p-8'>
            <h1 className='text-3xl text-center mb-10'>Редагування сторінки ЇСТИ</h1>
            {
                meals.length
                    ? <MealsPage data={meals} />
                    : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
                        Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
                    </h2>
            }
        </div>
    )
}