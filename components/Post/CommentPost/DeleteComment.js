import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getListCommentsLoading } from "../../../redux/actions/getListCommentsLoading";
const DeleteComment = ({ socket, item, setDataItem, setIsLoadingOption }) => {
  const dispatch = useDispatch();
  const handleClickDelete = async (item) => {
    try {
      dispatch(getListCommentsLoading(item._id));
      setIsLoadingOption(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/comments/delete/${item._id}`,
        {
          userId: item.user[0]._id,
        }
      );

      if (socket) {
        const data = {
          room: `post_${res.data.data.post[0]}`,
        };

        socket.emit("create-post-comment", data);
      }
      dispatch(getListCommentsLoading(item._id));
      setIsLoadingOption(false);
    } catch (err) {
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
