import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { getToggleSetting } from "../../redux/actions/getToggleSetting";
import { useDispatch, useSelector } from "react-redux";

const Warning = ({
  isShow,
  toggle,
  handleChangeTheme,
  value,
  handleChangeHideInfo,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleClose = () => {
    toggle();
  };
  const handleAgree = async () => {
    toggle();
    if (handleChangeTheme) {
      handleChangeTheme(value);
    }
    if (handleChangeHideInfo) {
      await handleChangeHideInfo(value);
    }

    dispatch(getToggleSetting(false));
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
      "& .MuiDialogActions-root": {
        borderTop: `1px solid ${theme.palette.border.dialog}`,
      },
    },
  }));

  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  return (
    <DialogWrapper fullWidth open={isShow} onClose={handleClose}>
      <DialogTitle>Cảnh báo</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="https://i.imgur.com/x5WnQJt.png"
            width={"100"}
            height={"100"}
          />
        </Box>
        <DialogContentText>
          Hành động này sẽ khiến bạn out phòng chat nếu bạn tiếp tục!
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
export default Warning;
