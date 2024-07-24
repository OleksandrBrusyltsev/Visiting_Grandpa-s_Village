type HouseItem = {
  id: number;
  name: string;
  title: {
    language: string;
    text: string;
  }[];
  rental_price: number;
  price_addons:
    | boolean
    | {
        adult: number;
        child: number;
      };
  max_adults: number;
  max_children: number;
  rooms: HouseItem[] | [];
  photo: string[];
  photoDecor: string;
  treesDecor: string;
  swiper: string[];
  text: string;
  coordinates: {
    top: number;
    left: number;
    topSmall: number;
    leftSmall: number;
    topSmallDifference: number;
    leftSmallDifference: number;
    topMedium: number;
    leftMedium: number;
    topMediumDifference: number;
    leftMediumDifference: number;
    topLarge: number;
    leftLarge: number;
  };
};
