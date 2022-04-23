import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Popup = ({ isShow, toggle, handleChangeTheme }) => {
  const theme = useTheme();
  const handleClose = () => {
    toggle();
  };
  const handleAgree = () => {
    toggle();
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
      open={isShow}
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
