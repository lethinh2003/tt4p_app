import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getUser } from "../../redux/actions/getUser";
import { toast } from "react-toastify";

const AccountMobile = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  const dataUser = useSelector((state) => state.user.data);
  const requestingGetUser = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);

  useEffect(() => {
    if (status === "authenticated" && !dataUser) {
      dispatch(getUser(session.user.account));
    }
  }, []);
  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);
  const AvatarProfile = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-root": {
      border: `3px solid ${theme.palette.border.feeds}`,
    },
  }));

  return (
    <>
      {dataUser && (
        <AvatarProfile alt={dataUser.data.name} src={dataUser.data.avatar} />
      )}
    </>
  );
};
export default AccountMobile;
