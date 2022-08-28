import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

const UsersInRoomRandom = ({ socket }) => {
  const [dataUserWaiting, setDataUserWaiting] = useState({
    usersWaiting: 0,
    usersChatting: 0,
  });
  useEffect(() => {
    if (socket) {
      socketInitializer();
    }
    return () => {
      if (socket) {
        socket.off("update-users-waiting-room-random");
      }
    };
  }, [socket]);
  const socketInitializer = () => {
    socket.emit("update-users-chat-room-random");
    socket.on("update-users-waiting-room-random", (data) => {
      setDataUserWaiting((prev) => ({
        ...prev,
        usersWaiting: data.usersWaiting,
        usersChatting: data.usersChatting,
      }));
    });
  };
  const { usersChatting, usersWaiting } = dataUserWaiting;
  const ButtonSocialWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: (theme) => theme.palette.text.color.first,
        }}
      >
        Hiện đang có {usersWaiting} bạn trong phòng chờ, {usersChatting} bạn
        đang tham gia chat.
      </Typography>
    </>
  );
};
export default UsersInRoomRandom;
