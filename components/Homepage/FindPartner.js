import { Backdrop, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { getUser } from "../../redux/actions/getUser";
import Chat from "./Chat";
import Partner from "./Partner";
import YourSelf from "./YourSelf";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
let socket;
const FindPartner = () => {
  const TimeOutFindPartner = useRef(null);
  const { data: session, status } = useSession();
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const [isInRoom, setIsInRoom] = useState(false);
  const [partner, setPartner] = useState();
  const [isHideInfo, setIsHideInfo] = useState(true);

  const [user, setUser] = useState();
  const data = useSelector((state) => state.user.data);
  const requesting = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (data && data.data) {
      setUser(data.data);
    }
  }, [data]);
  useEffect(() => {
    const outChatRoom = async () => {
      if (isWaitingRoom) {
        if (!isInRoom) {
          await socket.emit("out-waiting-room");
          setIsWaitingRoom(false);
          setIsInRoom(false);
        } else {
          await socket.emit("out-chat-room", partner);
          setIsWaitingRoom(false);
          setIsInRoom(false);
        }
      }
    };
    if (socket && isWaitingRoom) {
      outChatRoom();
    }
  }, [requesting]);
  useEffect(() => {
    if (partner) {
      console.log(partner);
      setIsHideInfo(partner.hideInfo);
    }
  }, [partner]);

  useEffect(() => {
    socketInitializer();
    return () => {
      socket.disconnect();
      clearTimeout(TimeOutFindPartner.current);
    };
  }, [status]);
  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);

  const socketInitializer = async () => {
    socket = socketIOClient.connect(process.env.ENDPOINT_SERVER);

    socket.on("find-partner", (data) => {
      setIsLoading(false);

      if (data.status === "fail") {
        toast.error(data.message);
      }
    });

    socket.on("join-room-for-partner", (data) => {
      socket.emit("join-room-for-partner", data.user);
    });

    socket.on("send-noti-disconnected-for-partner", (message) => {
      toast.info(message);
    });

    socket.on("out-chat-room-for-partner", (partner) => {
      socket.emit("out-chat-room", partner);
      setIsWaitingRoom(false);
      setIsInRoom(false);
    });
    socket.on("disconnected-for-partner", () => {
      setIsWaitingRoom(false);
      setIsInRoom(false);
    });
    socket.on("send-disconnected-for-partner", (data) => {
      socket.emit("receive-disconnected-for-partner", data);
    });
    socket.on("find-partner-success", (data) => {
      setIsInRoom(true);
      let message = data.message;
      if (data.user.account === session.user.account) {
        const userPartner = data.partner;

        setPartner(userPartner);
        message = message.replace(
          message,
          `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
        );
        // message = message.replace(
        //   "$name",
        //   `Họ tên: ${data.partner.name}, giới tính: ${data.partner.sex}, ${
        //     new Date().getFullYear() - data.partner.date
        //   } tuổi, đang sống ở tỉnh/TP: ${data.partner.city} `
        // );
      } else {
        const userPartner = data.user;

        setPartner(userPartner);
        message = message.replace(
          message,
          `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
        );
        // message = message.replace(
        //   "$name",
        //   `Họ tên: ${data.user.name}, giới tính: ${data.user.sex}, ${
        //     new Date().getFullYear() - data.partner.date
        //   } tuổi, đang sống ở tỉnh/TP: ${data.user.city} `
        // );
      }
      toast.success(message);
    });
  };

  const handleClickJoinWaitingRoom = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/check-in-room`,
        {
          account: user.account,
        }
      );
      socket.emit("join-list-users", user);
      toast.info(
        "Tham gia vào phòng chờ thành công, Lưu ý rằng bạn sẽ nhận được ghép đôi bất cứ lúc nào khi còn đang trong phòng chờ! Bạn hãy nhấn vào Tìm bạn thui để tìm nhaa"
      );
      setIsLoading(false);
      setIsWaitingRoom(true);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const handleClickOutWaitingRoom = async () => {
    await socket.emit("out-waiting-room");
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };
  const handleClickOutChatRoom = async () => {
    await socket.emit("out-chat-room", partner);
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };
  const handleClickFindPartner = () => {
    setIsLoading(true);
    socket.emit("find-partner", user);
  };

  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "calc(100% - 70px)",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: "20px",
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.button.default,
      opacity: 0.8,
    },
  }));
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
  const BoxAvatar = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "200px",
    fontWeight: "bold",
    height: "200px",
    borderRadius: "50px",
    position: "relative",
    "&::before": {
      borderRadius: "50px",
      border: "2px solid #6edee0",
      position: "absolute",
      content: `""`,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      transform: "scale(1.1)",
    },
  }));
  const BoxAvatarChild = styled(Box)(({ theme }) => ({
    backgroundColor: "#ccc",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "50px",

    fontWeight: "bold",
    height: "50px",
    borderRadius: "5px",
    position: "absolute",
    "&.tt-1": {
      right: "-75px",
      top: "24px",
      backgroundColor: "#e5f99f",
    },
    "&.tt-2": {
      left: "-75px",
      width: "40px",
      height: "40px",
      backgroundColor: "#e5cbd6",
    },
    "&.tt-3": {
      bottom: "33px",
      left: "-65px",
      backgroundColor: "#ccf1fa",
    },
    "&.tt-4": {
      backgroundColor: "#ceafcf",
      bottom: "42px",
      right: "-76px",
      width: "40px",
      height: "40px",
    },
  }));
  const BoxLoading = styled(Box)({
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "700",
    opacity: "0.7",
  });

  const listAvatarChild = [
    {
      img: "https://i.imgur.com/xywmm0q.png",
    },
    {
      img: "https://i.imgur.com/e1i79Gf.png",
    },
    {
      img: "https://i.imgur.com/DdMnBN1.png",
    },
    {
      img: "https://i.imgur.com/meWx1dO.png",
    },
  ];
  return (
    <>
      {requesting && <ThreeDots fill="#06bcee" />}
      {!requesting && data && data.data && (
        <>
          <Loading isLoading={isLoading} />

          <YourSelf user={user} />
          {!isError && (
            <>
              {!isWaitingRoom && (
                <Button
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  onClick={() => handleClickJoinWaitingRoom()}
                >
                  Vào phòng chờ!!
                </Button>
              )}

              {isWaitingRoom && (
                <>
                  {!isInRoom && (
                    <>
                      <Button
                        as={motion.div}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        onClick={() => handleClickFindPartner()}
                      >
                        Tìm bạn thui!!
                      </Button>
                      <Button
                        as={motion.div}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        onClick={() => handleClickOutWaitingRoom()}
                      >
                        Thoát phòng chờ!!
                      </Button>
                    </>
                  )}

                  {isInRoom && (
                    <>
                      <Partner
                        isHideInfo={isHideInfo}
                        setIsHideInfo={setIsHideInfo}
                        socket={socket}
                        partner={partner}
                        user={user}
                        isInRoom={isInRoom}
                        setIsInRoom={setIsInRoom}
                        setIsWaitingRoom={setIsWaitingRoom}
                      />
                      <Chat
                        isHideInfo={isHideInfo}
                        socket={socket}
                        partner={partner}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default FindPartner;
