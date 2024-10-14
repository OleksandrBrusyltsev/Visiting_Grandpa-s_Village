import { FC, useState, useEffect } from "react";
import { Box, IconButton, TextField, Typography, Dialog } from "@mui/material";
import { PersonOutline, ExpandMore } from "@mui/icons-material";

import { Add, Remove } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import GuestsSelector from "./GuestsSelector";

interface BookInfoProps {
  currentEvent: Date;
}

interface Date {
  start: Dayjs;
  end: Dayjs;
}
const BookInfo: FC<BookInfoProps> = ({ currentEvent }) => {
  const [startDate, setStartDate] = useState(dayjs(currentEvent.start));
  const [endDate, setEndDate] = useState(dayjs(currentEvent.end));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [childrenAges, setChildrenAges] = useState<number[]>([0]);
  
  const [days, setDays] = useState(0);
   const [isGuestsModalOpen, setGuestsModalOpen] = useState(false);

   const handleOpenGuestsModal = () => setGuestsModalOpen(true);
   const handleCloseGuestsModal = () => setGuestsModalOpen(false);

  useEffect(() => {
    const diffInDays = endDate.diff(startDate, "day");
    setDays(diffInDays);
  }, [startDate, endDate]);

  const handleIncrease = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    index?: number
  ) => {
    setter((prev) => prev + 1);
    if (index !== undefined) {
      setChildrenAges((ages) => {
        const newAges = [...ages];
        newAges[index] += 1;
        return newAges;
      });
    }
  };

  const handleDecrease = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    index?: number
  ) => {
    if (currentValue > 0) {
      setter((prev) => prev - 1);
    }
  };

  const setChildAge = (index: number, age: number) => {
    setChildrenAges((ages) => {
      const newAges = [...ages];
      newAges[index] = age;
      return newAges;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        backgroundColor: "#C2BFB7B2",
        padding: "16px",
      }}
    >
      <TextField
        type="date"
        value={startDate.format("YYYY-MM-DD")}
        onChange={(e) => setStartDate(dayjs(e.target.value))}
        sx={{ width: "180px" }}
      />
      <TextField
        type="date"
        value={endDate.format("YYYY-MM-DD")}
        onChange={(e) => setEndDate(dayjs(e.target.value))}
        sx={{ width: "180px" }}
      />

      <Box>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor:"pointer" }}
          onClick={handleOpenGuestsModal}
        >
          <PersonOutline fontSize="large" sx={{ color: "#3F5540" }} />
          <Typography fontWeight="bold">{adults},</Typography>
          <PersonOutline fontSize="medium" sx={{ color: "#3F5540" }} />
          <Typography fontWeight="bold">{children}</Typography>
        </Box>

        <Dialog  open={isGuestsModalOpen} onClose={handleCloseGuestsModal}>
          <GuestsSelector
            adults={adults}
            children={children}
            setAdults={setAdults}
            setChildren={setChildren}
            childAges={childrenAges}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            setChildAge={setChildAge}
          />
        </Dialog>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          backgroundColor: "#D3D3D3",
          borderRadius: "4px",
        }}
      >
        <Typography> {days} діб</Typography>
      </Box>
    </Box>
  );
};

export default BookInfo;
