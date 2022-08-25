import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { memo, useState, useContext } from "react";
import SocketContext from "../../../contexts/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AvatarUser from "../../Homepage/AvatarUser";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_ITEM_LIST_FOLLOWINGS,
  REMOVE_ITEM_LIST_FOLLOWINGS,
} from "../../../redux/actions/constants";
import { _listFollowings } from "../../../redux/actions/_listFollowings";
const Item = ({ item, session, account }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const dataUserFollowing = useSelector((state) => state.userFollowing);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOptionMenu, setIsOpenOptionMenu] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [message, setMessage] = useState("Unfollow");
  useEffect(() => {
    if (dataUserFollowing) {
      if (dataUserFollowing.includes(item.following._id)) {
        setMessage("Unfollow");
      } else {
        setMessage("Follow");
      }
    }
  }, [dataUserFollowing]);
  const handleClickFollow = async () => {
    try {
      setMessage("Loading");
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/follows`,
        {
          userId: item.following._id,
        }
      );
      if (res.data.code === 1) {
        const sendNotify = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies`,
          {
            user_send: session.user.id,
            user_receive: item.following._id,
            user: session.user.id,
            type: "follow",
            content: `${session.user.account} đã bắt đầu theo dõi bạn!`,
          }
        );
        socket.emit("inc-notify-number", {
          account: item.following.account,
          number: 1,
        });
        setMessage("Unfollow");
        toast.info("Follow success");
        dispatch(
          _listFollowings({
            type: ADD_ITEM_LIST_FOLLOWINGS,
            data: item.following._id,
          })
        );
      } else {
        const deleteNotify = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete`,
          {
            user_send: session.user.id,
            user_receive: item.following._id,
            user: session.user.id,
            type: "follow",
          }
        );
        setMessage("Follow");
        toast.info("Unfollow success");
        dispatch(
          _listFollowings({
            type: REMOVE_ITEM_LIST_FOLLOWINGS,
            data: item.following._id,
          })
        );
      }
      setIsLoading(false);
    } catch (err) {
      setMessage("Unfollow");
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      {!isHide && session && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            position: "relative",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? "0.5" : "1",
          }}
        >
          <Box
            sx={{
              textAlign: "center",

              height: "250px",
              overflowWrap: "break-word",
              border: (theme) => `2px solid ${theme.palette.border.dialog}`,
              backgroundColor: (theme) =>
                theme.palette.sidebar.background.default,
              borderRadius: "30px",

              fontSize: "3rem",
              color: "#ffffff",

              fontWeight: "bold",
              padding: "20px",

              "&:hover": {
                border: (theme) =>
                  `2px solid ${theme.palette.border.dialogHover}`,
              },
            }}
          >
            <Box sx={{}}>
              <AvatarUser
                user={item.following}
                sx={{
                  width: "100px",
                  height: "100px",
                  maxWidth: "100px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                {item.following.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{item.following.account}
              </Typography>
            </Box>
            {session.user.account === account.account && (
              <Button onClick={() => handleClickFollow()}>{message}</Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(Item);
