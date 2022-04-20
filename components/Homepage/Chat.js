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
import React, { useEffect, useRef, useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import ChatForm from "./ChatForm";

const Chat = ({ socket, partner }) => {
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const socketOn = useRef(null);
  const socketTypingChatOn = useRef(null);
  const boxChat = useRef(null);
  const boxChat2 = useRef(null);
  const chatSoundRef = useRef(null);
  const onScrollChat = useRef(null);
  const socketChatSoundOn = useRef(null);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (socket) {
      if (!socketOn.current) {
        socketOn.current = socket.on("receive-chat-content", (message) => {
          setMessages((prev) => [...prev, message]);
        });
      }

      socket.on("receive-chat-sound", () => {
        if (chatSoundRef.current) {
          chatSoundRef.current.play();
        }
      });

      if (!socketTypingChatOn.current) {
        socketTypingChatOn.current = socket.on("chat-typing", (data) => {
          if (data.status === true) {
            setIsTyping(true);
            setTypingMessage(data.message);
          } else {
            setIsTyping(false);
            setTypingMessage("");
          }
        });
      }
    }
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const BoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    gap: "10px",
    height: "500px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    // "::-webkit-scrollbar": {
    //   display: "none",
    // },
  }));
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  const BoxAvatar = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "50px",
    fontWeight: "bold",
    height: "50px",
    borderRadius: "50%",
    position: "relative",
    "&::before": {
      borderRadius: "50px",
      border: "2px solid #6edee0",
      position: "absolute",
      content: `""`,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      transform: "scale(1.1)",
    },
  }));
  const BoxChatUserLeft = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",

    "& .box-content": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "&--userName": {
        fontWeight: "bold",
        fontSize: "15px",
      },
      "&--text": {
        padding: "10px",
        borderRadius: "0 10px 10px 10px",
        backgroundColor: "#ccc",
        fontSize: "20px",
        color: "black",
      },
    },
  }));
  const BoxChatUserRight = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignSelf: "flex-end",

    "& .box-content": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "&--userName": {
        fontWeight: "bold",
        fontSize: "15px",
        alignSelf: "flex-end",
      },
      "&--text": {
        padding: "10px",
        borderRadius: "10px 0 10px 10px",
        backgroundColor: "#6c90eb",
        color: "#ffffff",
        fontSize: "20px",
      },
    },
  }));
  const BoxAvatarChild = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "50px",

    fontWeight: "bold",
    height: "50px",
    borderRadius: "5px",
    position: "absolute",
    "&.tt-1": {
      right: "-75px",
      top: "24px",
      backgroundColor: "#e5f99f",
    },
    "&.tt-2": {
      left: "-75px",
      width: "40px",
      height: "40px",
      backgroundColor: "#e5cbd6",
    },
    "&.tt-3": {
      bottom: "33px",
      left: "-65px",
      backgroundColor: "#ccf1fa",
    },
    "&.tt-4": {
      backgroundColor: "#ceafcf",
      bottom: "42px",
      right: "-76px",
      width: "40px",
      height: "40px",
    },
  }));
  const BoxLoading = styled(Box)({
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "700",
    opacity: "0.7",
  });
  const handleScroll = () => {
    console.log("scroll");
    clearTimeout(onScrollChat.current);
    onScrollChat.current = setTimeout(() => {
      console.log("un - scroll");
      setIsScroll(false);
    }, 1000);
    setIsScroll(true);
  };
  return (
    <>
      <audio
        id="audio"
        ref={chatSoundRef}
        src={process.env.TINGMP3_URL}
      ></audio>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          border: "2px solid #6edee0",
        }}
      >
        <BoxWrapper>
          {messages.length === 0 && (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                alignSelf: "center",
              }}
            >
              Hãy bắt chuyện trước nhé!!
            </Typography>
          )}
          {messages.length > 0 &&
            messages.map((item, i) => (
              <React.Fragment key={i}>
                {item.account !== session.user.account ? (
                  <BoxChatUserLeft>
                    <BoxAvatar>
                      <Image
                        src={
                          item.sex === "boy"
                            ? "https://i.imgur.com/yFYUbLZ.png"
                            : "https://i.imgur.com/Or9WeCe.png"
                        }
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </BoxAvatar>
                    <Box className="box-content">
                      <Typography className="box-content--userName">
                        {item.name}
                      </Typography>
                      <Typography className="box-content--text">
                        {item.message}
                      </Typography>
                    </Box>
                  </BoxChatUserLeft>
                ) : (
                  <BoxChatUserRight>
                    <Box className="box-content">
                      <Typography className="box-content--userName">
                        {item.name}
                      </Typography>
                      <Box className="box-content--text">{item.message}</Box>
                    </Box>
                    <BoxAvatar>
                      <Image
                        src={
                          item.sex === "boy"
                            ? "https://i.imgur.com/yFYUbLZ.png"
                            : "https://i.imgur.com/Or9WeCe.png"
                        }
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    </BoxAvatar>
                  </BoxChatUserRight>
                )}
              </React.Fragment>
            ))}
          {isTyping && (
            <BoxChatUserLeft>
              <BoxAvatar>
                <Image
                  src={
                    partner.sex === "boy"
                      ? "https://i.imgur.com/yFYUbLZ.png"
                      : "https://i.imgur.com/Or9WeCe.png"
                  }
                  alt={partner.name}
                  width={50}
                  height={50}
                />
              </BoxAvatar>
              <Box className="box-content">
                <Typography className="box-content--userName">
                  {partner.name}
                </Typography>
                <Box className="box-content--text">{typingMessage}</Box>
              </Box>
            </BoxChatUserLeft>
          )}
          <div ref={messagesEndRef} />
        </BoxWrapper>
        <ChatForm socket={socket} />
      </Box>
    </>
  );
};
export default Chat;
