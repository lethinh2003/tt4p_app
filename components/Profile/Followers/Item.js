import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { memo, useState, useContext } from "react";
import SocketContext from "../../../contexts/socket";
import { useDispatch, useSelector } from "react-redux";

import AvatarUser from "../../Homepage/AvatarUser";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_ITEM_LIST_FOLLOWINGS,
  REMOVE_ITEM_LIST_FOLLOWINGS,
} from "../../../redux/actions/constants";
const Item = ({ item, session, account }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenOptionMenu, setIsOpenOptionMenu] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [message, setMessage] = useState("Delete");

  const handleClickDeleteFollow = async () => {
    try {
      setMessage("Loading");
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/delete-follows`,
        {
          userId: item.user._id,
        }
      );
      if (res.data.code === 0) {
        const deleteNotify = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/delete`,
          {
            user_send: session.user.id,
            user_receive: item.user._id,
            user: session.user.id,
            type: "follow",
          }
        );
        setMessage("Delete Success");
        toast.info("Delete success");
        dispatch(
          _listFollowings({
            type: REMOVE_ITEM_LIST_FOLLOWINGS,
            data: item.user._id,
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
              cursor: "pointer",
              height: "250px",
              overflowWrap: "break-word",
              border: (theme) => `3px solid ${theme.palette.border.feeds}`,
              backgroundColor: "#ccc",
              borderRadius: "30px",

              fontSize: "3rem",
              color: "#ffffff",

              fontWeight: "bold",
              padding: "20px",
            }}
          >
            <Box sx={{}}>
              <AvatarUser
                user={item.user}
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
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.color.first,
                }}
              >
                {item.user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: (theme) => theme.palette.text.color.second,
                }}
              >
                @{item.user.account}
              </Typography>
            </Box>
            {session.user.account === account.account && (
              <Button onClick={() => handleClickDeleteFollow()}>
                {message}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default memo(Item);
