import { FC } from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import {
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
    <Box padding={3} sx={{ width: "356px", minHeight: "494px" }}>
      {/* Контейнер для выбора количества взрослых и детей */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* Взрослые */}
        <Box sx={{ width: "144px" }}>
          <Typography mb="12px" sx={{ fontSize: "20px", fontWeight: "bold" }}>
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
        <Box sx={{ width: "144px" }}>
          <Typography mb="12px" sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Діти
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid  #3F5540",
              borderRadius: "8px",
              padding: "5px 10px",
            }}
          >
            <PersonOutline fontSize="medium" sx={{ color: "#3F5540" }} />
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {children}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={() => handleIncrease(setChildren, children)}
                size="small"
              >
                <KeyboardArrowUp fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={() => handleDecrease(setChildren, children)}
                size="small"
              >
                <KeyboardArrowDown fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Контейнер для выбора возраста детей */}
      {children > 0 && (
        <Box>
          {[...Array(children)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="body2"
                  mb="12px"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Вік
                </Typography>
                {/* Иконка внутри поля */}
                {/* <InputLabel
                  sx={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "black",
                    marginBottom: "12px",
                  }}
                  id={`child-age-${index}`}
                >
                  Вік
                </InputLabel> */}
                <Select
                  labelId={`child-age-${index}`}
                  value={childAges[index] || 0}
                  onChange={(e) => setChildAge(index, e.target.value as number)}
                  input={
                    <OutlinedInput
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutline sx={{ color: "#3F5540" }} />
                        </InputAdornment>
                      }
                    />
                  }
                  sx={{
                    border: "1px solid  #3F5540",
                    borderRadius: "8px",
                    padding: "5px 10px",
                  }}
                >
                  {Array.from({ length: 18 }).map((_, num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GuestsSelector;
