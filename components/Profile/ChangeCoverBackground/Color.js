import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
const Color = ({ account, setIsOpenModal }) => {
  const [color, setColor] = useState(
    account.cover_background ? account.cover_background : "#33a8ff"
  );
  const [isSending, setIsSending] = useState(false);
  const handleClickSubmit = async () => {
    try {
      setIsSending(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/update_cover_background`,
        {
          color: color,
        }
      );
      toast.info(res.data.message);
      setIsSending(false);
      setIsOpenModal(false);
      window.location.reload();
    } catch (err) {
      setIsSending(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleChangeCoverBackgroundColor = (color) => {
    setColor(color.hex);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          pointerEvents: isSending ? "none" : "visible",
          opacity: isSending ? 0.6 : 1,
          flexDirection: "column",
        }}
      >
        <ChromePicker
          color={color}
          onChange={handleChangeCoverBackgroundColor}
        />
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Button
            onClick={handleClickSubmit}
            sx={{
              pointerEvents: isSending ? "none" : "visible",
              opacity: isSending ? 0.6 : 1,
            }}
          >
            {isSending ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Color;
