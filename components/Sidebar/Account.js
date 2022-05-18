import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getUser } from "../../redux/actions/getUser";
import { toast } from "react-toastify";

const Account = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const isOpenSetting = useSelector((state) => state.toggleSetting.on);
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);
  const dataUser = useSelector((state) => state.user.data);
  const requestingGetUser = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);
  console.log("data user", dataUser);
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
              paddingLeft: "20px",
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
              paddingLeft: "20px",
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
