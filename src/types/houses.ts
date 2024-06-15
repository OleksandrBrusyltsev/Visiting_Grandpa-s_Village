type HouseItem = {
    id: number,
    name: string,
    title: {
      language: string,
      text: string,
    }[],
    rental_price: number,
    max_adults: number,
    max_children: number,
    photo: string[],
  }