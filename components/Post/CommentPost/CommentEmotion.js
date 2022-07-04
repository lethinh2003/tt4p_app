import { Box } from "@mui/material";
import React, { useState } from "react";
import Dislike from "./Emotion/Dislike";
import Like from "./Emotion/Like";
const CommentEmotion = ({ item, socket }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <Like item={item} socket={socket} />
        <Dislike item={item} socket={socket} />
      </Box>
      <Box
        sx={{
          width: "2px",
          height: "50%",
          backgroundColor: (theme) => `${theme.palette.border.dialog}`,
        }}
      ></Box>
    </>
  );
};
export default React.memo(CommentEmotion);
