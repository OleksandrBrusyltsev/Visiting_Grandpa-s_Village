"use client";
import { FC } from "react";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Dayjs } from "dayjs";
import BookingTabs from "./BookingTabs";

interface AddNewBookModalProps {
  open: boolean;
  handleClose: () => void;
  currentEvent: {
    start: Dayjs;
    end: Dayjs;
    houseName: string;
    houseId: string;
  } | null;
}

const AddNewBookModal: FC<AddNewBookModalProps> = ({
  open,
  handleClose,
  currentEvent,
}) => {
  if (!currentEvent) return null; // Если нет текущего события, не рендерим модалку

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Бронювання №123 (2 доби)</DialogTitle>
      <DialogContent>
        <BookingTabs currentEvent={currentEvent} />
      </DialogContent>

      <DialogActions sx={{
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          sx={{
            color: "#3F5540",
            borderColor: "#3F5540",
            fontWeight: "bold",
            minWidth: "213px",
            "&:hover": {
              backgroundColor: "#E0E0E0",
              borderColor: "#3F5540",
            },
          }}
        >
          Відмінити
        </Button>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#2E4236",
            color: "#ffffff",
            fontWeight: "bold",
            minWidth: "213px",
            "&:hover": {
              backgroundColor: "#1E2E23",
            },
          }}
        >
          Обрати
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewBookModal;
