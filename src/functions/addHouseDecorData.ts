import { housesData } from '@/data/houses/housesData';

export const addHouseDecorData = (houses: HouseItem[]) => {
    return houses.map((house) => {
      const rest = house.name in housesData 
      ? { ...housesData[house.name as keyof typeof housesData] } 
      : { ...housesData['default' as keyof typeof housesData] };
      return {
        ...house,
        ...rest
      }
    })
  }