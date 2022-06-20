import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

const UsersInRoomRandom = ({ socket }) => {
  const [dataUserWaiting, setDataUserWaiting] = useState({
    boy: 0,
    girl: 0,
    lgbt: 0,
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
    socket.on("update-users-waiting-room-random", (data) => {
      setDataUserWaiting((prev) => ({
        ...prev,
        boy: data.boy,
        girl: data.girl,
        lgbt: data.lgbt,
      }));
    });
  };
  const { boy, girl, lgbt } = dataUserWaiting;
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
        }}
      >
        Hiện đang có {boy} bạn nam, {girl} bạn nữ, {lgbt} bạn LGBT đang trong
        phòng chờ của phòng chat random.
      </Typography>
    </>
  );
};
export default UsersInRoomRandom;
