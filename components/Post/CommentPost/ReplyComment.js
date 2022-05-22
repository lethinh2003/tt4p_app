import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ImAngry2 } from "react-icons/im";
import { IoHeartSharp } from "react-icons/io5";
import { SiIconify } from "react-icons/si";
const ReplyComment = ({}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmotion, setIsEmotion] = useState(false);
  const handleClickEmotion = () => {
    setIsEmotion(!isEmotion);
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    if (chatInputRef.current) {
      chatInputRef.current.childNodes[0].childNodes[0].focus();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.text.color.first,
            fontWeight: 600,
          }}
        >
          Reply
        </Typography>
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
export default React.memo(ReplyComment);