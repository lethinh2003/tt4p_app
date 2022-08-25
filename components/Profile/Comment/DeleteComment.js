import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { _listCommentsLoading } from "../../../redux/actions/_listCommentsLoading";
import {
  DELETE_POST_COMMENTS,
  REMOVE_ITEM_LIST_COMMENTS_LOADING,
  ADD_ITEM_LIST_COMMENTS_LOADING,
} from "../../../redux/actions/constants";
import { _listPostComments } from "../../../redux/actions/_listPostComments";
import SocketContext from "../../../contexts/socket";
const DeleteComment = ({ item, setIsLoading, setIsHide }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const handleClickDelete = async (item) => {
    try {
      setIsLoading(true);
      dispatch(
        _listCommentsLoading({
          type: ADD_ITEM_LIST_COMMENTS_LOADING,
          data: item._id,
        })
      );

      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/delete/${item._id}`,
        {
          userId: item.user[0]._id,
        }
      );

      const deleteNotify = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete`,
        {
          user_send: item.user[0]._id,
          user_receive: item.post[0].user[0],
          post: item.post[0]._id,
          post_comment: item._id,
          type: "comment_post",
        }
      );

      if (socket) {
        const data = {
          room: `post_comment_${item._id}`,
          commentId: item._id,
        };
        socket.emit("delete-post-rep-comment", data, (res) => {
          if (res.status === "ok") {
            if (item.rep_comments.length > 0) {
              item.rep_comments.forEach((item) => {
                dispatch(
                  _listPostComments({
                    type: DELETE_POST_COMMENTS,
                    data: item,
                  })
                );
              });
              const dataUpdate = {
                room: `post_comment_${item._id}`,
                commentId: item._id,
                item: item,
              };
              socket.emit("update-post-comments", dataUpdate);
            }
            dispatch(
              _listPostComments({
                type: DELETE_POST_COMMENTS,
                data: item,
              })
            );
            const dataUpdate = {
              room: `post_comment_${item._id}`,
              commentId: item._id,
              item: item,
            };
            socket.emit("update-post-comments", dataUpdate);
            console.log(dataUpdate);
            dispatch(
              _listCommentsLoading({
                type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
                data: item._id,
              })
            );
          } else {
            toast.error("Lỗi hệ thống");
          }
        });
      }
      setIsLoading(false);
      setIsHide(true);
    } catch (err) {
      setIsLoading(false);
      dispatch(
        _listCommentsLoading({
          type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
          data: item._id,
        })
      );

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
          padding: "5px",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.button.background.iconOthers,
            color: "#39e58c",
          },
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",

            fontWeight: 600,
          }}
          onClick={() => handleClickDelete(item)}
        >
          Delete
        </Typography>
      </Box>
    </>
  );
};
export default React.memo(DeleteComment);
