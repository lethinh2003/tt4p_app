import {
  Box,
  Switch,
  Typography,
  Avatar,
  Button,
  Skeleton,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { Oval } from "react-loading-icons";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import convertTime from "../../../utils/convertTime";
import CommentEmotion from "./CommentEmotion";
import ReplyComment from "./ReplyComment";
import { HiDotsHorizontal } from "react-icons/hi";
const Item = ({ item }) => {
  const dataUser = useSelector((state) => state.user.data);

  const timeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      <Box
        as={motion.div}
        sx={{
          width: "100%",

          overflowY: "auto",
          borderBottom: (theme) => `1px solid ${theme.palette.border.dialog}`,
          gap: "5px",

          display: "flex",
          fontSize: "3rem",
          color: "#ffffff",

          alignItems: "flex-start",
          fontWeight: "bold",
          padding: "20px 0px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <AvatarProfile alt={item.user[0].name} src={item.user[0].avatar} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                {item.user[0].name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{item.user[0].account}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ color: (theme) => theme.palette.text.color.second }}>
            <IconButton>
              <HiDotsHorizontal />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            color: "#757474",
            fontSize: "1.7rem",
            fontWeight: 500,
          }}
        >
          {item.content}
        </Box>
        <Box
          sx={{
            fontSize: "1.7rem",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            color: (theme) => theme.palette.text.color.second,
          }}
        >
          <CommentEmotion item={item} />
          <ReplyComment />
          <Box
            sx={{
              color: "#757474",
              fontSize: "1.5rem",
              fontWeight: 500,
            }}
          >
            {convertTime(item.createdAt)}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Item;
