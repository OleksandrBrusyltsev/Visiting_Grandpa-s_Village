import React from 'react'
import { getHouses } from '@/actions/getHouses';
import EditHouse from '@/components/Admin/Houses/EditHouse/EditHouse';

import { housesData } from '@/data/houses/housesData';
import { notFound } from 'next/navigation';

type Props = Readonly<{ params: { houseId: string } }>

export default async function Page({ params }: Props) {
  const housesFromApi = await getHouses();

  //добавляем отсутствующие в апишке данные (2 картинки-декоры и координаты домика на карте)
  const houses = housesFromApi.map((house) => {
    const rest = house.name in housesData ? { ...housesData[house.name as keyof typeof housesData] } : { ...housesData['default' as keyof typeof housesData] };
    return {
      ...house,
      ...rest
    }
  })

  const house = houses.filter((item) => item.id === +params.houseId);

  if (!house.length) notFound();

  //инфа о количестве комнат в домике нужна только лишь для малюсенькой лейбы на карточке домика, содержащего комнаты
  const rooms = houses.filter(item => item.name).reduce((accu, cur) => {
    if (!cur.house_type) return accu;
    if (!accu[cur.house_type]) {
      accu[cur.house_type] = 1;
    } else {
      accu[cur.house_type] += 1;
    }
    return accu
  }, {} as { [key: string]: number });

  //формируем словарик для поля селекта с выбором типа домика + исключаем текущий домик для избежания зацикливания
  const housesList = houses.filter(item => item.name && !item.house_type && item.id !== house[0].id)
    .map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title.uk
    }));

  return (
    <div className='p-8'>
      <h1 className='text-5xl text-center mb-10'>Редагування <span className='uppercase font-bold'>{house[0].long_title.uk}</span></h1>
      <EditHouse data={house[0]} rooms={rooms[house[0].name] || 0} housesList={housesList} />
    </div>
  )
}