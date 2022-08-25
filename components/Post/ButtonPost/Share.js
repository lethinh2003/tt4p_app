import IosShareIcon from "@mui/icons-material/IosShare";
import { Box } from "@mui/material";
import React from "react";
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
            <IosShareIcon />
          </Box>
          Share
        </Box>
      </Box>
    </>
  );
};
export default React.memo(Share);
