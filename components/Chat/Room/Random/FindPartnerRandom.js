import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { getUser } from "../../redux/actions/getUser";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import useLoading from "../../utils/useLoading";
import Loading from "../Loading/Loading";
import Chat from "./Chat";
import Partner from "./Partner";
import YourSelf from "./YourSelf";
import CountUp from "react-countup";

let socket;
const FindPartnerRandom = () => {
  const TimeIntervalFindPartner = useRef(null);
  const TimeOutFindPartner = useRef(null);
  const TimeIntervalBannedAccount = useRef(null);
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
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (data && data.data) {
      setUser(data.data);
      if (socket) {
        socket.emit("join-room-unique-account", data.data.account);
      }
      if (data.data.status === false) {
        dispatch(getToggleBanned(true));
        if (socket) {
          socket.disconnect();
        }
      }
    }
  }, [data]);
  useEffect(() => {
    return () => clearInterval(TimeIntervalFindPartner.current);
  }, []);
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
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("banned-account", async (status) => {
        if (isWaitingRoom && !isInRoom) {
          await socket.emit("out-waiting-room");
        } else if (isWaitingRoom && isInRoom && partner) {
          await socket.emit("out-chat-room", partner);
        }
        setIsWaitingRoom(false);
        setIsInRoom(false);

        dispatch(getToggleBanned(!status));
      });
      return () => {
        socket.off("banned-account");
      };
    }
  }, [partner, isWaitingRoom, isInRoom]);
  useEffect(() => {
    if (socket) {
      socket.on("send-noti-disconnected-for-partner", (message) => {
        console.log(message);
        toast.info(message);
      });

      socket.on("out-chat-room-for-partner", (partner) => {
        console.log("vcl nha thinh l");
        socket.emit("out-chat-room", partner);
        setIsWaitingRoom(false);
        setIsInRoom(false);
      });
    }
  }, [partner]);
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
        // toast.error(data.message);
      }
    });

    socket.on("join-room-for-partner", (data) => {
      //data: data partner
      socket.emit("join-room-for-partner", data.user);
    });

    socket.on("send-noti-disconnected-for-partner", (message) => {
      console.log(message);
      toast.info(message);
    });

    socket.on("disconnected-for-partner", () => {
      setIsWaitingRoom(false);
      setIsInRoom(false);
    });
    socket.on("send-disconnected-for-partner", (data) => {
      socket.emit("receive-disconnected-for-partner", data);
    });
    socket.on("find-partner-success", (data) => {
      clearInterval(TimeIntervalFindPartner.current);
      if (session && session.user) {
        setIsInRoom(true);
        let message = data.message;
        if (data.user.account === session.user.account) {
          const userPartner = data.partner;

          setPartner(userPartner);
          message = message.replace(
            message,
            `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
          );
        } else {
          const userPartner = data.user;
          setPartner(userPartner);
          message = message.replace(
            message,
            `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
          );
        }
        toast.success(message);
      }
    });
  };

  const handleClickJoinWaitingRoom = async () => {
    if (getToggleStatusBanned) {
      toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
    } else {
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
          "Tham gia vào phòng chờ thành công. Đang tiến hành tìm đối phương!"
        );
        TimeIntervalFindPartner.current = setInterval(() => {
          socket.emit("find-partner-random", user);
        }, 2000);
        setIsLoading(false);
        setIsWaitingRoom(true);
      } catch (err) {
        setIsLoading(false);

        if (err.response) {
          if (err.response.data.message.name === "TokenExpiredError") {
            toast.error("Tài khoản hết hạn! Vui lòng đăng nhập lại!");
            signOut();
          }
          toast.error(err.response.data.message);
        }
      }
    }
  };
  const handleClickOutWaitingRoom = async () => {
    clearInterval(TimeIntervalFindPartner.current);
    if (getToggleStatusBanned) {
      toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
    } else {
      await socket.emit("out-waiting-room");
      setIsWaitingRoom(false);
      setIsInRoom(false);
    }
  };

  const handleClickFindPartner = () => {
    if (getToggleStatusBanned) {
      toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
    } else {
      setIsLoading(true);
      socket.emit("find-partner", user);
    }
  };
  const handleTimeoutFindPartner = () => {
    handleClickOutWaitingRoom();
  };

  return (
    <>
      {requesting && <ThreeDots fill="#06bcee" />}
      {!requesting && data && data.data && (
        <>
          <Loading isLoading={isLoading} />

          <YourSelf user={user} />
          {!isError && !getToggleStatusBanned && (
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
                      <Box
                        sx={{
                          cursor: "pointer",
                          minWidth: "80px",
                          border: (theme) =>
                            `3px solid ${theme.palette.border.feeds}`,

                          borderRadius: "10px",
                          overflow: "hidden",
                          boxShadow: (theme) =>
                            `0px 3px 20px 6px ${theme.palette.feeds.boxShadow}`,
                          display: "flex",
                          fontSize: "3rem",
                          color: "#ffffff",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          padding: "20px",

                          color: (theme) => theme.palette.text.color.second,
                        }}
                      >
                        <CountUp
                          end={30}
                          duration={50}
                          onEnd={() => handleTimeoutFindPartner()}
                        />
                      </Box>
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
export default FindPartnerRandom;
