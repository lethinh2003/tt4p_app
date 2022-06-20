import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getUser } from "../../redux/actions/getUser";
import { getListFollowings } from "../../redux/actions/getListFollowings";
import { getListHeartedPosts } from "../../redux/actions/getListHeartedPosts";
import { toast } from "react-toastify";
import axios from "axios";

const Account = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state.user.data);
  const requestingGetUser = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);

  useEffect(() => {
    if (status === "authenticated" && !dataUser) {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);
  useEffect(() => {
    if (dataUser) {
      const listFollowings = dataUser.data.following;

      listFollowings.forEach((item, i) => {
        dispatch(
          getListFollowings({
            type: "GET_LIST_FOLLOWINGS",
            data: item,
          })
        );
      });
      getListHearted();
    }
  }, [dataUser]);
  const getListHearted = async () => {
    try {
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
            <AvatarProfile
              alt={dataUser.data.name}
              src={dataUser.data.avatar}
            />
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
