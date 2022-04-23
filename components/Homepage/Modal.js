import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { GifBoxRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
const Modal = () => {
  const theme = useTheme();
  const handleClose = () => {
    setIsOpenPopup(false);
  };
  const handleAgree = () => {
    setIsOpenPopup(false);
    handleChangeTheme();
  };
  const BoxWrapper = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    borderRadius: "20px",
    border: `1px solid ${theme.palette.border.dialog}`,
    zIndex: 99,
  }));
  const BoxContentWrapper = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    maxWidth: "500px",
    width: "100%",
    height: "200px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.dialog,
    borderRadius: "20px",
    border: `1px solid ${theme.palette.border.dialog}`,
  }));
  return (
    <>
      <BoxWrapper>
        <BoxContentWrapper
          as={motion.div}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",

              textAlign: "center",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.border.dialog}`,
            }}
          >
            Thông tin cá nhân
          </Typography>
        </BoxContentWrapper>
      </BoxWrapper>
    </>
  );
};
export default Modal;
