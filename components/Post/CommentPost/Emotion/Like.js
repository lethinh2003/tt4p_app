import { Box, Typography } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "react-toastify";
const Like = ({ item }) => {
  const { data: session, status } = useSession();
  const [isHearted, setIsHearted] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      if (item && item.likes.length >= 0) {
        setHearts(item.likes.length);
        const resultCheckHeart = checkHeartedPost(session.user.id, item.likes);

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
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/likes/${item._id}`,
        {
          userId: session.user.id,
        }
      );
      setIsLoading(false);
      if (res.data.message === "create_success") {
        setIsHearted(true);
        setHearts((prev) => prev + 1);
      } else if (res.data.message === "delete_success") {
        setIsHearted(false);
        setHearts((prev) => prev - 1);
      }
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
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleClickHeart()}
        sx={{
          cursor: "pointer",
          overflow: "hidden",
          backgroundColor: "#f7f7f7",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          borderRadius: "10px",
          border: (theme) => `1px solid ${theme.palette.border.dialog}`,
          color: isHearted
            ? "#ff5775"
            : (theme) => theme.palette.text.color.second,
          pointerEvents: isLoading ? "none" : "visible",
          opacity: isLoading ? "0.5" : "1",
        }}
      >
        <IoHeartSharp />
        <Typography
          sx={{
            color: (theme) => theme.palette.text.color.first,
            fontWeight: 600,
          }}
        >
          {hearts}
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(Like);
