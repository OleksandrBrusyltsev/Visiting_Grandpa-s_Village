"use client";

import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
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

  const string = text?.split('\n') ?? [];

  return (
    <Dialog
      open={open}
      disableScrollLock
    >
      <DialogTitle sx={{ mx: 2, textAlign: 'center' }}
        color={type ?? undefined}
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
        <Box>
          <p>
            <b>{string[0]}</b>
          </p>
          {string.slice(1).length ? <p style={{
            textAlign: 'left'
          }} dangerouslySetInnerHTML={{ __html: string.slice(1).join(`<br />`) }}>
          </p> : null}
        </Box>
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