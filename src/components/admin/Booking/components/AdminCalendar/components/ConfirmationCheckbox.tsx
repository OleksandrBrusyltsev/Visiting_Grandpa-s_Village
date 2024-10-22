import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const ConfirmationCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        gap: "10px",
        
      }}
    >
      <Typography mb={1} sx={{ fontWeight: "bold" }}>
        Відправити підтвердження на Email
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            sx={{
              color: "#3F5540",
              "&.Mui-checked": {
                color: "#3F5540",
              },
            }}
          />
        }
        label
      />
    </Box>
  );
};

export default ConfirmationCheckbox;
