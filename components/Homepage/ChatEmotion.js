import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const ChatEmotion = ({ setChatContent }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmotion, setIsEmotion] = useState(false);
  const handleClickEmotion = () => {
    setIsEmotion(!isEmotion);
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setChatContent((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <IconButton onClick={() => handleClickEmotion()}>
        <EmojiEmotionsIcon />
      </IconButton>
      {isEmotion && (
        <div
          style={{
            bottom: "70px",
            position: "absolute",
            right: 0,
          }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </>
  );
};
export default React.memo(ChatEmotion);
