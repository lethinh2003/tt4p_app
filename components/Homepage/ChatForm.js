import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField, TextareaAutosize } from "@mui/material";
import { useRef, useState } from "react";
import ChatEmotion from "./ChatEmotion";
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
    if (chatContent) {
      socket.emit("send-chat-content", chatContent);
      setChatContent("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClickSubmit();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",

          width: "100%",
          padding: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",

            width: "100%",
          }}
          onSubmit={handleSubmit}
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
          <ChatEmotion setChatContent={setChatContent} />
          <IconButton onClick={() => handleClickSubmit()}>
            <SendIcon />
          </IconButton>
        </form>
      </Box>
    </>
  );
};
export default ChatForm;
