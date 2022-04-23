import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/getUser";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import Popup from "./Popup";
import useModal from "../../utils/useModal";
import Image from "next/image";
import axios from "axios";
import InfoModalEdit from "./InfoModalEdit";

const InfoModal = ({ isShow, toggle, user }) => {
  const theme = useTheme();
  const handleClose = () => {
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
    },
  }));
  const ButtonOptionWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.buttonOption,
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.background.buttonOptionHover,
      opacity: 0.8,
    },
    "&.active": {
      border: "2px solid",
    },
  }));
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: "#fd6b2229",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));

  return (
    <>
      <DialogWrapper fullWidth open={isShow} onClose={handleClose}>
        <DialogTitle>Thông tin cá nhân</DialogTitle>
        <DialogContent>
          <DialogContentText>Tài khoản</DialogContentText>
          <TextField
            size="small"
            fullWidth
            defaultValue={user.account}
            disabled
          />
          <DialogContentText>Năm sinh</DialogContentText>
          <TextField size="small" fullWidth defaultValue={user.date} disabled />
          <InfoModalEdit user={user} toggle={toggle} />
        </DialogContent>
      </DialogWrapper>
    </>
  );
};
export default InfoModal;
