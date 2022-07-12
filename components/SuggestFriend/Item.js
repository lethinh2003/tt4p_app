import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { Oval } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _listFollowings } from "../../redux/actions/_listFollowings";
import {
  ADD_ITEM_LIST_FOLLOWINGS,
  REMOVE_ITEM_LIST_FOLLOWINGS,
} from "../../redux/actions/constants";
import AvatarUser from "../Homepage/AvatarUser";
const Item = ({ item, session, socket }) => {
  const dispatch = useDispatch();
  const dataUserFollowing = useSelector((state) => state.userFollowing);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(<Oval width={20} />);
  useEffect(() => {
    if (dataUserFollowing) {
      if (dataUserFollowing.includes(item._id)) {
        setMessage("Unfollow");
      } else {
        setMessage("Follow");
      }
    }
  }, [dataUserFollowing]);

  const handleClickFollow = async (item) => {
    try {
      setMessage("Loading");
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/follows`,
        {
          userId: item._id,
        }
      );
      if (res.data.code === 1) {
        const sendNotify = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies`,
          {
            user_send: session.user.id,
            user_receive: item._id,
            user: session.user.id,
            type: "follow",
            content: `${session.user.account} đã bắt đầu theo dõi bạn!`,
          }
        );
        socket.emit("inc-notify-number", {
          account: item.account,
          number: 1,
        });
        setMessage("Unfollow");
        toast.info("Follow success");
        dispatch(
          _listFollowings({
            type: ADD_ITEM_LIST_FOLLOWINGS,
            data: item._id,
          })
        );
      } else {
        const deleteNotify = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete`,
          {
            user_send: session.user.id,
            user_receive: item._id,
            user: session.user.id,
            type: "follow",
          }
        );
        setMessage("Follow");
        toast.info("Unfollow success");
        dispatch(
          _listFollowings({
            type: REMOVE_ITEM_LIST_FOLLOWINGS,
            data: item._id,
          })
        );
      }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <AvatarUser user={item} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.color.first,
              }}
            >
              {item.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: (theme) => theme.palette.text.color.second,
              }}
            >
              @{item.account}
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            pointerEvents: isLoading ? "none" : "visible",
            opacity: isLoading ? 0.6 : 1,
          }}
          onClick={() => handleClickFollow(item)}
        >
          {isLoading && <>{/* <Oval width={15} /> */}</>}
          {message}
        </Button>
      </Box>
    </>
  );
};
export default memo(Item);
