import { Badge, Box, ClickAwayListener, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import NotifyContent from "../Homepage/Notify/NotifyContent";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import SocketContext from "../../contexts/socket";
import { useSelector, useDispatch } from "react-redux";
import { _notify } from "../../redux/actions/_notify";
import {
  SET_NOTIFY_NUMBER,
  INC_NOTIFY_NUMBER,
} from "../../redux/actions/constants";
import { toast } from "react-toastify";
import axios from "axios";
const NotifyButton = () => {
  const socket = useContext(SocketContext);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const notifyNumber = useSelector((state) => state.notifyNumber);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (status == "authenticated") {
      getNotifyNumber();
    }
  }, [status]);
  const getNotifyNumber = async () => {
    try {
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/notifies/get_numbers/${session.user.id}`
      );
      dispatch(
        _notify({
          type: SET_NOTIFY_NUMBER,
          data: res.data.results,
        })
      );
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (socket) {
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
    }
    return () => {
      if (socket) {
        socket.off("update-notify-number");
        socket.off("inc-notify-number");
      }
    };
  }, []);
  const handleClickAway = () => {
    if (isOpen === true && notifyNumber > 0) {
      socket.emit("update-notify-number", session.user.id, (res) => {
        if (res.status === "err") {
          toast.error("Lỗi hệ thống!");
        } else if (res.status === "ok") {
          setIsOpen(false);
        }
      });
    } else {
      setIsOpen(false);
    }
  };
  const handleClickButton = () => {
    if (isOpen === true && notifyNumber > 0) {
      socket.emit("update-notify-number", session.user.id, (res) => {
        if (res.status === "err") {
          toast.error("Lỗi hệ thống!");
        } else if (res.status === "ok") {
          setIsOpen(!isOpen);
        }
      });
    } else {
      setIsOpen(!isOpen);
    }
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
            backgroundColor: isOpen ? "#e8ecf9" : null,
            borderRadius: "10px",
            display: "flex",
            fontSize: "2.5rem",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#e8ecf9",
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
                backgroundColor: "#ffffff",

                width: "330px",
                right: -50,
                zIndex: 99,
                top: 65,
                boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
                border: "1px solid #EDEFF1",

                "&::after": {
                  border: "1px solid #EDEFF1",
                  position: "absolute",
                  content: `""`,
                  width: "15px",
                  height: "10px",
                  backgroundColor: "rgb(0 0 0 / 25%)",
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
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.color.active,
                  }}
                >
                  Xem tất cả
                </Typography>
              </Box>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
    </>
  );
};
export default NotifyButton;
