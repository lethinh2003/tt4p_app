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
          border: (theme) => `2px solid ${theme.palette.border.dialog}`,
          backgroundColor: item.color ? item.color : "#ccc",
          borderRadius: "30px",
          overflow: "hidden",

          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          padding: "20px",

          "&:hover": {
            border: (theme) => `2px solid ${theme.palette.border.dialogHover}`,
          },
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
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: (theme) => theme.palette.text.color.first,
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
            fontSize: "1.4rem",
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
