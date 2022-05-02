import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Typography, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/getAllUsers";
import useModal from "../../utils/useModal";
import InfoUserDialog from "./InfoUserDialog";
let socket;
const Users = () => {
  const { data: session, status } = useSession();
  const { isShow: isShowUser, toggle: toggleShowUser } = useModal();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const handleClickShowUser = (user) => {
    setUser(user);
    toggleShowUser();
  };
  const dataGetAllUsers = useSelector((state) => state.allUsers.data);
  const requestingGetAllUsers = useSelector(
    (state) => state.allUsers.requesting
  );
  const errorGetAllUsers = useSelector((state) => state.allUsers.error);
  const errorMessageGetAllUsers = useSelector(
    (state) => state.allUsers.message
  );

  const UserComponent = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",

    "& .avatar": {
      width: "70px",
      height: "70px",
      borderRadius: "10px",
      border: "2px solid",
    },

    "& .account": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      "&.admin": {
        color: "red",
      },
      "&.banned": {
        textDecoration: "line-through",
      },
    },
  }));
  return (
    <>
      {isShowUser && (
        <InfoUserDialog
          user={user}
          isShow={isShowUser}
          toggle={toggleShowUser}
        />
      )}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          alignSelf: "flex-start",
        }}
      >
        Nguời dùng
      </Typography>
      <Box
        sx={{
          minHeight: "300px",
          borderRadius: "10px",
          border: "2px solid",
          height: "100%",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            padding: "10px",

            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {requestingGetAllUsers && (
            <>
              {Array.from({ length: 5 }).map((item, i) => (
                <Skeleton key={i} animation="wave" height={20} />
              ))}
            </>
          )}
          {!requestingGetAllUsers &&
            dataGetAllUsers &&
            dataGetAllUsers.map((item, i) => (
              <UserComponent key={i}>
                <Box className="avatar">
                  <Image
                    src={
                      item.sex === "boy"
                        ? "https://i.imgur.com/yFYUbLZ.png"
                        : "https://i.imgur.com/Or9WeCe.png"
                    }
                    width={70}
                    height={70}
                  />
                </Box>

                <Typography
                  className={
                    item.role === "admin"
                      ? "admin account"
                      : item.status === false
                      ? "banned account"
                      : "account"
                  }
                >
                  {item.account}
                </Typography>
                <IconButton onClick={() => handleClickShowUser(item)}>
                  <SearchIcon />
                </IconButton>
              </UserComponent>
            ))}
        </Box>
      </Box>
    </>
  );
};
export default Users;
