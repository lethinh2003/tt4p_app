import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import AvatarUser from "../Homepage/AvatarUser";

const ChatContent = ({ item, name, message, type }) => {
  const handleClickChatDetail = (item) => {};

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
          <Box>
            <AvatarUser
              user={item.from}
              sx={{
                width: "50px",
                height: "50px",
              }}
            />
          </Box>
          <Box className="box-content">
            <Typography
              className="box-content--userName"
              sx={{
                display: { xs: "none", md: "block" },
                color: (theme) => theme.palette.text.color.first,
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
                color: (theme) => theme.palette.text.color.first,
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
          <Box>
            <AvatarUser
              user={item.from}
              sx={{
                width: "50px",
                height: "50px",
              }}
            />
          </Box>
        </>
      )}
      {type === "typing" && (
        <>
          <Box>
            <AvatarUser
              user={item}
              sx={{
                width: "50px",
                height: "50px",
              }}
            />
          </Box>

          <Box className="box-content">
            <Typography
              className="box-content--userName"
              sx={{
                color: (theme) => theme.palette.text.color.first,
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
