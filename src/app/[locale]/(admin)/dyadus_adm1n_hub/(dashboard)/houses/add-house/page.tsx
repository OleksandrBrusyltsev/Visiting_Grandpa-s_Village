import React from 'react';

import { getData } from '@/actions/getData';
import AddNewHouse from '@/components/Admin/Houses/AddNewHouse/addNewHouse';

type Props = {}

export default async function Page({ }: Props) {
  
  const houses = await getData<HouseItem[]>("houses");
  const housesList = houses.filter(item => item.name && !item.house_type)
    .map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title.uk
    }));

  return (
    <div className="bg-[url('/images/admin/footer_trees.png')] relative bg-cover bg-no-repeat bg-fixed bg-blend-overlay pt-10">
      <AddNewHouse housesList={housesList} />
    </div>
  )
}