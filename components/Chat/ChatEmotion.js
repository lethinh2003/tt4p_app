import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const ChatEmotion = ({
  setChatContent,
  chatInputRef,
  chatTypingRef,
  socket,
}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmotion, setIsEmotion] = useState(false);
  const handleClickEmotion = () => {
    setIsEmotion(!isEmotion);
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setChatContent((prev) => prev + emojiObject.emoji);
    if (socket) {
      clearTimeout(chatTypingRef.current);
      socket.emit("chat-typing", true);
      chatTypingRef.current = setTimeout(() => {
        socket.emit("chat-typing", false);
      }, 1000);
    }
    if (chatInputRef.current) {
      chatInputRef.current.childNodes[0].childNodes[0].focus();
    }
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
