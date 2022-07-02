import { Box, Typography } from "@mui/material";
import React from "react";

const EditComment = ({
  item,
  setEditComment,
  createCommentBoxRef,
  setIsLoadingOption,
}) => {
  const handleClickEdit = (item) => {
    const data = {
      content: item.content,
      commentId: item._id,
      type: "comment",
    };
    setEditComment(data);
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
          onClick={() => handleClickEdit(item)}
        >
          Edit
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
export default React.memo(EditComment);
