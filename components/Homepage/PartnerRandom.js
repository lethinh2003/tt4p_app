import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import useModal from "../../utils/useModal";
import RequestInfoDialog from "../Chat/RequestInfoDialog";
import InfoPartnerAndUser from "../Partner/InfoPartnerAndUser";
import InfoPartnerDialog from "../Partner/InfoPartnerDialog";
import ButtonRequestInfoPartner from "../Partner/ButtonRequestInfoPartner";
import { useDispatch } from "react-redux";
import { getPartner } from "../../redux/actions/getPartner";
const PartnerRandom = ({
  isHideInfo,
  setIsHideInfo,
  partner,
  user,
  socket,
  setStatusUser,
  statusUser,
  setIsLoading,
}) => {
  const { isShow, toggle } = useModal();
  const { isShow: isShowInfoPartner, toggle: toggleInfoPartner } = useModal();
  const [countRequestInfo, setCountRequestInfo] = useState(5);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("request-info-partner", () => {
      toggle();
    });

    socket.on("notify-request-info-partner", (data) => {
      if (data.status === "fail") {
        setCountRequestInfo((prev) => prev - 1);
      } else if (data.status === "success") {
        setIsHideInfo(false);
        setCountRequestInfo(0);
      }
    });

    return () => {
      socket.off("request-info-partner");
      socket.off("notify-request-info-partner");
    };
  }, [socket]);
  const handleClickOutChatRoom = async () => {
    setIsLoading(true);
    if (statusUser === "partner-outed-chat") {
      socket.emit("agree-out-chat-room-for-current-user", (res) => {
        if (res.status === "ok") {
          socket.emit("update-status-user", {
            room: `${user.account}-room`,
            status: "",
          });
          dispatch(
            getPartner({
              type: "GET_PARTNER",
              data: null,
            })
          );
          setStatusUser("");
        } else {
          toast.error("Lỗi hệ thống!");
        }
        setIsLoading(false);
      });
    } else if (statusUser === "partner-disconnected") {
      socket.emit("agree-out-chat-room-dont-wait-partner", (res) => {
        if (res.status === "ok") {
          socket.emit("update-status-user", {
            room: `${user.account}-room`,
            status: "",
          });
          dispatch(
            getPartner({
              type: "GET_PARTNER",
              data: null,
            })
          );
          setStatusUser("");
        } else {
          toast.error("Lỗi hệ thống!");
        }
        setIsLoading(false);
      });
    } else {
      socket.emit("out-chat-room-for-current-user", (res) => {
        if (res.status === "ok") {
          socket.emit("update-status-user", {
            room: `${user.account}-room`,
            status: "",
          });
          dispatch(
            getPartner({
              type: "GET_PARTNER",
              data: null,
            })
          );
          setStatusUser("");
        } else {
          toast.error("Lỗi hệ thống!");
        }
        setIsLoading(false);
      });
    }
  };

  const handleClickRequestInfoPartner = () => {
    if (isHideInfo) {
      if (countRequestInfo >= 1) {
        if (partner.hideInfo) {
          toast.info(
            "Gửi yêu cầu xem thông tin thành công, vui lòng đợi đối phương đồng ý!"
          );
          socket.emit("request-info-partner", partner);
        }
      } else {
        toast.error(
          "Bạn đã hết số lần xin info rùi!!!, cuộc vui nào cũng có lúc tàn mà đúng không??. Thử tìm đối tượng mới nhé!"
        );
      }
    } else {
      toggleInfoPartner();
    }
  };

  return (
    <>
      {isShowInfoPartner && (
        <InfoPartnerDialog
          isShow={isShowInfoPartner}
          toggle={toggleInfoPartner}
          partner={partner}
        />
      )}
      {isShow && (
        <RequestInfoDialog
          isShow={isShow}
          toggle={toggle}
          partner={partner}
          socket={socket}
        />
      )}

      <InfoPartnerAndUser
        user={user}
        partner={partner}
        socket={socket}
        isHideInfo={isHideInfo}
        setIsHideInfo={setIsHideInfo}
      />
      <ButtonRequestInfoPartner
        handleClickRequestInfoPartner={handleClickRequestInfoPartner}
        isHideInfo={isHideInfo}
        countRequestInfo={countRequestInfo}
      />

      <Button
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        type="submit"
        onClick={() => handleClickOutChatRoom()}
      >
        Thoát chat!!
      </Button>
    </>
  );
};
export default PartnerRandom;
