import { Box, Typography } from "@mui/material";
import React from "react";
import { BiBookmark } from "react-icons/bi";
const Save = ({}) => {
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
          <BiBookmark /> Save
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(Save);
