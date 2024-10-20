import React, { useState } from "react";
import { Box, Chip, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const GuestsComponent = () => {
  const [guests, setGuests] = useState<string[]>(["Олександр", "Олександр"]);

  const handleDeleteGuest = (index: number) => {
    setGuests((prevGuests) => prevGuests.filter((_, i) => i !== index));
  };

  return (
    <Box
      p={1}
      sx={{
        borderRadius: "4px",
        minWidth: "400px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography mb={1} sx={{ fontWeight: "bold" }}>
        Гості
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            width: "100%",
            minHeight: "135px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #3F5540",
          }}
        >
          {guests.map((guest, index) => (
            <Chip
              key={index}
              label={guest}
              onDelete={() => handleDeleteGuest(index)}
              sx={{
                backgroundColor: "#C2BFB7B2",
                borderRadius: "8px",
                color: "#3F5540",
                "& .MuiChip-deleteIcon": {
                  color: "#3F5540",
                },
              }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          startIcon={
            <Box sx={{ fontSize: "36px" }}>
              <AddIcon sx={{ color: "#2E4236", fontSize: "36px" }} />
            </Box>
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#C2BFB7B2",
            color: "#000000",
            minWidth: "100px",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "8px",
            "& .MuiButton-startIcon": {
              marginRight: 0,
              marginLeft: 0,
            },
          }}
        >
          Додати
        </Button>
      </Box>
    </Box>
  );
};

export default GuestsComponent;
