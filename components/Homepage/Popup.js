import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

const Popup = ({ setIsOpenPopup, isOpenPopup, handleChangeTheme }) => {
  const theme = useTheme();
  const handleClose = () => {
    setIsOpenPopup(false);
  };
  const handleAgree = () => {
    setIsOpenPopup(false);
    handleChangeTheme();
  };
  const DialogWrapper = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.background.dialog,
      borderRadius: "20px",
      border: `1px solid ${theme.palette.border.dialog}`,

      "& .MuiDialogTitle-root": {
        borderBottom: `1px solid ${theme.palette.border.dialog}`,
        fontSize: "20px",
        fontWeight: "bold",
      },
      "& .MuiDialogContent-root": {
        padding: "20px",
      },
    },
  }));
  return (
    <DialogWrapper
      fullWidth
      open={isOpenPopup}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn chuyển sang chế độ khác? Bạn sẽ tự động out phòng nếu nhấn
          đồng ý!!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Thoát </Button>
        <Button onClick={handleAgree} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </DialogWrapper>
  );
};
export default Popup;
