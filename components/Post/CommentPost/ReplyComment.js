import { Box, Typography } from "@mui/material";
import React from "react";
const ReplyComment = ({ item, setReplyComment, createCommentBoxRef }) => {
  const handleClickReply = (item) => {
    const data = {
      account: item.user[0].account,
      name: item.user[0].name,
      content: item.content,
      commentId: item._id,
      postId: item.post[0]._id,
    };
    setReplyComment(data);
    if (createCommentBoxRef.current) {
      createCommentBoxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.text.color.first,
            fontWeight: 600,
          }}
          onClick={() => handleClickReply(item)}
        >
          Reply
        </Typography>
      </Box>
      <Box
        sx={{
          width: "2px",
          height: "50%",
          backgroundColor: (theme) => `${theme.palette.border.dialog}`,
        }}
      ></Box>
    </>
  );
};
export default React.memo(ReplyComment);
