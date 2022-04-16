import { Box, Button, Typography, Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import socketIOClient from "socket.io-client";
import Chat from "./Chat";
let socket;
const FindPartner = () => {
  const TimeOutFindPartner = useRef(null);
  const { data: session, status } = useSession();
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [partner, setPartner] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    socketInitializer();
    if (status === "authenticated") {
      const user = {
        account: session.user.account,
        name: session.user.name,
        id: session.user.id,
        sex: session.user.sex,
        findSex: session.user.findSex,
        city: session.user.city,
      };
      setUser(user);
    }
    return () => {
      socket.disconnect();
      clearTimeout(TimeOutFindPartner.current);
    };
  }, [status]);
  useEffect(() => {
    if (status === "authenticated") {
      // socket.emit("check-user-in-room", user);
      console.log(user);
    }
  }, [user]);
  useEffect(() => {
    if (status === "authenticated" && !isWaitingRoom) {
      // checkUserInRoom();
    }
  }, [session]);
  const checkUserInRoom = async () => {
    try {
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/check-in-room`,
        {
          account: session.user.account,
        }
      );
      console.log(res.data.message);

      setIsError(false);
    } catch (err) {
      if (err.response) {
        setIsError(true);
        toast.error(err.response.data.message);
      }
    }
  };
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
        console.log(userPartner);
        setPartner(userPartner);
        message = message.replace(
          "$name",
          `Họ tên: ${data.partner.name}, giới tính: ${data.partner.sex}, đang sống ở tỉnh/TP: ${data.partner.city} `
        );
      } else {
        const userPartner = data.user;
        console.log(userPartner);
        setPartner(userPartner);
        message = message.replace(
          "$name",
          `Họ tên: ${data.user.name}, giới tính: ${data.user.sex}, đang sống ở tỉnh/TP: ${data.user.city} `
        );
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
          account: session.user.account,
        }
      );
      socket.emit("join-list-users", user);
      toast.info(
        "Tham gia vào phòng chờ thành công, Lưu ý rằng bạn sẽ nhận được ghép đôi bất cứ lúc nào khi còn đang trong phòng chờ! Bạn hãy nhấn vào Tìm bạn thui để tìm nhaa"
      );
      setIsLoading(false);
      setIsWaitingRoom(true);
      // setIsError(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        // setIsError(true);
        toast.error(err.response.data.message);
      }
    }
  };
  const handleClickOutWaitingRoom = () => {
    socket.emit("out-waiting-room");
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };
  const handleClickOutChatRoom = () => {
    socket.emit("out-chat-room", partner);
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };
  const handleClickFindPartner = () => {
    setIsLoading(true);

    socket.emit("find-partner", user);
  };
  const convertDay = (day) => {
    let weekDay = "";
    let dayNum = day;
    dayNum = dayNum + 1;
    if (dayNum == 7) {
      weekDay = "chủ nhật";
    } else {
      weekDay = `thứ ${dayNum}`;
    }
    return weekDay;
  };

  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "100%",
    maxHeight: "600px",
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
      {session && session.user && (
        <BoxWrapper>
          {isLoading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <BoxLoading>
                <Image
                  src={"https://i.imgur.com/VdhhRt3.gif"}
                  alt="Loading cute"
                  width={150}
                  height={150}
                />
                <LoadingContent>Loading...</LoadingContent>
              </BoxLoading>
            </Backdrop>
          )}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "35px",
              alignSelf: "center",
            }}
          >
            Hôm nay là {convertDay(new Date().getDay())}, thời điểm vàng để tìm
            bạn tâm sự nhaaa
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              alignSelf: "center",
            }}
          >
            Hii {session.user.name}
          </Typography>

          <Box
            sx={{
              position: "relative",
            }}
          >
            {listAvatarChild.map((item, i) => (
              <BoxAvatarChild key={i} className={`tt-${i + 1}`}>
                <Image
                  src={item.img}
                  alt="Avatar cute"
                  width={200}
                  height={200}
                />
              </BoxAvatarChild>
            ))}

            <BoxAvatar>
              <Image
                src={
                  session.user.sex === "boy"
                    ? "https://i.imgur.com/yFYUbLZ.png"
                    : "https://i.imgur.com/Or9WeCe.png"
                }
                alt="Avatar cute"
                width={200}
                height={200}
              />
            </BoxAvatar>
          </Box>
          {!isError && (
            <>
              {!isWaitingRoom && (
                <ButtonSocialWrapper
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  onClick={() => handleClickJoinWaitingRoom()}
                >
                  Vào phòng chờ!!
                </ButtonSocialWrapper>
              )}

              {isWaitingRoom && (
                <>
                  {!isInRoom && (
                    <>
                      <ButtonSocialWrapper
                        as={motion.div}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        onClick={() => handleClickFindPartner()}
                      >
                        Tìm bạn thui!!
                      </ButtonSocialWrapper>
                      <ButtonSocialWrapper
                        as={motion.div}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        onClick={() => handleClickOutWaitingRoom()}
                      >
                        Thoát phòng chờ!!
                      </ButtonSocialWrapper>
                    </>
                  )}

                  {isInRoom && (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          alignSelf: "center",
                        }}
                      >
                        Bạn {partner.name}
                      </Typography>

                      <BoxAvatar>
                        <Image
                          src={
                            partner.sex === "boy"
                              ? "https://i.imgur.com/yFYUbLZ.png"
                              : "https://i.imgur.com/Or9WeCe.png"
                          }
                          alt="Avatar cute"
                          width={200}
                          height={200}
                        />
                      </BoxAvatar>

                      <ButtonSocialWrapper
                        as={motion.div}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        onClick={() => handleClickOutChatRoom()}
                      >
                        Thoát chat!!
                      </ButtonSocialWrapper>
                      <Chat socket={socket} partner={partner} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </BoxWrapper>
      )}
    </>
  );
};
export default FindPartner;
