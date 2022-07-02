import { Avatar, Box, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getUser } from "../../redux/actions/getUser";
import { getListFollowings } from "../../redux/actions/getListFollowings";
import { getListHeartedPosts } from "../../redux/actions/getListHeartedPosts";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getMessagesCount } from "../../redux/actions/getMessagesCount";
import { getPartnersCount } from "../../redux/actions/getPartnersCount";
import { BigHead } from "@bigheads/core";
import SocketContext from "../../contexts/socket";
import { getUsersOnline } from "../../redux/actions/getUsersOnline";

import {
  GET_MESSAGES_COUNT,
  INC_MESSAGES_COUNT,
  GET_PARTNERS_COUNT,
  INC_PARTNERS_COUNT,
  GET_USERS_ONLINE,
} from "../../redux/actions/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useRef } from "react";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const Account = () => {
  const socket = useContext(SocketContext);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const countCallApi = useRef(1);
  const countCallApiGetUser = useRef(1);
  const dataUser = useSelector((state) => state.user.data);
  const dataUserFollowings = useSelector((state) => state.userFollowing);
  const dataUserHearts = useSelector((state) => state.userHearted);
  const requestingGetUser = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  useEffect(() => {
    if (socket) {
      socketInit();
      return () => {
        socket.off("users-online");
      };
    }
  }, [socket]);
  const socketInit = () => {
    socket.on("users-online", (data) => {
      console.log("userss online", data);
      dispatch(
        getUsersOnline({
          type: GET_USERS_ONLINE,
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
        const listFollowings = dataUser.data.following;
        listFollowings.forEach((item, i) => {
          dispatch(
            getListFollowings({
              type: "GET_LIST_FOLLOWINGS",
              data: item,
            })
          );
        });
      }
      dispatch(
        getMessagesCount({
          type: GET_MESSAGES_COUNT,
          data: dataUser.data.messages,
        })
      );
      dispatch(
        getPartnersCount({
          type: GET_PARTNERS_COUNT,
          data: dataUser.data.partners,
        })
      );
      //Get List Posts Hearted
      if (dataUserHearts.length === 0 && countCallApi.current === 1) {
        getListHearted();
      }
    }
  }, [dataUser]);
  const getListHearted = async () => {
    try {
      countCallApi.current = 2;
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/hearts/${dataUser.data._id}`
      );
      const listHearteds = res.data.data;
      listHearteds.forEach((item, i) => {
        dispatch(
          getListHeartedPosts({
            type: "GET_LIST_HEARTED_POSTS",
            data: item.post[0],
          })
        );
      });
    } catch (err) {
      countCallApi.current = 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  console.log("render-account");
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      {dataUser && (
        <Box>
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
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",

                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden",
                  border: "2px solid #23303a",
                  boxShadow: "0px 3px 15px 0px #23303a",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50px",
                  }}
                >
                  <BigHead
                    accessory={dataUser.data.avatarSVG.accessory}
                    body={dataUser.data.avatarSVG.body}
                    circleColor={dataUser.data.avatarSVG.circleColor}
                    clothing={dataUser.data.avatarSVG.clothing}
                    clothingColor={dataUser.data.avatarSVG.clothingColor}
                    eyebrows={dataUser.data.avatarSVG.eyebrows}
                    eyes={dataUser.data.avatarSVG.eyes}
                    faceMask={dataUser.data.avatarSVG.faceMask}
                    faceMaskColor={dataUser.data.avatarSVG.faceMaskColor}
                    facialHair={dataUser.data.avatarSVG.facialHair}
                    graphic={dataUser.data.avatarSVG.graphic}
                    hair={dataUser.data.avatarSVG.hair}
                    hairColor={dataUser.data.avatarSVG.hairColor}
                    hat={dataUser.data.avatarSVG.hat}
                    hatColor={dataUser.data.avatarSVG.hatColor}
                    lashes={dataUser.data.avatarSVG.lashes}
                    lipColor={dataUser.data.avatarSVG.lipColor}
                    mask={dataUser.data.avatarSVG.mask}
                    mouth={dataUser.data.avatarSVG.mouth}
                    skinTone={dataUser.data.avatarSVG.skinTone}
                  />
                </Box>
              </Box>
            </StyledBadge>
            {/* <AvatarProfile
              alt={dataUser.data.name}
              src={dataUser.data.avatar}
            /> */}
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
          </Box>
        </Box>
      )}
    </>
  );
};
export default Account;
