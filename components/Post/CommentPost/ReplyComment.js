import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
const ReplyComment = ({
  item,
  setReplyCommentData,
  isClickRepComment,
  setIsClickRepComment,
}) => {
  const handleClickReply = (item) => {
    if (isClickRepComment) {
      setReplyCommentData("");
    } else {
      const data = {
        account: item.user[0].account,
        name: item.user[0].name,
        content: item.content,
        commentId: item._id,
        postId: item.post[0]._id,
      };
      setReplyCommentData(data);
    }
    setIsClickRepComment(!isClickRepComment);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          "&:hover": {
            backgroundColor: "#e8ecf9",
          },
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.text.color.second,
            fontWeight: 600,
          }}
          onClick={() => handleClickReply(item)}
        >
          Reply
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(ReplyComment);
