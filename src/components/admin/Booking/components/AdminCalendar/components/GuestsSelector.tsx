import { FC } from "react";
import { Box, Typography, IconButton, Select, MenuItem } from "@mui/material";
import {
  Add,
  Remove,
  PersonOutline,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";

interface GuestsSelectorProps {
  adults: number;
  children: number;
  childAges: number[];
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;

  handleIncrease: (
    setter: React.Dispatch<React.SetStateAction<number>>,
    index?: number
  ) => void;
  handleDecrease: (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    index?: number
  ) => void;
  setChildAge: (index: number, age: number) => void;
}

const GuestsSelector: FC<GuestsSelectorProps> = ({
  adults,
  setAdults,
  setChildren,
  children,
  childAges,
  handleIncrease,
  handleDecrease,
  setChildAge,
}) => {
  return (
    <Box padding={3}>
      {/* Контейнер для выбора количества взрослых и детей */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* Взрослые */}
        <Box>
          <Typography mb="12px"sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Дорослі
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid  #3F5540",
              borderRadius: "8px",
              padding: "5px 10px",
              width: "144px",
            }}
          >
            <PersonOutline fontSize="large" sx={{ color: "#3F5540" }} />

            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {adults}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={() => handleIncrease(setAdults, adults)}
                size="small"
              >
                <KeyboardArrowUp fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={() => handleDecrease(setAdults, adults)}
                size="small"
              >
                <KeyboardArrowDown fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Дети */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonOutline sx={{ mr: 1 }} />
          <Typography sx={{ fontWeight: "bold", mr: 2 }}>Діти</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #D1D1D1",
              borderRadius: "8px",
              padding: "0 10px",
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleDecrease(setChildren, children)}
            >
              <Remove />
            </IconButton>
            <Typography>{children}</Typography>
            <IconButton
              size="small"
              onClick={() => handleIncrease(setChildren, 5)}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Контейнер для выбора возраста детей */}
      {children > 0 && (
        <Box>
          {[...Array(children)].map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <PersonOutline sx={{ mr: 1 }} />{" "}
              {/* Иконка ребенка для возраста */}
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>Вік</Typography>
              <Select
                value={childAges[index] || 0}
                onChange={(e) => setChildAge(index, e.target.value as number)}
                sx={{
                  minWidth: "80px",
                  border: "1px solid #D1D1D1",
                  borderRadius: "8px",
                }}
              >
                {Array.from({ length: 18 }).map((_, num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GuestsSelector;
