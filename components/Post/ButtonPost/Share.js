import { Box, Typography } from "@mui/material";
import React from "react";
import { BiShare } from "react-icons/bi";
const Share = ({
  item,
  setEditComment,
  createCommentBoxRef,
  setIsLoadingOption,
}) => {
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
            fontSize: "inherit",
            cursor: "pointer",
            color: (theme) => theme.palette.text.color.first,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <BiShare /> Share
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(Share);
