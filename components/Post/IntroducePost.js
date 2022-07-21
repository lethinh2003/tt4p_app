import { Box, Typography } from "@mui/material";
import convertToTime from "../../utils/convertTime";
import AvatarUser from "../Homepage/AvatarUser";
import { memo } from "react";
const IntroducePost = ({ item }) => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          minHeight: "250px",
          border: (theme) => `3px solid ${theme.palette.border.feeds}`,
          backgroundColor: item.color ? item.color : "#ccc",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: (theme) =>
            `0px 3px 20px 6px${theme.palette.feeds.boxShadow}`,
          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            flex: 1,
            width: "100%",
            gap: "10px",
          }}
        >
          <AvatarUser user={item.user[0]} />

          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",

              whiteSpace: "nowrap",
              overflow: "hidden !important",
              textOverflow: "ellipsis",
            }}
          >
            {item.user[0].name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            fontSize: "2rem",
            height: "100%",
            fontWeight: "bold",
            color: (theme) => theme.palette.text.color.second,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            📅 {convertToTime(item.createdAt)}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default memo(IntroducePost);
