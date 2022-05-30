import { Box, ClickAwayListener, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import convertChat from "../../../utils/convertChat";
const OptionMenu = ({ isOpenOption, setIsOpenOption }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const timeoutRef = useRef(null);

  const BoxItem = styled(Box)(({ theme }) => ({
    width: "100%",
    textAlign: "center",

    "&:hover": {
      opacity: 0.6,
    },
  }));
  const handleClickCreateComment = async () => {
    try {
      if (content.length < 5) {
        return 0;
      }
      setIsLoading(true);
      if (replyComment) {
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/reps/${replyComment.commentId}`,
          {
            userId: session.user.id,
            content: convertChat(content),
          }
        );
        if (socket) {
          const data = {
            room: `post_${item._id}`,
            commentId: res.data.data.comment[0],
          };
          console.log(data);
          socket.emit("create-post-comment", data);
        }
        setReplyComment("");
      } else {
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/${item._id}`,
          {
            userId: session.user.id,
            content: convertChat(content),
          }
        );

        if (socket) {
          const data = {
            room: `post_${item._id}`,
            commentId: res.data.data._id,
          };
          socket.emit("create-post-comment", data);
        }
      }
      setContent("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      {isOpenOption && (
        <ClickAwayListener onClickAway={() => setIsOpenOption(!isOpenOption)}>
          <Box
            as={motion.div}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            sx={{
              top: "30px",
              right: "40px",
              position: "absolute",
              width: "100px",

              display: "flex",
              gap: "10px",
              flexDirection: "column",
              cursor: "pointer",
              overflow: "hidden",
              backgroundColor: "#f7f7f7",
              display: "flex",
              gap: "5px",
              alignItems: "center",
              padding: "5px",
              borderRadius: "10px",
              border: (theme) => `1px solid ${theme.palette.border.dialog}`,
              color: (theme) => theme.palette.text.color.second,
              boxShadow: (theme) =>
                `0px 3px 10px 1px ${theme.palette.feeds.boxShadow}`,
            }}
          >
            <BoxItem
              sx={{
                borderBottom: (theme) =>
                  `1px solid ${theme.palette.border.dialog}`,
              }}
            >
              <Typography
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.palette.text.color.first,
                  fontWeight: 600,
                }}
              >
                Edit
              </Typography>
            </BoxItem>
            <BoxItem>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: (theme) => theme.palette.text.color.first,
                  fontWeight: 600,
                }}
              >
                Delete
              </Typography>
            </BoxItem>
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};
export default OptionMenu;
