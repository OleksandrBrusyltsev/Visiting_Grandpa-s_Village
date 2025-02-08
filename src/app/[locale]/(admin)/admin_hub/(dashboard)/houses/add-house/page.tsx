import React from 'react';

import { getHouses } from '@/actions/getHouses';
import AddNewHouse from '@/components/Admin/Houses/AddNewHouse/AddNewHouse';

export default async function Page() {
  const houses = await getHouses();
  const housesList = houses.filter(item => item.name && !item.house_type)
    .map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title.uk
    }));

  return (

    <div className="bg-[url('/images/admin/footer_trees.png')] relative bg-cover bg-no-repeat bg-fixed bg-blend-overlay p-8">
      <h1 className='text-3xl text-center mb-10'>Сторінка додавання нового будиночка</h1>
      <AddNewHouse housesList={housesList} />
    </div>
  )
}