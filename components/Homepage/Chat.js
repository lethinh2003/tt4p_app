import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import ChatForm from "../Chat/ChatForm";
import { useDispatch } from "react-redux";
import { _messagesCount } from "../../redux/actions/_messagesCount";
import { INC_MESSAGES_COUNT } from "../../redux/actions/constants";
import convertChat from "../../utils/convertChat";
import ChatContent from "../Chat/ChatContent";
const Chat = ({ socket, partner, isHideInfo, statusUser }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [namePartner, setNamePartner] = useState(partner ? partner.name : "");

  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatSoundRef = useRef(null);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    socket.on("receive-chat-content", (data) => {
      const newMessage = convertChat(data.msg);
      data.vanilaMessage = data.msg;
      data.msg = newMessage;

      setMessages((prev) => [...prev, data]);
      dispatch(
        _messagesCount({
          type: INC_MESSAGES_COUNT,
          data: 1,
        })
      );
    });

    socket.on("receive-chat-sound", () => {
      if (chatSoundRef.current) {
        // chatSoundRef.current.play();
      }
    });
    socket.on("success-restore-message", (messages) => {
      let newMessages = messages.map((item, i) => {
        const newMessage = convertChat(item.msg);
        item.vanilaMessage = item.msg;
        item.msg = newMessage;
        return item;
      });

      setMessages(newMessages);
    });

    socket.on("chat-typing", (data) => {
      if (data.status === true) {
        setIsTyping(true);
        setTypingMessage(data.message);
      } else {
        setIsTyping(false);
        setTypingMessage("");
      }
    });
    return () => {
      socket.off("receive-chat-content");
      socket.off("receive-chat-sound");
      socket.off("chat-typing");
      socket.off("success-restore-message");
    };
  }, [socket]);
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
    messagesEndRef.current.scrollIntoView();
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
      content: "",
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
        fontSize: "1rem",
      },
      "&--text": {
        wordWrap: "break-word",
        padding: "10px",
        borderRadius: "0 10px 10px 10px",
        backgroundColor: "#ccc",
        fontSize: "1.3rem",
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
        fontSize: "1rem",
        alignSelf: "flex-end",
      },
      "&--text": {
        wordWrap: "break-word",

        padding: "10px",
        borderRadius: "10px 0 10px 10px",
        backgroundColor: "#20b8fb",
        color: "#ffffff",
        fontSize: "1.3rem",
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
          {statusUser === "partner-outed-chat" && (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                alignSelf: "center",
              }}
            >
              Đối phương đã rời phòng, bấm Thoát Chat để tìm bạn mới.
            </Typography>
          )}
          {statusUser === "partner-disconnected" && (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                alignSelf: "center",
              }}
            >
              Đối phương đã thoát ứng dụng, vui lòng đợi đối phương kết nối lại
              hoặc bấm Thoát Chat để tìm bạn mới.
            </Typography>
          )}
          {messages.length === 0 && statusUser === "chatting" && (
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
                {item.from.account !== session.user.account ? (
                  <BoxChatUserLeft>
                    <ChatContent
                      item={item}
                      name={namePartner}
                      message={item.msg}
                      type={"left"}
                    />
                  </BoxChatUserLeft>
                ) : (
                  <BoxChatUserRight>
                    <ChatContent
                      item={item}
                      name={item.from.name}
                      message={item.msg}
                      type={"right"}
                    />
                  </BoxChatUserRight>
                )}
              </React.Fragment>
            ))}
          <div ref={messagesEndRef} />
          {isTyping && (
            <BoxChatUserLeft>
              <ChatContent
                item={partner}
                name={namePartner}
                message={<ThreeDots fill="#06bcee" width={"1.5rem"} />}
                type={"typing"}
              />
            </BoxChatUserLeft>
          )}
        </BoxWrapper>
        {statusUser === "chatting" && <ChatForm socket={socket} />}
      </Box>
    </>
  );
};
export default Chat;
