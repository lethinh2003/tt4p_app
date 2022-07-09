import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiMessage } from "react-icons/bi";
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
          "&:hover": {
            backgroundColor: "#e8ecf9",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "inherit",

            color: (theme) => theme.palette.text.color.first,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <BiMessage /> {CommentsCount.length} Comments
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(Comment);
