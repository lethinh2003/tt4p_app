import { Box, Typography } from "@mui/material";
import { memo, useState, useEffect } from "react";
import { BiHeart } from "react-icons/bi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { _listHeartedPosts } from "../../../redux/actions/_listHeartedPosts";
import { _postActivity } from "../../../redux/actions/_postActivity";
import {
  ADD_ITEM_LIST_HEARTED_POSTS,
  REMOVE_ITEM_LIST_HEARTED_POSTS,
  SET_POST_ACTIVITY,
  ADD_ITEM_POST_ACTIVITY,
} from "../../../redux/actions/constants";
import useAuth from "../../../utils/useAuth";
import { useSession } from "next-auth/react";
const Heart = ({ item, socket }) => {
  const isAuthenticated = useAuth(true);
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const dataUserHeatedPosts = useSelector((state) => state.userHearted);

  const [isHearted, setIsHearted] = useState(false);
  const [heartsCount, setHeartsCount] = useState(
    item.hearts.length ? item.hearts.length : 0
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on("update-likes-post", (data) => {
        if (data.userID === session.user.id) {
          if (data.type === "create_success") {
            dispatch(
              _listHeartedPosts({
                type: ADD_ITEM_LIST_HEARTED_POSTS,
                data: item._id,
              })
            );

            dispatch(
              _postActivity({
                type: ADD_ITEM_POST_ACTIVITY,
                data: item,
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

        setHeartsCount(data.hearts_count);
      });
      return () => {
        socket.off("update-likes-post");
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

  const handleClickHeart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/hearts`,
        {
          postID: item._id,
        }
      );

      setIsLoading(false);
      setHeartsCount(res.data.data.hearts_count);
      if (res.data.message === "create_success") {
        dispatch(
          _listHeartedPosts({
            type: ADD_ITEM_LIST_HEARTED_POSTS,
            data: item._id,
          })
        );

        dispatch(
          _postActivity({
            type: ADD_ITEM_POST_ACTIVITY,
            data: item,
          })
        );

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
      } else if (res.data.message === "delete_success") {
        dispatch(
          _listHeartedPosts({
            type: REMOVE_ITEM_LIST_HEARTED_POSTS,
            data: item._id,
          })
        );
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
        onClick={() => handleClickHeart()}
        sx={{
          opacity: isLoading ? 0.7 : 1,
          pointerEvents: isLoading ? "none" : "visible",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: "5px",
          cursor: "pointer",
          color: isHearted
            ? "#fb9fa1"
            : (theme) => theme.palette.text.color.first,
          "&:hover": {
            color: "#fb9fa1",
            "& .icon": {
              backgroundColor: (theme) =>
                theme.palette.button.background.iconHeart,
              color: "#fb9fa1",
            },
          },
        }}
      >
        <Box
          sx={{
            fontSize: "inherit",
            fontSize: "1.4rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Box
            className="icon"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {isHearted ? (
              <FavoriteIcon
                sx={{
                  color: "#fb9fa1",
                }}
              />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Box>
          {heartsCount} Likes
        </Box>
      </Box>
    </>
  );
};
export default memo(Heart);
