import { houses } from "../../../../../../data/houses/index";

const resources = houses.map((house) => {
  const ukTitle = house.title.find((t) => t.language === "uk");

  const roomTitles = house.rooms.map((room) => {
    const ukRoomTitle = room.title.find((t) => t.language === "uk");
    return {
      id: room.name,
      title: ukRoomTitle?.text || room.name,
    };
  });

  if (house.name === "khoromy") {
    return roomTitles;
  }

  const houseResource = {
    id: house.name,
    title: ukTitle?.text || house.name,
  };

  return [houseResource, ...roomTitles];
});

const allResources = resources.flat();
export default allResources;
