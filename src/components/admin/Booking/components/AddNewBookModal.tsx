"use client";
import { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type BookData = {
  name: string;
  phone: string;
  email: string;
  checkInDate: Dayjs | null;
  checkInTime: Dayjs | null;
  checkOutDate: Dayjs | null;
  checkOutTime: Dayjs | null;
  comment?: string;
};

type NewBookModalProps = {
  open: boolean;
  handleClose: () => void;
  currentEvent: {
    start: Dayjs;
    end: Dayjs;
  };
};

const AddNewBookModal: FC<NewBookModalProps> = ({
  open,
  handleClose,
  currentEvent,
}) => {
  const defaultCheckInTime = dayjs(currentEvent.start).hour(12).minute(0);
  const defaultCheckOutTime = dayjs(currentEvent.end).hour(14).minute(0);

  const [bookData, setBookData] = useState({
    name: "",
    phone: "",
    email: "",
    checkInDate: currentEvent.start || dayjs(),
    checkInTime: defaultCheckInTime,
    checkOutDate: currentEvent.end || dayjs(),
    checkOutTime: defaultCheckOutTime,
    comment: "",
  });

  const handleChange = (field: string, value: string | Dayjs | null) => {
    setBookData({
      ...bookData,
      [field]: value,
    });
  };
  const handleSave = () => {
    console.log("Saving booking:", bookData);
    handleClose();
  };

  return (
    <Dialog
      title={`Book an appointment on ${dayjs(currentEvent.start).format(
        "MMMM Do YYYY"
      )}`}
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <TextField
          margin="dense"
          label="ФИО"
          type="text"
          fullWidth
          value={bookData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Номер телефона"
          type="tel"
          fullWidth
          value={bookData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Почта"
          type="email"
          fullWidth
          value={bookData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Start Time" value={bookData.checkInDate} />
          <TimePicker label="End Time" value={bookData.checkOutDate} />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewBookModal;
