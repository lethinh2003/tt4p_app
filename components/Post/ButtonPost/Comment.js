import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiMessage } from "react-icons/bi";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSelector } from "react-redux";
const Comment = ({}) => {
  const CommentsCount = useSelector((state) => state.postComments);
  const handleClickComment = () => {
    const commentRef = document.querySelector("#comments");

    if (commentRef) {
      commentRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <Box
        onClick={handleClickComment}
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          cursor: "pointer",
          color: (theme) => theme.palette.text.color.first,
          "&:hover": {
            color: "#39e58c",
            "& .icon": {
              backgroundColor: (theme) =>
                theme.palette.button.background.iconOthers,
              color: "#39e58c",
            },
          },
        }}
      >
        <Box
          sx={{
            fontSize: "inherit",
            fontSize: "1.4rem",

            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Box
            className="icon"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <ChatBubbleOutlineIcon />
          </Box>
          {CommentsCount.length} Comments
        </Box>
      </Box>
    </>
  );
};
export default React.memo(Comment);
