type SwiperItem = {
  id: number;
  name: string;
  houses: {
    id: number;
    src: string;
    description: string;
  }[];
  rooms: RoomItem[];
};

type RoomItem = {
  id: number;
  name: string;
  houses: {
    id: number;
    src: string;
    description: string;
  }[];
};
