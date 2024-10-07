"use client";
import { FC, useState } from "react";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";
import HouseSelector from "./HouseSelector";
import allResources from "./Resources";

interface AddNewBookModalProps {
  open: boolean;
  handleClose: () => void;
  currentEvent: {
    start: Dayjs;
    end: Dayjs;
    houseName: string;
    houseId: string;// Заголовок домика на укр
  } | null; // Можем передавать null, если события пока нет
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
        <HouseSelector
          currentHouse={{ id: currentEvent.houseId, title: currentEvent.houseName }}
          
        />
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <TextField
            label="Дата заїзду"
            value={currentEvent.start.format("DD.MM.YYYY")}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            label="Дата виїзду"
            value={currentEvent.end.format("DD.MM.YYYY")}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </div>

        {/* Здесь можно добавить другие поля, например, количество гостей */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Відмінити
        </Button>
        <Button onClick={handleClose} color="primary">
          Обрати
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewBookModal;
