import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getToggleAboutMe } from "../../redux/actions/getToggleAboutMe";
import axios from "axios";
import AboutWeb from "../AboutMe/AboutWeb";
const AboutMe = () => {
  const dispatch = useDispatch();
  const isOpenDialog = useSelector((state) => state.toggleAboutMe.on);

  const theme = useTheme();
  const handleClose = () => {
    dispatch(getToggleAboutMe(false));
  };

  const DialogWrapper = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.background.dialog,
      borderRadius: "20px",
      border: `1px solid ${theme.palette.border.dialog}`,
      width: "100%",
      margin: "0",
      maxWidth: "600px",

      "& .MuiDialogTitle-root": {
        borderBottom: `1px solid ${theme.palette.border.dialog}`,
        fontSize: "20px",
        fontWeight: "bold",
      },
      "& .MuiDialogContent-root": {
        padding: "20px",
      },
      "& .MuiDialogContentText-root": {
        fontWeight: "bold",
      },
    },
  }));
  const BoxAvatar = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "200px",
    fontWeight: "bold",
    height: "200px",
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
    <>
      <DialogWrapper fullWidth open={isOpenDialog} onClose={handleClose}>
        <DialogTitle>Về trang web này</DialogTitle>
        <DialogContent>
          <AboutWeb />
        </DialogContent>
      </DialogWrapper>
    </>
  );
};
export default AboutMe;
