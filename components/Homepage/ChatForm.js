import {
  Box,
  Button,
  Typography,
  Backdrop,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = ({ socket }) => {
  const [chatContent, setChatContent] = useState("");

  const chatTypingRef = useRef(null);

  const handleChangeChatContent = (e) => {
    clearTimeout(chatTypingRef.current);
    socket.emit("chat-typing", true);
    setChatContent(e.target.value);
    chatTypingRef.current = setTimeout(() => {
      socket.emit("chat-typing", false);
    }, 1000);
  };
  const handleClickSubmit = () => {
    socket.emit("send-chat-content", chatContent);
    setChatContent("");
    window.scrollTo(0, 100);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
          padding: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          placeholder="Type message"
          value={chatContent}
          onChange={(e) => handleChangeChatContent(e)}
          sx={{
            flex: "1",
            height: "100%",
            outline: "none",
          }}
          size="small"
        />
        <IconButton onClick={() => handleClickSubmit()}>
          <SendIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default ChatForm;
