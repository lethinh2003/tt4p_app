import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, { useState } from "react";
const Save = ({
  item,
  setEditComment,
  createCommentBoxRef,
  setIsLoadingOption,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const handleClickSave = () => {
    setIsSaved(!isSaved);
  };
  return (
    <>
      <Box
        onClick={() => handleClickSave()}
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          color: isSaved
            ? "#c43be8"
            : (theme) => theme.palette.text.color.first,
          "&:hover": {
            color: "#c43be8",
            "& .icon": {
              backgroundColor: (theme) =>
                theme.palette.button.background.iconSave,
              color: "#c43be8",
            },
          },
        }}
      >
        <Box
          sx={{
            fontSize: "inherit",
            cursor: "pointer",

            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "1.4rem",
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
            {isSaved ? (
              <BookmarkIcon
                sx={{
                  color: "#c43be8",
                }}
              />
            ) : (
              <BookmarkBorderIcon />
            )}
          </Box>
          Save
        </Box>
      </Box>
    </>
  );
};
export default React.memo(Save);
