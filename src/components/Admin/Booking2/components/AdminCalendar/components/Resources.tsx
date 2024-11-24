import { houses } from "../../../../../../data/houses/index";

const allResources = houses.slice(1).map((house) => {
  return {
    id: house.name,
    title: house.title.uk || house.name,
  };
});

export default allResources;
