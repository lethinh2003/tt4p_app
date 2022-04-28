import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TimeCountRequestInfo from "./TimeCountRequestInfo";
const RequestInfoDialog = ({ isShow, toggle, partner, socket }) => {
  const handleClose = () => {
    if (socket) {
      socket.emit("notify-request-info-partner", {
        status: "fail",
        message: "Đối phương đã từ chối cho info, cố gắng xin lại nha bạnnn!!",
      });
    }
    toggle();
  };
  const handleAgree = async () => {
    if (socket) {
      socket.emit("notify-request-info-partner", {
        status: "success",
        message: "Xin info thành công!!",
      });
    }
    toggle();
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
      "& .MuiDialogContentText-root": {
        fontWeight: "bold",
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
    fontSize: "2rem",

    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  const BoxAvatar = styled(Box)(({ theme }) => ({
    marginBottom: "10px",
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "100px",
    fontWeight: "bold",
    height: "100px",
    borderRadius: "50px",
    position: "relative",
    "&::before": {
      borderRadius: "50px",
      border: "2px solid #6edee0",
      position: "absolute",
      content: `""`,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      transform: "scale(1.1)",
    },
  }));
  return (
    <DialogWrapper fullWidth open={isShow} onClose={handleClose}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BoxAvatar>
            <Image
              src={
                partner.sex === "boy"
                  ? "https://i.imgur.com/yFYUbLZ.png"
                  : "https://i.imgur.com/Or9WeCe.png"
              }
              width={100}
              height={100}
            />
          </BoxAvatar>
        </Box>
        <DialogContentText>
          Ối trời ui!! Đối phương đã cảm kích bạn rùi hihi. Bạn có chấp nhận cho
          đối phương xin contact không nek ??
        </DialogContentText>
        <TimeCountRequestInfo toggle={toggle} socket={socket} />
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
export default RequestInfoDialog;
