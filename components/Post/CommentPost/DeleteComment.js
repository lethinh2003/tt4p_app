import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { _listCommentsLoading } from "../../../redux/actions/_listCommentsLoading";
import {
  DELETE_POST_COMMENTS,
  REMOVE_ITEM_LIST_COMMENTS_LOADING,
  ADD_ITEM_LIST_COMMENTS_LOADING,
} from "../../../redux/actions/constants";
import { _listPostComments } from "../../../redux/actions/_listPostComments";
const DeleteComment = ({ socket, item, setDataItem, setIsLoadingOption }) => {
  const dispatch = useDispatch();
  const handleClickDelete = async (item) => {
    try {
      dispatch(
        _listCommentsLoading({
          type: ADD_ITEM_LIST_COMMENTS_LOADING,
          data: item._id,
        })
      );
      setIsLoadingOption(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/delete/${item._id}`,
        {
          userId: item.user[0]._id,
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
            setDataItem("");
            dispatch(
              _listCommentsLoading({
                type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
                data: item._id,
              })
            );
            setIsLoadingOption(false);
          } else {
            toast.error("Lỗi hệ thống");
            setIsLoadingOption(false);
          }
        });
      }
    } catch (err) {
      dispatch(
        _listCommentsLoading({
          type: REMOVE_ITEM_LIST_COMMENTS_LOADING,
          data: item._id,
        })
      );
      setIsLoadingOption(false);
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
            backgroundColor: "#e8ecf9",
          },
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.text.color.second,
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
