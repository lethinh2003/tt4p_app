import { Box, Typography, ClickAwayListener } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SocketContext from "../../contexts/socket";
import MenuAccount from "./MenuAccount";
import {
  SET_LIST_FOLLOWINGS,
  GET_MESSAGES_COUNT,
  GET_PARTNERS_COUNT,
  GET_USERS_ONLINE,
  SET_LIST_HEARTED_POSTS,
  SET_MESSAGES_COUNT,
  SET_PARTNERS_COUNT,
  SET_LIST_USERS_ONLINE,
  SET_POST_ACTIVITY,
} from "../../redux/actions/constants";
import { _listFollowings } from "../../redux/actions/_listFollowings";
import { _listHeartedPosts } from "../../redux/actions/_listHeartedPosts";
import { _messagesCount } from "../../redux/actions/_messagesCount";
import { _partnersCount } from "../../redux/actions/_partnersCount";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getUser } from "../../redux/actions/getUser";
import { _listUsersOnline } from "../../redux/actions/_listUsersOnline";
import { _postActivity } from "../../redux/actions/_postActivity";
import AvatarUser from "../Homepage/AvatarUser";
import { IoIosArrowForward } from "react-icons/io";
const Account = () => {
  const socket = useContext(SocketContext);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const setIntervalJoinUserOnline = useRef(null);
  const countCallApi = useRef(1);
  const countCallApiGetPostActivity = useRef(1);
  const countCallApiGetUser = useRef(1);
  const dataUser = useSelector((state) => state.user.data);
  const dataUserFollowings = useSelector((state) => state.userFollowing);
  const dataUserPostActivity = useSelector((state) => state.postActivity);
  const dataUserHearts = useSelector((state) => state.userHearted);
  const requestingGetUser = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const [isOpenMenuOptions, setIsOpenMenuOptions] = useState(false);
  useEffect(() => {
    if (socket) {
      socketInit();
      return () => {
        socket.off("users-online");
        clearInterval(setIntervalJoinUserOnline.current);
      };
    }
  }, [socket]);
  const socketInit = () => {
    if (status === "authenticated") {
      const dataSend = {
        _id: session.user.id,
        account: session.user.account,
      };
      socket.emit("join-user-online", dataSend);
      setIntervalJoinUserOnline.current = setInterval(() => {
        socket.emit("join-user-online", dataSend);
      }, 1000 * 60 * 1);
    }
    socket.on("users-online", (data) => {
      dispatch(
        _listUsersOnline({
          type: SET_LIST_USERS_ONLINE,
          data,
        })
      );
    });
  };
  useEffect(() => {
    if (
      status === "authenticated" &&
      !dataUser &&
      countCallApiGetUser.current === 1
    ) {
      countCallApiGetUser.current = 2;
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (errorGetUser) {
      countCallApiGetUser.current = 1;
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);
  useEffect(() => {
    if (dataUser) {
      //Banned account
      if (dataUser.data.status === false) {
        dispatch(getToggleBanned(true));
      }
      //Get List Users Following
      if (dataUserFollowings.length === 0) {
        const listFollowingsData = dataUser.data.following;
        dispatch(
          _listFollowings({
            type: SET_LIST_FOLLOWINGS,
            data: listFollowingsData,
          })
        );
      }
      dispatch(
        _messagesCount({
          type: SET_MESSAGES_COUNT,
          data: dataUser.data.messages,
        })
      );
      dispatch(
        _partnersCount({
          type: SET_PARTNERS_COUNT,
          data: dataUser.data.partners,
        })
      );
      //Get List Posts Hearted
      if (dataUserHearts.length === 0 && countCallApi.current === 1) {
        getListHearted();
      }
      if (!dataUserPostActivity && countCallApiGetPostActivity.current === 1) {
        getPostActivity();
      }
    }
  }, [dataUser]);
  const getListHearted = async () => {
    try {
      countCallApi.current = 2;
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/hearts/${dataUser.data._id}`
      );
      const resData = res.data.data;
      let listHearteds = [];
      resData.forEach((item, i) => {
        listHearteds.push(item.post[0]);
      });
      dispatch(
        _listHeartedPosts({
          type: SET_LIST_HEARTED_POSTS,
          data: listHearteds,
        })
      );
    } catch (err) {
      countCallApi.current = 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const getPostActivity = async () => {
    try {
      countCallApiGetPostActivity.current = 2;
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/posts/activities/${dataUser.data._id}`
      );
      const resData = res.data.data;
      if (resData.length > 0) {
        dispatch(
          _postActivity({
            type: SET_POST_ACTIVITY,
            data: resData[0].post[0],
          })
        );
      }
    } catch (err) {
      countCallApiGetPostActivity.current = 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleClickOpenMenuOptions = () => {
    setIsOpenMenuOptions(!isOpenMenuOptions);
  };

  return (
    <>
      {dataUser && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
              paddingLeft: "40px",
              paddingBottom: "20px",
            }}
          >
            Account
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "40px",
              width: "100%",
              gap: "10px",
            }}
          >
            <AvatarUser user={dataUser.data} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
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
                  }}
                >
                  {dataUser.data.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: (theme) => theme.palette.text.color.second,
                  }}
                >
                  @{dataUser.data.account}
                </Typography>
              </Box>
              <IoIosArrowForward
                onClick={() => handleClickOpenMenuOptions()}
                style={{
                  fontSize: "2rem",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          {isOpenMenuOptions && (
            <MenuAccount
              setIsOpenMenuOptions={setIsOpenMenuOptions}
              session={session}
            />
          )}
        </Box>
      )}
    </>
  );
};
export default Account;
