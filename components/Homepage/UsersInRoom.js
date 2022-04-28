import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
let socket;
const UsersInRoom = () => {
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

    socket.on("update-users-waiting-room", (data) => {
      setDataUserWaiting((prev) => ({
        ...prev,
        boy: data.boy,
        girl: data.girl,
        lgbt: data.lgbt,
      }));
    });
  };
  const { boy, girl, lgbt } = dataUserWaiting;

  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Hiện đang có {boy} bạn nam, {girl} bạn nữ, {lgbt} bạn LGBT đang tham gia
        phòng chat.
      </Typography>
    </>
  );
};
export default UsersInRoom;
