import { Box, Typography, ClickAwayListener } from "@mui/material";
import axios from "axios";
import { memo } from "react";
import { toast } from "react-toastify";

const OptionItem = ({
  item,
  setIsHide,
  setIsLoading,
  isLoading,
  handleClickOpenOptionMenu,
  setIsStatus,
  isStatus,
  setIsOpenOptionMenu,
}) => {
  const handleClickDeletePost = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/delete`,
        {
          postID: item._id,
        }
      );

      setIsHide(true);
      setIsOpenOptionMenu(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleClickLockPost = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/set-status`,
        {
          postID: item._id,
          status: !isStatus,
        }
      );

      setIsStatus(!isStatus);
      setIsOpenOptionMenu(false);
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
      <ClickAwayListener onClickAway={handleClickOpenOptionMenu}>
        <Box
          sx={{
            zIndex: 1,
            cursor: "pointer",
            marginBottom: "5px",
            position: "absolute",
            backgroundColor: "#ffffff",

            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: "90%",
            bottom: "30px",
            right: 10,
            borderRadius: "5px",
            boxShadow: "1px 7px 11px 0px #cccccc82",
          }}
        >
          <Typography
            onClick={() => handleClickDeletePost()}
            sx={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              padding: "10px",

              "&:hover": {
                backgroundColor: "#e8ecf9",
              },
            }}
          >
            Delete this post
          </Typography>
          <Typography
            onClick={() => handleClickLockPost()}
            sx={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              padding: "10px",

              "&:hover": {
                backgroundColor: "#e8ecf9",
              },
            }}
          >
            {!isStatus ? "Unlock this post" : "Lock this post"}
          </Typography>
        </Box>
      </ClickAwayListener>
    </>
  );
};
export default memo(OptionItem);
