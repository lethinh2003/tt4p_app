import { Button } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  INC_PARTNERS_COUNT,
  SET_MESSAGES_COUNT,
  SET_PARTNERS_COUNT,
  SET_PARTNER,
} from "../../redux/actions/constants";
import { _partner } from "../../redux/actions/_partner";
import { getToggleBanned } from "../../redux/actions/getToggleBanned";
import { getUser } from "../../redux/actions/getUser";
import { _messagesCount } from "../../redux/actions/_messagesCount";
import { _partnersCount } from "../../redux/actions/_partnersCount";
import useLoading from "../../utils/useLoading";
import CountFindPartner from "../Chat/CountFindPartner";
import Loading from "../Loading/Loading";
import Chat from "./Chat";
import PartnerRandom from "./PartnerRandom";
import YourSelf from "./YourSelf";

const FindPartnerRandom = ({ socket }) => {
  const { data: session, status } = useSession();
  const socketDisconnectNoti = useRef(null);
  const socketDisconnectPartner = useRef(null);
  const TimeIntervalFindPartner = useRef(null);
  const countCallApiCheckUserInRoom = useRef(1);

  const TimeOutFindPartner = useRef(null);
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPartnerOutChat, setIsPartnerOutChat] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const [isInRoom, setIsInRoom] = useState(false);
  const [partner, setPartner] = useState();
  const [statusUser, setStatusUser] = useState("");
  const [isHideInfo, setIsHideInfo] = useState(true);
  const [user, setUser] = useState();
  const data = useSelector((state) => state.user.data);
  const requesting = useSelector((state) => state.user.requesting);
  const errorGetUser = useSelector((state) => state.user.error);
  const errorMessageGetUser = useSelector((state) => state.user.message);
  const getToggleStatusBanned = useSelector((state) => state.toggleBanned.on);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      status === "authenticated" &&
      countCallApiCheckUserInRoom.current === 1
    ) {
      countCallApiCheckUserInRoom.current = 2;
      //
      checkUserInRoom();
    }
  }, [status]);
  const checkUserInRoom = async () => {
    try {
      setIsLoading(true);
      setIsWaitingRoom(false);
      setStatusUser("");
      dispatch(
        _partner({
          type: SET_PARTNER,
          data: null,
        })
      );

      socket.emit("delete-unmounted-chat", async (res) => {
        const statusEmit = res.status;
        if (statusEmit === "ok") {
          const res = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/chat-rooms/check-user-in-room`,
            {
              account: session.user.account,
            }
          );
          if (!res.data.statusUser) {
            socket.emit("join-list-users-random", (res) => {
              if (res.status === "ok") {
                toast.info(
                  "Tham gia vào phòng chờ thành công. Đang tiến hành tìm đối phương!"
                );
                TimeIntervalFindPartner.current = setInterval(() => {
                  socket.emit("find-partner-random");
                }, 1000);

                setStatusUser("waiting");
              } else {
                toast.error("Lỗi hệ thống");
              }
              setIsLoading(false);
            });
          } else {
            const {
              status: statusRes,
              account: accountRes,
              partner: partnerRes,
              room: roomRes,
            } = res.data.data;

            if (statusRes === "waiting") {
              toast.info(
                "Bạn đang trong phòng chờ ở trên thiết bị khác, vui lòng thoát thiết bị đó!"
              );
              setIsLoading(false);
            } else if (statusRes === "disconnected") {
              socket.emit(
                "restore-data-chat-room-for-user-reconnect",
                {
                  user: accountRes,
                  partner: partnerRes,
                  room: roomRes,
                },
                (res) => {
                  if (res.status === "ok") {
                  } else {
                    toast.error("Lỗi hệ thống");
                  }
                  setIsLoading(false);
                }
              );
            } else if (statusRes === "chatting") {
              await socket.emit(
                "restore-data-chat-room-for-user-chatting",
                {
                  user: accountRes,
                  partner: partnerRes,
                  room: roomRes,
                },
                (res) => {
                  if (res.status === "ok") {
                  } else {
                    toast.error("Lỗi hệ thống");
                  }
                  setIsLoading(false);
                }
              );
            }
          }
        } else {
          toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
      });
    } catch (err) {
      setIsLoading(false);
      countCallApiCheckUserInRoom.current === 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (status === "authenticated" && !data) {
      dispatch(getUser(session.user.account));
    }
  }, [status]);
  useEffect(() => {
    if (socket) {
      socketInitializer();
    }
    return () => {
      if (socket) {
        socket.off("find-partner-random");

        socket.off("find-partner-success-random");
        socket.off("out-chat-room-for-partner-random");
        socket.off("banned-account");
        socket.off("send-noti-partner-out-chat-room");
        socket.off("send-noti-current-user-out-chat-room");
        socket.off("send-noti-partner-disconnected");
        socket.off("reject-restore");
        socket.off("success-restore");
        socket.off("success-restore-for-partner");
        socket.off("auto-join-room-for-partner-random");
        socket.off("update-status-user");
      }
    };
  }, [socket]);
  const socketInitializer = async () => {
    // await socket.emit("delete-unmounted-chat");
    socket.on("find-partner-random", (data) => {
      setIsLoading(false);
      if (data.status === "fail") {
        // toast.error(data.message);
      }
    });

    socket.on("reject-restore", (msg) => {
      setStatusUser("");
      dispatch(
        _partner({
          type: SET_PARTNER,
          data: null,
        })
      );
      toast.info(msg);
    });
    socket.on("update-status-user", (status) => {
      setStatusUser(status);
      if (status === "") {
        clearInterval(TimeIntervalFindPartner.current);
      }
    });
    socket.on(
      "success-restore-for-partner",
      ({ msg, partner, roomGeneral }) => {
        socket.emit(
          "success-restore-for-partner",
          { partner, roomGeneral },
          (res) => {
            if (res.status === "ok") {
              setStatusUser("chatting");
              dispatch(
                _partner({
                  type: SET_PARTNER,
                  data: partner,
                })
              );
              setPartner(partner);
              toast.info(msg);
            } else {
              toast.error("Lỗi hệ thống");
            }
          }
        );
      }
    );
    socket.on("success-restore", ({ msg, partner }) => {
      setStatusUser("chatting");
      toast.info(msg);
      dispatch(
        _partner({
          type: SET_PARTNER,
          data: partner,
        })
      );
      setPartner(partner);
    });
    socket.on("send-noti-partner-out-chat-room", (msg) => {
      socket.emit("send-noti-partner-out-chat-room");
      setStatusUser("partner-outed-chat");
      toast.info(msg);
    });
    socket.on("send-noti-current-user-out-chat-room", (msg) => {
      setStatusUser("");
      dispatch(
        _partner({
          type: SET_PARTNER,
          data: null,
        })
      );
    });
    socket.on("send-noti-partner-disconnected", (msg) => {
      socket.emit("send-noti-partner-disconnected");
      setStatusUser("partner-disconnected");
      toast.info(msg);
    });

    socket.on("auto-join-room-for-partner-random", ({ partner }) => {
      socket.emit("auto-join-room-for-partner-random", partner);
    });
    socket.on("find-partner-success-random", (data) => {
      let { partner, message } = data;
      clearInterval(TimeIntervalFindPartner.current);
      setStatusUser("chatting");
      dispatch(
        _partner({
          type: SET_PARTNER,
          data: partner,
        })
      );
      dispatch(
        _partnersCount({
          type: INC_PARTNERS_COUNT,
          data: 1,
        })
      );
      setPartner(partner);
      message = message.replace(
        message,
        `Tìm bạn thành công, hãy tâm sự vui vẻ nhé!`
      );
      toast.success(message);
    });

    socket.on("banned-account", async (status) => {
      if (isWaitingRoom && !isInRoom) {
        await socket.emit("out-waiting-room-random");
      } else if (isWaitingRoom && isInRoom && partner) {
        await socket.emit("out-chat-room-random", partner);
      }
      setIsWaitingRoom(false);
      setIsInRoom(false);
      dispatch(getToggleBanned(!status));
    });
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
    if (partner) {
      setIsHideInfo(partner.hideInfo);
    }
  }, [partner]);

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
        setIsWaitingRoom(false);
        dispatch(
          _partner({
            type: SET_PARTNER,
            data: null,
          })
        );
        setStatusUser("");
        const res = await axios.post(
          `${process.env.ENDPOINT_SERVER}/api/v1/chat-rooms/check-user-in-room`,
          {
            account: session.user.account,
          }
        );
        if (!res.data.statusUser) {
          socket.emit("join-list-users-random", (res) => {
            if (res.status === "ok") {
              toast.info(
                "Tham gia vào phòng chờ thành công. Đang tiến hành tìm đối phương!"
              );
              TimeIntervalFindPartner.current = setInterval(() => {
                socket.emit("find-partner-random");
              }, 1000);
              setStatusUser("waiting");
            } else {
              toast.error("Lỗi hệ thống");
            }
            setIsLoading(false);
          });
        } else if (res.data.statusUser === "waiting") {
          toast.info(
            "Bạn đang trong phòng chờ ở trên thiết bị khác, vui lòng thoát thiết bị đó!"
          );
          setIsLoading(false);
        } else {
          const {
            status: statusRes,
            account: accountRes,
            partner: partnerRes,
            room: roomRes,
          } = res.data.data;
          if (statusRes === "disconnected") {
            socket.emit(
              "restore-data-chat-room-for-user-reconnect",
              {
                user: accountRes,
                partner: partnerRes,
                room: roomRes,
              },
              (res) => {
                if (res.status === "ok") {
                } else {
                  toast.error("Lỗi hệ thống");
                }
                setIsLoading(false);
              }
            );
          } else if (statusRes === "chatting") {
            socket.emit(
              "restore-data-chat-room-for-user-chatting",
              {
                user: accountRes,
                partner: partnerRes,
                room: roomRes,
              },
              (res) => {
                if (res.status === "ok") {
                } else {
                  toast.error("Lỗi hệ thống");
                }
                setIsLoading(false);
              }
            );
          }
        }
      } catch (err) {
        setIsLoading(false);

        if (err.response) {
          if (err.response.data.message.name === "TokenExpiredError") {
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
      setIsLoading(true);
      socket.emit("out-waiting-room-random", (res) => {
        if (res.status === "ok") {
          socket.emit("update-status-user", {
            room: `${session.user.account}-room`,
            status: "",
          });
          setStatusUser("");
          dispatch(
            _partner({
              type: SET_PARTNER,
              data: null,
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

          <YourSelf user={user} />
          {!isError && !getToggleStatusBanned && (
            <>
              {!statusUser && (
                <>
                  <Button
                    as={motion.div}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    onClick={() => handleClickJoinWaitingRoom()}
                  >
                    Vào phòng chờ!!
                  </Button>
                </>
              )}
              {statusUser === "waiting" && (
                <>
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

              {(statusUser === "chatting" ||
                statusUser === "partner-outed-chat" ||
                statusUser === "partner-disconnected") && (
                <>
                  <PartnerRandom
                    setIsLoading={setIsLoading}
                    setStatusUser={setStatusUser}
                    statusUser={statusUser}
                    isHideInfo={isHideInfo}
                    setIsHideInfo={setIsHideInfo}
                    socket={socket}
                    partner={partner}
                    user={user}
                    isInRoom={isInRoom}
                    setIsInRoom={setIsInRoom}
                    setIsWaitingRoom={setIsWaitingRoom}
                    isPending={isPending}
                    setIsPending={setIsPending}
                  />
                  <Chat
                    statusUser={statusUser}
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
  );
};
export default FindPartnerRandom;
