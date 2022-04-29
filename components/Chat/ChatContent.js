import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";

// import convertChat from "../../utils/convertChat";

const ChatContent = ({ item, name, message, type }) => {
  // const [message, setMessage] = useState("");
  const handleClickChatDetail = (item) => {
    console.log(item);
  };
  // useEffect(() => {
  //   const newMessage = convertChat(item.message);
  //   setMessage(newMessage);
  // }, [item]);

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

  return (
    <>
      {type === "left" && (
        <>
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
              alt={name}
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
              {name}
            </Typography>
            <Typography
              className="box-content--text"
              onClick={() => handleClickChatDetail(item)}
            >
              {message}
            </Typography>
          </Box>
        </>
      )}
      {type === "right" && (
        <>
          <Box className="box-content">
            <Typography
              className="box-content--userName"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              {name}
            </Typography>
            <Typography
              className="box-content--text"
              onClick={() => handleClickChatDetail(item)}
            >
              {message}
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
              alt={name}
              width={50}
              height={50}
            />
          </BoxAvatar>
        </>
      )}
      {type === "typing" && (
        <>
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
              alt={name}
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
              {name}
            </Typography>
            <Typography
              className="box-content--text"
              onClick={() => handleClickChatDetail(item)}
            >
              {message}
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};
export default ChatContent;
