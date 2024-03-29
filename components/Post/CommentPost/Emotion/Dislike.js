import { Box, Typography } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ImAngry2 } from "react-icons/im";
import { toast } from "react-toastify";
const Dislike = ({ item, socket }) => {
  const { data: session, status } = useSession();
  const [isHearted, setIsHearted] = useState(false);
  const [hearts, setHearts] = useState(item.dislikes.length);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on("update-reaction-post-comment", (data) => {
        if (
          data.userId === session.user.id &&
          data.type === "dislike" &&
          data.commentId === item._id
        ) {
          setIsHearted(true);
          setHearts(data.dislikes);
        } else if (
          data.userId === session.user.id &&
          data.type === "like" &&
          data.commentId === item._id
        ) {
          setIsHearted(false);
          setHearts(data.dislikes);
        }
      });
      return () => {
        // socket.off("update-reaction-post-comment");
      };
    }
  }, [socket, item]);
  useEffect(() => {
    if (status === "authenticated") {
      if (item && item.dislikes.length >= 0) {
        const resultCheckHeart = checkHeartedPost(
          session.user.id,
          item.dislikes
        );
        setIsHearted(resultCheckHeart);
      }
    }
  }, [item, status]);
  const checkHeartedPost = (userID, array) => {
    let check = false;
    for (let i = 0; i < array.length; i++) {
      if (userID === array[i]) {
        check = true;
        return check;
      }
    }
    return check;
  };
  const handleClickHeart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/dislikes/${item._id}`,
        {
          userId: session.user.id,
        }
      );
      setIsLoading(false);
      // if (res.data.message === "create_success") {
      //   setIsHearted(true);
      //   setHearts((prev) => prev + 1);
      // } else if (res.data.message === "delete_success") {
      //   setIsHearted(false);
      //   setHearts((prev) => prev - 1);
      // }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      <Box
        onClick={() => handleClickHeart()}
        sx={{
          cursor: "pointer",
          overflow: "hidden",

          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",

          color: isHearted
            ? "#66b7d4"
            : (theme) => theme.palette.text.color.second,
          pointerEvents: isLoading ? "none" : "visible",
          opacity: isLoading ? "0.5" : "1",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.button.background.iconUnheart,
            color: "#66b7d4",
          },
          "&:hover > .angry": {
            color: "#66b7d4",
          },
        }}
      >
        <ImAngry2 className="angry" />
        <Typography
          sx={{
            color: isHearted ? "#66b7d4" : null,
            fontWeight: 600,
          }}
        >
          {hearts}
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(Dislike);
