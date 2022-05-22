import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { RiHeartsFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import checkHeartedPost from "../../utils/checkHeartedPost";
import { getPostActivity } from "../../redux/actions/getPostActivity";
import { getPostHearts } from "../../redux/actions/getPostHearts";
import { motion } from "framer-motion";

const ItemHearts = ({ item }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const [isHearted, setIsHearted] = useState(false);
  const [hearts, setHearts] = useState(
    item.hearts.length ? item.hearts.length : 0
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      if (item && item.hearts.length > 0) {
        console.log(item.hearts);
        const resultCheckHeart = checkHeartedPost(session.user.id, item.hearts);
        setIsHearted(resultCheckHeart);
      }
    }
  }, [item, status]);

  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));
  const TitleFeeds = styled(Typography)(({ theme }) => ({
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: theme.palette.text.color.second,
    cursor: "pointer",
    "&.active": {
      color: theme.palette.text.color.active,
    },
  }));
  const handleClickHeart = async (item) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/hearts`,
        {
          post: item._id,
        }
      );

      // const getHeartsPost = await axios.get(
      //   `${process.env.ENDPOINT_SERVER}/api/v1/posts/${item._id}`
      // );

      setIsLoading(false);
      if (res.data.message === "create_success") {
        setIsHearted(true);
        // setHearts(getHeartsPost.data.data.hearts_count);
        setHearts((prev) => prev + 1);
        dispatch(getPostActivity(session.user.id));
        // dispatch(getPostHearts(session.user.id));
      } else if (res.data.message === "delete_success") {
        await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/posts/activities/${session.user.id}`,
          {
            postId: item._id,
          }
        );

        setIsHearted(false);
        // setHearts(getHeartsPost.data.data.hearts_count);
        setHearts((prev) => prev - 1);
        // dispatch(getPostHearts(session.user.id));
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          cursor: "pointer",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          color: isHearted ? "#ff5775" : "inherit",
          pointerEvents: isLoading ? "none" : "visible",
          opacity: isLoading ? "0.5" : "1",
        }}
      >
        <RiHeartsFill
          onClick={() => handleClickHeart(item)}
          style={{
            fontSize: "3rem",
          }}
        />
        {hearts}
      </Box>
    </>
  );
};
export default ItemHearts;
