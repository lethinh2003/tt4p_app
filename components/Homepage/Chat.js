import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatForm from "../Chat/ChatForm";

import convertChat from "../../utils/convertChat";
const Chat = ({ socket, partner, isHideInfo }) => {
  const { data: session, status } = useSession();
  const [namePartner, setNamePartner] = useState(partner ? partner.name : "");

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
        socketOn.current = socket.on("receive-chat-content", (data) => {
          const newMessage = convertChat(data.message);
          data.message = newMessage;

          setMessages((prev) => [...prev, data]);
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
    if (partner) {
      if (isHideInfo) {
        const namePartnerArray = partner.name.split("");
        for (let i = namePartnerArray.length - 1; i > 0; i--) {
          namePartnerArray[i] = "*";
        }
        setNamePartner(namePartnerArray.join(""));
      } else {
        setNamePartner(partner.name);
      }
    }
  }, [isHideInfo]);
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
    maxHeight: "500px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    // "::-webkit-scrollbar": {
    //   display: "none",
    // },
  }));

  const BoxAvatar = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    minWidth: "50px",
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
    width: "100%",

    "& .box-content": {
      maxWidth: "calc(100% - 70px)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "&--userName": {
        fontWeight: "bold",
        fontSize: "15px",
      },
      "&--text": {
        wordWrap: "break-word",
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
    width: "100%",
    justifyContent: "flex-end",

    "& .box-content": {
      maxWidth: "calc(100% - 70px)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      "&--userName": {
        fontWeight: "bold",
        fontSize: "15px",
        alignSelf: "flex-end",
      },
      "&--text": {
        wordWrap: "break-word",

        padding: "10px",
        borderRadius: "10px 0 10px 10px",
        backgroundColor: "#6c90eb",
        color: "#ffffff",
        fontSize: "20px",
      },
    },
  }));

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
                  <BoxChatUserLeft
                    as={motion.div}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    <BoxAvatar
                      sx={{
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      <Image
                        src={
                          item.sex === "boy"
                            ? "https://i.imgur.com/yFYUbLZ.png"
                            : "https://i.imgur.com/Or9WeCe.png"
                        }
                        alt={namePartner}
                        width={50}
                        height={50}
                      />
                    </BoxAvatar>
                    <Box className="box-content">
                      <Typography
                        className="box-content--userName"
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        {namePartner}
                      </Typography>
                      <Typography className="box-content--text">
                        {item.message}
                      </Typography>
                    </Box>
                  </BoxChatUserLeft>
                ) : (
                  <BoxChatUserRight>
                    <Box className="box-content">
                      <Typography
                        className="box-content--userName"
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography className="box-content--text">
                        {item.message}
                      </Typography>
                    </Box>
                    <BoxAvatar
                      sx={{
                        display: { xs: "none", md: "block" },
                      }}
                    >
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
          <div ref={messagesEndRef} />
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
        </BoxWrapper>

        <ChatForm socket={socket} />
      </Box>
    </>
  );
};
export default Chat;
