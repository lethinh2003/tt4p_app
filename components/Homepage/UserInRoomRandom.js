import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import socketIOClient from "socket.io-client";
let socket;
const UsersInRoomRandom = () => {
  const [dataUserWaiting, setDataUserWaiting] = useState({
    boy: 0,
    girl: 0,
    lgbt: 0,
  });
  useEffect(() => {
    socketInitializer();
    return () => {
      socket.disconnect();
    };
  }, []);
  const socketInitializer = async () => {
    socket = socketIOClient.connect(process.env.ENDPOINT_SERVER);

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
