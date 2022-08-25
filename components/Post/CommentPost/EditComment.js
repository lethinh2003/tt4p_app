import { Box, Typography } from "@mui/material";
import React from "react";

const EditComment = ({
  item,
  setIsClickEditComment,
  isClickEditComment,
  setEditCommentData,
  vanilaContent,
}) => {
  const handleClickEdit = (item) => {
    if (isClickEditComment) {
      setEditCommentData("");
    } else {
      const data = {
        content: vanilaContent,
        commentId: item._id,
        type: "comment",
      };
      setEditCommentData(data);
    }
    setIsClickEditComment(!isClickEditComment);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          backgroundColor: isClickEditComment
            ? (theme) => theme.palette.button.background.iconOthers
            : null,
          color: isClickEditComment ? "#39e58c" : null,
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
