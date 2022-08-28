import { Box, Typography } from "@mui/material";
import Introduce from "../Homepage/Introduce";
import User from "./User";
const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
            paddingBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
              color: (theme) => theme.palette.text.color.first,
            }}
          >
            Chats
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor: (theme) => theme.palette.feed.background.first,
            border: (theme) => `1px solid ${theme.palette.border.dialog}`,
            borderRadius: "5px",
          }}
        >
          <Introduce />
          <User />
        </Box>
      </Box>
    </>
  );
};
export default HomePage;
