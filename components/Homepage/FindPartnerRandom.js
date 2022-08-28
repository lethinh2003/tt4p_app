import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { BigHead } from "@bigheads/core";
import { toast } from "react-toastify";
import {
  INC_PARTNERS_COUNT,
  SET_MESSAGES_COUNT,
  SET_PARTNERS_COUNT,
  SET_PARTNER_CHAT_RANDOM,
  INSERT_MESSAGE_CHAT_RANDOM,
  SET_MESSAGES_CHAT_RANDOM,
  SET_STATUS_CHAT_RANDOM,
} from "../../redux/actions/constants";
import { _partner } from "../../redux/actions/_partner";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getUser } from "../../redux/actions/getUser";
import { _messagesCount } from "../../redux/actions/_messagesCount";
import { _partnersCount } from "../../redux/actions/_partnersCount";
import { _messagesRandomChat } from "../../redux/actions/_messagesRandomChat";
import { _statusRandomChat } from "../../redux/actions/_statusRandomChat";
import useLoading from "../../utils/useLoading";
import CountFindPartner from "../Chat/CountFindPartner";
import Loading from "../Loading/Loading";
import Chat from "./Chat";
import PartnerRandom from "./PartnerRandom";
import YourSelf from "./YourSelf";
import Modal from "../Modal/Modal";
const FindPartnerRandom = ({ socket }) => {
  const { data: session, status } = useSession();
  const socketDisconnectNoti = useRef(null);
  const socketDisconnectPartner = useRef(null);
  const TimeIntervalFindPartner = useRef(null);
  const countCallApiCheckUserInRoom = useRef(1);

  const TimeOutFindPartner = useRef(null);
  const [isError, setIsError] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  const [isHideInfo, setIsHideInfo] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUser] = useState();
  const data = useSelector((state) => state.user.data);
  const requesting = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);
  const dataPartner = useSelector((state) => state.partner);
  const statusUserChatRandom = useSelector((state) => state.statusChatRandom);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      socket &&
      countCallApiCheckUserInRoom.current === 1 &&
      statusUserChatRandom === ""
    ) {
      countCallApiCheckUserInRoom.current = 2;
      //
      // checkUserInRoom();
      checkRoom();
    }
  }, [socket]);

  useEffect(() => {
    if (statusUserChatRandom === "waiting") {
      updateStatusUserChatRoom();
    }
  }, []);

  useEffect(() => {
    if (statusUserChatRandom === "multiple-accounts") {
      setIsOpenModal(true);
    }
  }, [statusUserChatRandom]);
  const updateStatusUserChatRoom = async () => {
    try {
      if (socket) {
        socket.emit("out-waiting-room-random-server");
      }
      setIsLoading(true);
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "",
        })
      );
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/chat-rooms/update-status`,
        {
          accountID: session.user.id,
        }
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const checkRoom = async () => {
    try {
      setIsLoading(true);
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "",
        })
      );
      dispatch(
        _messagesRandomChat({
          type: SET_MESSAGES_CHAT_RANDOM,
          data: [],
        })
      );
      dispatch(
        _partner({
          type: SET_PARTNER_CHAT_RANDOM,
          data: null,
        })
      );

      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/chat-rooms/check-room`,
        {
          accountID: session.user.id,
        }
      );
      if (res.data.data.status === "waiting" || res.data.data.partner) {
        dispatch(
          _statusRandomChat({
            type: SET_STATUS_CHAT_RANDOM,
            data: "multiple-accounts",
          })
        );
        setIsLoading(false);
        return;
      }
      if (!res.data.data.partner) {
        socket.emit("join-list-users-random", (res) => {
          if (res.status === "ok") {
            dispatch(
              _partner({
                type: SET_PARTNER_CHAT_RANDOM,
                data: null,
              })
            );
            dispatch(
              _messagesRandomChat({
                type: SET_MESSAGES_CHAT_RANDOM,
                data: [],
              })
            );
            dispatch(
              _statusRandomChat({
                type: SET_STATUS_CHAT_RANDOM,
                data: "waiting",
              })
            );
            toast.info(
              "Tham gia vào phòng chờ thành công. Đang tiến hành tìm đối phương!"
            );
            // socket.emit("find-partner-random");
            TimeIntervalFindPartner.current = setInterval(() => {
              socket.emit("find-partner-random");
            }, 5000);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toast.error("Lỗi hệ thống");
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      countCallApiCheckUserInRoom.current === 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (socket && !data) {
      dispatch(getUser(session.user.account));
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socketInitializer();
    }
    return () => {
      if (socket) {
        socket.off("find-partner-random");
        socket.off("find-partner-success-random");
        socket.off("banned-account");
        socket.off("send-noti-partner-out-chat-room");
        socket.off("send-noti-current-user-out-chat-room");
        socket.off("send-noti-partner-disconnected");
        socket.off("auto-join-room-for-partner-random");
        socket.off("update-status-user");
      }
    };
  }, [socket]);

  const socketInitializer = async () => {
    socket.on("find-partner-random", (data) => {
      setIsLoading(false);
      if (data.status === "fail") {
        // toast.error(data.message);
      }
    });

    socket.on("update-status-user", (status) => {
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: status,
        })
      );
      if (status === "") {
        clearInterval(TimeIntervalFindPartner.current);
      }
    });
    socket.on("send-noti-partner-out-chat-room", (msg) => {
      //update database, server
      socket.emit("send-noti-partner-out-chat-room");
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "partner-outed-chat",
        })
      );
      toast.info(msg);
    });
    socket.on("send-noti-current-user-out-chat-room", (msg) => {
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "",
        })
      );
      dispatch(
        _partner({
          type: SET_PARTNER_CHAT_RANDOM,
          data: null,
        })
      );
    });
    socket.on("send-noti-partner-disconnected", (msg) => {
      socket.emit("send-noti-partner-disconnected");
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "partner-outed-chat",
        })
      );
      toast.info(msg);
    });

    socket.on("auto-join-room-for-partner-random", (data) => {
      socket.emit("auto-join-room-for-partner-random", data);
    });
    socket.on("find-partner-success-random", (data) => {
      let { partner, message } = data;
      clearInterval(TimeIntervalFindPartner.current);
      dispatch(
        _statusRandomChat({
          type: SET_STATUS_CHAT_RANDOM,
          data: "chatting",
        })
      );
      dispatch(
        _partner({
          type: SET_PARTNER_CHAT_RANDOM,
          data: partner,
        })
      );
      dispatch(
        _partnersCount({
          type: INC_PARTNERS_COUNT,
          data: 1,
        })
      );

      message = message.replace(
        message,
        `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
      );
      toast.success(message);
    });

    // socket.on("banned-account", async (status) => {
    //   if (isWaitingRoom && !isInRoom) {
    //     await socket.emit("out-waiting-room-random");
    //   } else if (isWaitingRoom && isInRoom && partner) {
    //     await socket.emit("out-chat-room-random", partner);
    //   }
    //   setIsWaitingRoom(false);
    //   setIsInRoom(false);
    //   dispatch(getToggleBanned(!status));
    // });
  };

  useEffect(() => {
    return () => {
      clearTimeout(TimeOutFindPartner.current);
      clearInterval(TimeIntervalFindPartner.current);
    };
  }, []);

  useEffect(() => {
    if (data && data.data && socket) {
      setUser(data.data);

      dispatch(
        _partnersCount({
          type: SET_PARTNERS_COUNT,
          data: data.data.partners,
        })
      );
      dispatch(
        _messagesCount({
          type: SET_MESSAGES_COUNT,
          data: data.data.messages,
        })
      );
      socket.emit("join-room-unique-account", data.data.account);
      if (data.data.status === false) {
        dispatch(getToggleBanned(true));
        // socket.disconnect();
      }
    }
  }, [data, socket]);

  useEffect(() => {
    if (dataPartner) {
      setIsHideInfo(dataPartner.hideInfo);
    }
  }, [dataPartner]);

  useEffect(() => {
    if (errorGetUser) {
      toast.error(errorMessageGetUser);
    }
  }, [errorGetUser]);

  const handleClickJoinWaitingRoom = async () => {
    if (getToggleStatusBanned) {
      toast.error("Tài khoản bạn đang bị cấm, chức năng tạm khoá!");
    } else {
      try {
        setIsLoading(true);
        dispatch(
          _partner({
            type: SET_PARTNER_CHAT_RANDOM,
            data: null,
          })
        );
        dispatch(
          _statusRandomChat({
            type: SET_STATUS_CHAT_RANDOM,
            data: "",
          })
        );
        dispatch(
          _messagesRandomChat({
            type: SET_MESSAGES_CHAT_RANDOM,
            data: [],
          })
        );

        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/chat-rooms/check-room`,
          {
            accountID: session.user.id,
          }
        );
        if (res.data.data.status === "waiting" || res.data.data.partner) {
          dispatch(
            _statusRandomChat({
              type: SET_STATUS_CHAT_RANDOM,
              data: "multiple-accounts",
            })
          );
          setIsLoading(false);
          return;
        }
        if (!res.data.data.partner) {
          socket.emit("join-list-users-random", (res) => {
            if (res.status === "ok") {
              dispatch(
                _statusRandomChat({
                  type: SET_STATUS_CHAT_RANDOM,
                  data: "waiting",
                })
              );
              toast.info(
                "Tham gia vào phòng chờ thành công. Đang tiến hành tìm đối phương!"
              );
              // socket.emit("find-partner-random");
              TimeIntervalFindPartner.current = setInterval(() => {
                socket.emit("find-partner-random");
              }, 5000);
            } else {
              toast.error("Lỗi hệ thống");
            }
            setIsLoading(false);
          });
        }
      } catch (err) {
        setIsLoading(false);

        if (err.response) {
          if (err.response.data.message.name === "TokenExpiredError") {
            // signOut();
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
      setIsLoading(true);
      socket.emit("out-waiting-room-random", (res) => {
        if (res.status === "ok") {
          dispatch(
            _statusRandomChat({
              type: SET_STATUS_CHAT_RANDOM,
              data: "",
            })
          );
          dispatch(
            _partner({
              type: SET_PARTNER_CHAT_RANDOM,
              data: null,
            })
          );
          dispatch(
            _messagesRandomChat({
              type: SET_MESSAGES_CHAT_RANDOM,
              data: [],
            })
          );
        } else {
          toast.error("Lỗi hệ thống");
        }
        setIsLoading(false);
      });
    }
  };

  const handleTimeoutFindPartner = () => {
    handleClickOutWaitingRoom();
  };

  return (
    <>
      {requesting && <ThreeDots fill="#06bcee" />}
      {!requesting && user && user && (
        <>
          <Loading isLoading={isLoading} />
          {isOpenModal && (
            <Modal
              title={"Thông báo"}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              maxWidth={"sm"}
            >
              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",

                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#ccf1fa",
                    border: (theme) =>
                      `1px solid ${theme.palette.border.feeds}`,
                  }}
                >
                  <BigHead />
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    alignSelf: "center",
                    color: (theme) => theme.palette.text.color.first,
                  }}
                >
                  Tài khoản của bạn đang tham gia chatting trên thiết bị khác!
                  Đừng lo không tham gia được, đây là giải pháp dành cho bạn:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    alignSelf: "center",
                    color: (theme) => theme.palette.text.color.second,
                  }}
                >
                  Cách 1: Thoát tất cả thiết bị hiện tại.
                </Typography>
              </Box>
            </Modal>
          )}
          <YourSelf user={user} />
          {!isError && !getToggleStatusBanned && (
            <>
              {statusUserChatRandom === "" && (
                <>
                  <Button
                    type="submit"
                    onClick={() => handleClickJoinWaitingRoom()}
                  >
                    Vào phòng chờ!!
                  </Button>
                </>
              )}
              {statusUserChatRandom === "waiting" && (
                <>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      alignSelf: "center",
                      color: (theme) => theme.palette.text.color.first,
                    }}
                  >
                    Đang tiến hành tìm đối phương...
                  </Typography>
                  <CountFindPartner
                    handleTimeoutFindPartner={handleTimeoutFindPartner}
                  />
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

              {(statusUserChatRandom === "chatting" ||
                statusUserChatRandom === "partner-outed-chat" ||
                statusUserChatRandom === "partner-disconnected") && (
                <>
                  <PartnerRandom
                    setIsLoading={setIsLoading}
                    isHideInfo={isHideInfo}
                    setIsHideInfo={setIsHideInfo}
                    socket={socket}
                    partner={dataPartner}
                    user={user}
                  />
                  <Chat
                    isHideInfo={isHideInfo}
                    socket={socket}
                    partner={dataPartner}
                  />
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
