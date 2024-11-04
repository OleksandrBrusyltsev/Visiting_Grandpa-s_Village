"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useMainStore } from '@/stores/store-provider';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const Modal = () => {
  const open = useMainStore((state) => state.dialogIsOpen);
  const type = useMainStore((state) => state.dialogMessage.type);
  const text = useMainStore((state) => state.dialogMessage.text);
  const setDialogOpen = useMainStore((state) => state.setDialogOpen);

  const handleClose = () => {
    setDialogOpen(false, null, '');
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle sx={{ mx: 2, textAlign: 'center' }}
        color={type || undefined}
      >
        Повідомлення від Дідуся
      </DialogTitle>
      <DialogContent sx={{ mx: 2, textAlign: 'center' }}>
        {type === "success" && <DoneOutlinedIcon color="success" sx={{
          fontSize: 100,
          my: 2,
        }} />}
        {type === "error" && <WarningAmberOutlinedIcon color="error" sx={{
          fontSize: 100,
          my: 2,
        }} />}
        <Typography gutterBottom>
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default Modal;