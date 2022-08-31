import IosShareIcon from "@mui/icons-material/IosShare";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { RWebShare } from "react-web-share";

const Share = ({ item }) => {
  return (
    <>
      <RWebShare
        data={{
          text: `${item.title} - Let see full post!`,
          title: `${item.title} - TroChuyen4Phuong`,
        }}
      >
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
      </RWebShare>
    </>
  );
};
export default React.memo(Share);
