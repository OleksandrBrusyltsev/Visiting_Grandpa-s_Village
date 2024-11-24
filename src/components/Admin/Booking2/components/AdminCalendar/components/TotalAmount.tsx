import { Box, Typography } from "@mui/material";

const TotalAmount = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        gap: 1,
        paddingLeft: "10px",
        paddingRight: "10px",
        justifyContent: "flex-end",
      }}
    >
      <Typography sx={{ fontWeight: "bold", color: "#616161" }}>
        Всього
      </Typography>
      <Box
        sx={{
          padding: "4px 8px",
          border: "1px solid #616161",
          borderRadius: "4px",
          backgroundColor: "#ffffff",
          fontWeight: "bold",
        }}
      >
        1200,00 UAH
      </Box>
    </Box>
  );
};

export default TotalAmount;
