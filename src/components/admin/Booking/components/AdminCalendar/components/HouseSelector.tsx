import { FC, useState } from "react";
import { IconButton, Menu, MenuItem, Chip } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import allResources from "./Resources";

interface HouseSelectorProps {
  currentHouse: House;
}

interface House {
  id: string;
  title: string;
}

const HouseSelector: FC<HouseSelectorProps> = ({ currentHouse }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedHouses, setSelectedHouses] = useState<House[]>([currentHouse]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add a house to the selection
  const handleAddHouse = (house: { id: string; title: string }) => {
    setSelectedHouses([...selectedHouses, house]);
    handleClose();
  };

  // Remove a house from the selection
  const handleDeleteHouse = (houseId: string) => {
    setSelectedHouses(selectedHouses.filter((house) => house.id !== houseId));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {selectedHouses.map((house) => (
        <Chip
          key={house.id}
          label={house.title}
          onDelete={() => handleDeleteHouse(house.id)}
          deleteIcon={<CloseIcon style={{ color: "#CB997E" }} />}
          style={{
            backgroundColor: "#2E4236",
            color: "#FFFFFF",
            fontWeight: "bold",
            padding: "8px",
            fontSize: "14px",
          }}
        />
      ))}

      <IconButton onClick={handleClick} style={{ marginLeft: "8px" }}>
        <ExpandMoreIcon style={{ color: "#2E4236" }} />
      </IconButton>

      {/* Menu to select more houses */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {allResources.map((house) => (
          <MenuItem
            key={house.id}
            onClick={() => handleAddHouse(house)}
            disabled={selectedHouses.some(
              (selected) => selected.id === house.id
            )}
          >
            {house.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HouseSelector;
