import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiHeartsFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _listHeartedPosts } from "../../redux/actions/_listHeartedPosts";
import { _postActivity } from "../../redux/actions/_postActivity";
import { _notify } from "../../redux/actions/_notify";
import {
  ADD_ITEM_LIST_HEARTED_POSTS,
  SET_POST_ACTIVITY,
  ADD_ITEM_POST_ACTIVITY,
  REMOVE_ITEM_LIST_HEARTED_POSTS,
  INC_NOTIFY_NUMBER,
} from "../../redux/actions/constants";
const ItemHearts = ({ item, session, status, socket }) => {
  const dispatch = useDispatch();

  const dataUserHeatedPosts = useSelector((state) => state.userHearted);

  const [isHearted, setIsHearted] = useState(false);
  const [hearts, setHearts] = useState(
    item.hearts.length ? item.hearts.length : 0
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("update-public-post", (data) => {
        if (data.postID === item._id) {
          if (data.userID === session.user.id) {
            if (data.type === "create_success") {
              dispatch(
                _postActivity({
                  type: ADD_ITEM_POST_ACTIVITY,
                  data: item,
                })
              );
              dispatch(
                _listHeartedPosts({
                  type: ADD_ITEM_LIST_HEARTED_POSTS,
                  data: item._id,
                })
              );
            } else {
              dispatch(
                _listHeartedPosts({
                  type: REMOVE_ITEM_LIST_HEARTED_POSTS,
                  data: item._id,
                })
              );
            }
          }

          setHearts(data.hearts_count);
        }
      });

      return () => {
        socket.off("update-public-post");
      };
    }
  }, [socket]);
  useEffect(() => {
    if (dataUserHeatedPosts.includes(item._id)) {
      setIsHearted(true);
    } else {
      setIsHearted(false);
    }
  }, [dataUserHeatedPosts]);

  const handleClickHeart = async (item) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/hearts`,
        {
          postID: item._id,
        }
      );

      setIsLoading(false);
      // setHearts(res.data.data.hearts_count);
      if (res.data.message === "create_success") {
        if (session.user.id != item.user[0]._id) {
          const sendNotify = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies`,
            {
              user_send: session.user.id,
              user_receive: item.user[0]._id,
              post: item._id,
              type: "heart_post",
              content: `${session.user.account} đã yêu thích bài viết của bạn!`,
            }
          );
          socket.emit("inc-notify-number", {
            account: item.user[0].account,
            number: 1,
          });
        }
        //   dispatch(
        //     _listHeartedPosts({
        //       type: ADD_ITEM_LIST_HEARTED_POSTS,
        //       data: item._id,
        //     })
        //   );
        //   dispatch(getPostActivity(session.user.id));
      } else if (res.data.message === "delete_success") {
        if (session.user.id != item.user[0]._id) {
          await Promise.all([
            axios.post(
              `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete`,
              {
                user_send: session.user.id,
                user_receive: item.user[0]._id,
                post: item._id,
                type: "heart_post",
              }
            ),
            axios.post(
              `${process.env.ENDPOINT_SERVER}/api/v1/posts/activities/${session.user.id}`,
              {
                postId: item._id,
              }
            ),
          ]);
        } else {
          await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/posts/activities/${session.user.id}`,
            {
              postId: item._id,
            }
          );
        }
        // dispatch(
        //   _listHeartedPosts({
        //     type: REMOVE_ITEM_LIST_HEARTED_POSTS,
        //     data: item._id,
        //   })
        // );
      }
      const dataSocket = {
        postID: item._id,
        hearts_count: res.data.data.hearts_count,
        userID: session.user.id,
        type: res.data.message,
      };

      socket.emit("update-likes-post", dataSocket);
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
        sx={{
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
            fontSize: "2rem",
            cursor: "pointer",
          }}
        />
        {hearts}
      </Box>
    </>
  );
};
export default ItemHearts;
