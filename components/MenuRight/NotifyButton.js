import { Badge, Box, ClickAwayListener, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import NotifyContent from "../Homepage/Notify/NotifyContent";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import SocketContext from "../../contexts/socket";
import { useSelector, useDispatch } from "react-redux";
import { _notify } from "../../redux/actions/_notify";
import { useQuery } from "react-query";
import Link from "next/link";
import {
  SET_NOTIFY_NUMBER,
  INC_NOTIFY_NUMBER,
} from "../../redux/actions/constants";
import { toast } from "react-toastify";
import axios from "axios";
const NotifyButton = () => {
  const { data: session, status } = useSession();

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const countCallApi = useRef(1);
  const notifyNumber = useSelector((state) => state.notifyNumber);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (socket && session) {
      socket.emit("join-room-notify", session.user.account);
      socket.on("update-notify-number", (data) => {
        dispatch(
          _notify({
            type: SET_NOTIFY_NUMBER,
            data: 0,
          })
        );
      });
      socket.on("inc-notify-number", (data) => {
        dispatch(
          _notify({
            type: INC_NOTIFY_NUMBER,
            data: data,
          })
        );
      });
      if (countCallApi.current === 1) {
        countCallApi.current = 2;
        getNotifiesCount();
      }
    }
    return () => {
      if (socket) {
        socket.off("update-notify-number");
        socket.off("inc-notify-number");
      }
    };
  }, [socket]);

  const getNotifiesCount = async () => {
    try {
      countCallApi.current = 2;
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/get_numbers/${session.user.id}`
      );
      const resData = res.data.results;
      if (resData !== notifyNumber) {
        dispatch(
          _notify({
            type: SET_NOTIFY_NUMBER,
            data: resData,
          })
        );
      }
    } catch (err) {
      countCallApi.current = 1;
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };
  const handleClickButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          onClick={() => handleClickButton()}
          sx={{
            cursor: "pointer",
            width: "50px",
            height: "50px",
            backgroundColor: isOpen
              ? (theme) => theme.palette.button.background.hover
              : (theme) => theme.palette.button.background.first,

            color: (theme) => theme.palette.button.color.first,
            borderRadius: "10px",
            display: "flex",
            fontSize: "2.5rem",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.button.background.hover,
            },
          }}
        >
          <Badge badgeContent={notifyNumber} max={9} color="error">
            <IoNotificationsOutline />
          </Badge>
        </Box>
        {isOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              sx={{
                position: "absolute",
                backgroundColor: (theme) =>
                  theme.palette.notification.background.first,
                border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                color: (theme) => theme.palette.notification.color.first,
                borderRadius: (theme) =>
                  theme.palette.notification.borderRadius,
                width: "330px",
                right: -50,
                zIndex: 99,
                top: 65,
                boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",

                "&::after": {
                  border: (theme) => `1px solid ${theme.palette.border.dialog}`,
                  position: "absolute",
                  content: `""`,
                  width: "15px",
                  height: "10px",
                  backgroundColor: (theme) =>
                    theme.palette.notification.background.arrow,
                  clipPath: "polygon(50% 0, 100% 100%, 0 100%)",

                  right: "65px",
                  top: "-13px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  alignItems: "center",
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.border.dialog}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                  }}
                >
                  Thông báo
                </Typography>
              </Box>
              <NotifyContent session={session} socket={socket} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "15px",
                  alignItems: "center",
                  borderTop: (theme) =>
                    `1px solid ${theme.palette.border.dialog}`,
                }}
              >
                {session && (
                  <Link href={`/profile/${session.user.account}`}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: (theme) => theme.palette.text.color.active,
                      }}
                    >
                      Xem tất cả
                    </Typography>
                  </Link>
                )}
              </Box>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
    </>
  );
};
export default NotifyButton;
