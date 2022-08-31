import { Box, Typography, ClickAwayListener } from "@mui/material";
import { useState, memo } from "react";
import AvatarUser from "../AvatarUser";
import { timeFromNow } from "../../../utils/convertTime";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const OptionItem = ({
  item,
  setIsHide,
  setIsLoading,
  isLoading,
  setIsOpenOptionMenu,
}) => {
  const handleClickDeleteNotify = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete_by_id`,
        {
          id: item._id,
        }
      );
      if (res.data.data) {
        setIsHide(true);
      } else {
        toast.error("Có lỗi xảy ra!");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpenOptionMenu(false)}>
        <Box
          sx={{
            zIndex: 1,
            cursor: "pointer",
            marginBottom: "5px",
            position: "absolute",
            backgroundColor: (theme) =>
              theme.palette.notification.background.optionMenu,
            border: (theme) => `1px solid ${theme.palette.border.dialog}`,
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "90%",
            bottom: "15px",
            borderRadius: "5px",
            boxShadow: (theme) =>
              `1px 7px 11px 0px ${theme.palette.notification.boxShadow.optionMenu}`,
          }}
        >
          <Typography
            onClick={() => handleClickDeleteNotify()}
            sx={{
              fontSize: "1.4rem",
              fontWeight: "500",
              color: (theme) => theme.palette.text.color.first,
              "&:hover": {
                color: (theme) =>
                  theme.palette.notification.color.optionMenuHover,
              },
            }}
          >
            Delete this notification
          </Typography>
        </Box>
      </ClickAwayListener>
    </>
  );
};
export default memo(OptionItem);
