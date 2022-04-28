import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import convertChat from "../../utils/convertChat";

const ChatContent = ({ item, scrollToBottom }) => {
  const [message, setMessage] = useState("");
  const handleClickChatDetail = (item) => {
    console.log(item);
  };
  useEffect(() => {
    const newMessage = convertChat(item.message);
    setMessage(newMessage);
    scrollToBottom();
  }, [item]);
  return (
    <>
      <Typography
        className="box-content--text"
        onClick={() => handleClickChatDetail(item)}
      >
        {message}
      </Typography>
    </>
  );
};
export default ChatContent;
