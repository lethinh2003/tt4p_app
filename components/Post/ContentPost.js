import { Typography, Box, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import convertToTime from "../../utils/convertTime";
import readingTime from "reading-time";
import { BiTimeFive } from "react-icons/bi";
import { RiBookOpenLine } from "react-icons/ri";
import ButtonPost from "./ButtonPost";
const ContentPost = ({ item, socket }) => {
  return (
    <>
      {item && (
        <>
          <Box
            sx={{
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              gap: "5px",
              borderRadius: "10px",

              boxShadow: (theme) =>
                `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,

              fontSize: "1.7rem",
              color: "#ffffff",
              backgroundColor: "#ffffff",

              padding: "20px",
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            <div
              className="content-html"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <ButtonPost socket={socket} item={item} />
          </Box>
        </>
      )}
    </>
  );
};
export default ContentPost;
