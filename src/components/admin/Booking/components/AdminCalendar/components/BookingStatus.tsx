import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const BookingStatus = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Бронь");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" sx={{ width: "380px", flexGrow: "1" }}>
      <RadioGroup
        row
        name="booking-status"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Бронь"
          control={
            <Radio
              sx={{
                color: "#3F5540",
                "&.Mui-checked": {
                  color: "rgba(180, 133, 79, 1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(180, 133, 79, 0.1)",
                },
              }}
            />
          }
          label="Бронь"
          sx={{ ".MuiTypography-root": { fontWeight: "bold" } }}
        />
        <FormControlLabel
          value="Анулювання"
          control={
            <Radio
              sx={{
                color: "#3F5540",
                "&.Mui-checked": {
                  color: "rgba(180, 133, 79, 1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(180, 133, 79, 0.1)",
                },
              }}
            />
          }
          label="Анулювання"
          sx={{ ".MuiTypography-root": { fontWeight: "bold" } }}
        />
        <FormControlLabel
          value="Проживання"
          control={
            <Radio
              sx={{
                color: "#3F5540",
                "&.Mui-checked": {
                  color: "rgba(180, 133, 79, 1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(180, 133, 79, 0.1)",
                },
              }}
            />
          }
          label="Проживання"
          sx={{ ".MuiTypography-root": { fontWeight: "bold" } }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default BookingStatus;
