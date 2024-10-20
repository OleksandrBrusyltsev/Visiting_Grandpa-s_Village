import React, { useState } from "react";
import { Box, Chip, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Иконка для кнопки

const GuestsComponent = () => {
  const [guests, setGuests] = useState<string[]>(["Олександр", "Олександр"]);

  // Функция для удаления гостя
  const handleDeleteGuest = (guestToDelete: string) => {
    setGuests(guests.filter((guest) => guest !== guestToDelete));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2, // Расстояние между полями
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
          padding: "8px",
          border: "1px solid #3F5540", // Зеленый бордер
          borderRadius: "4px",
          backgroundColor: "#F5F5F5", // Цвет фона
        }}
      >
        {guests.map((guest, index) => (
          <Chip
            key={index}
            label={guest}
            onDelete={() => handleDeleteGuest(guest)}
            sx={{
              backgroundColor: "#EAE7E2", // Цвет фона Чипа
              color: "#3F5540", // Цвет текста
              "& .MuiChip-deleteIcon": {
                color: "#3F5540", // Цвет иконки удаления
              },
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#EAE7E2",
          color: "#3F5540",
          minWidth: "100px",
          padding: "8px 16px",
          fontWeight: "bold",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#d1cec6", // Темнее при ховере
          },
        }}
      >
        Додати
      </Button>
    </Box>
  );
};

export default GuestsComponent;
