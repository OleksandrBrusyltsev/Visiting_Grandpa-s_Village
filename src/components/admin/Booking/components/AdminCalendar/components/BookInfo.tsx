import { FC, useState, useEffect } from "react";
import { Box, TextField, Typography, Dialog } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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

  function getDayLabel(count: number): string {
    if (count === 1) {
      return "доба";
    } else if (count >= 2 && count <= 4) {
      return "доби";
    } else {
      return "діб";
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#C2BFB7B2",
        padding: "16px",
      }}
      mb={2}
    >
      <Box
        sx={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <TextField
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(dayjs(e.target.value))}
          sx={{
            backgroundColor: "#ffffff",
            "& .MuiOutlinedInput-input": {
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#3F5540",
              },
              "&:hover fieldset": {
                borderColor: "rgba(180, 133, 79, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(180, 133, 79, 1)",
              },
            },
          }}
        />
        <TextField
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          onChange={(e) => setEndDate(dayjs(e.target.value))}
          sx={{
            backgroundColor: "#ffffff",
            "& .MuiOutlinedInput-input": {
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#3F5540",
              },
              "&:hover fieldset": {
                borderColor: "rgba(180, 133, 79, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(180, 133, 79, 1)",
              },
            },
          }}
        />

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              padding: "10px",
              border: "1px solid #3F5540",
              borderRadius: "4px",
              transition: "border-color 0.3s ease",
              "&:hover": {
                border: "1px solid rgba(180, 133, 79, 1)",
              },
              "&:focus": {
                border: "1px solid rgba(180, 133, 79, 1)",
                outline: "none",
              },
              "&:active": {
                border: "2px solid rgba(180, 133, 79, 1)",
                outline: "none",
              },
            }}
            onClick={handleOpenGuestsModal}
          >
            <PersonOutline fontSize="large" sx={{ color: "#3F5540" }} />
            <Typography fontWeight="bold" mr={2}>
              {adults},
            </Typography>
            <PersonOutline fontSize="medium" sx={{ color: "#3F5540" }} />
            <Typography fontWeight="bold">{children}</Typography>
          </Box>

          <Dialog open={isGuestsModalOpen} onClose={handleCloseGuestsModal}>
            <GuestsSelector
              adults={adults}
              childrenCount={children}
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
            justifyContent: "center",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            padding: "15px",
            border: "1px solid #3F5540",
          }}
        >
          <AccessTimeIcon fontSize="medium" sx={{ color: "#3F5540" }} />
          <Typography sx={{ fontWeight: "bold" }} ml={2}>
            {days} {getDayLabel(days)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookInfo;
