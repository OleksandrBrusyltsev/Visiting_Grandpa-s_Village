import React from 'react'

import { getHouses } from '@/actions/getHouses'
import HousesPage from '@/components/Admin/Pages/Houses/Houses';

export default async function Page() {
  const houses = await getHouses();
  const heroData = houses.filter(item => !item.name)[0];
  
  return (
    <div className='p-8'>
      <h1 className='text-5xl text-center mb-10'>Редагування сторінки ЖИТИ</h1>
      <HousesPage data={heroData} />
    </div>
  )
}