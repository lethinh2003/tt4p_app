import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ImAngry2 } from "react-icons/im";
import { IoHeartSharp } from "react-icons/io5";
import { SiIconify } from "react-icons/si";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
const Dislike = ({ item }) => {
  const { data: session, status } = useSession();
  const [isHearted, setIsHearted] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      if (item && item.dislikes.length >= 0) {
        setHearts(item.dislikes.length);
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
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/reps/dislikes/${item._id}`,
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
        onClick={() => handleClickHeart()}
        sx={{
          cursor: "pointer",
          overflow: "hidden",

          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",

          color: isHearted
            ? "#ff5775"
            : (theme) => theme.palette.text.color.second,
          pointerEvents: isLoading ? "none" : "visible",
          opacity: isLoading ? "0.5" : "1",
          "&:hover": {
            backgroundColor: "#e8ecf9",
          },
          "&:hover > .angry": {
            color: "#ff5775",
          },
        }}
      >
        <ImAngry2 className="angry" />
        <Typography
          sx={{
            color: (theme) => theme.palette.text.color.second,
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
