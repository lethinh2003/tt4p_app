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
          backgroundColor: isClickRepComment
            ? (theme) => theme.palette.button.background.iconOthers
            : null,
          color: isClickRepComment ? "#39e58c" : null,
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.button.background.iconOthers,
            color: "#39e58c",
          },
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",

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
