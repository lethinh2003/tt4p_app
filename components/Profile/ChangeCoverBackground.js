import InputUnstyled from "@mui/base/InputUnstyled";
import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import Modal from "../Modal/Modal";
import ModalChange from "./ChangeCoverBackground/ModalChange";
import { ChromePicker, CirclePicker } from "react-color";

const ChangeCoverBackground = ({ account, session }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <>
      <ModalChange
        account={account}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />

      <Box
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: account.cover_background
            ? account.cover_background
            : "#33a8ff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          position: "relative",
        }}
      >
        {session.user.account === account.account && (
          <Box
            onClick={handleClickModal}
            sx={{
              cursor: "pointer",
              padding: "10px",
              borderRadius: "5px",
              position: "absolute",
              right: 5,
              top: 5,
              display: "flex",
              gap: "5px",
              alignItems: "center",
              padding: "5px",
              color: isOpenModal
                ? "#c43be8"
                : (theme) => theme.palette.text.color.first,
              backgroundColor: isOpenModal
                ? (theme) => theme.palette.button.background.iconSave
                : null,

              "&:hover": {
                color: "#c43be8",

                backgroundColor: (theme) =>
                  theme.palette.button.background.iconSave,
                color: "#c43be8",
              },
            }}
          >
            <AutoFixHighOutlinedIcon />
          </Box>
        )}
      </Box>
    </>
  );
};
export default ChangeCoverBackground;
