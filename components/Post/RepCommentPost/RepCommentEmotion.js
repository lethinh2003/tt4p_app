import { Box } from "@mui/material";
import React, { useState } from "react";
import Dislike from "./Emotion/Dislike";
import Like from "./Emotion/Like";
const RepCommentEmotion = ({ item }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Like item={item} />
        <Dislike item={item} />
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
export default React.memo(RepCommentEmotion);
