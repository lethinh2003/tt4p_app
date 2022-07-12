import { Box, Typography } from "@mui/material";
import { useState, memo } from "react";
import AvatarUser from "../AvatarUser";
import { timeFromNow } from "../../../utils/convertTime";
const Item = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          marginBottom: "5px",
          height: "115px",
          backgroundColor: !item.read ? "#e9f5fd" : null,
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
          }}
        >
          <AvatarUser
            user={item.user_send}
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: "bold",
            }}
          >
            {item.user_send.account}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeigth: "bold",

              overflow: "hidden !important",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.content}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.4rem",

              color: (theme) => theme.palette.text.color.second,
            }}
          >
            {timeFromNow(item.createdAt)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default memo(Item);
