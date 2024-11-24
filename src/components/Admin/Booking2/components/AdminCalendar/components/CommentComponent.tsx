import { Box, TextField, Typography } from "@mui/material";

const CommentComponent = () => {
  return (
    <Box
      sx={{
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "12px",
      }}
    >
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>Коментар</Typography>
      <TextField
        multiline
        rows={5}
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid #616161",
          borderRadius: "6px",
        }}
      />
    </Box>
  );
};

export default CommentComponent;
