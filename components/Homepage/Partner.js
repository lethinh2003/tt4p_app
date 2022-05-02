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
const Partner = ({
  isHideInfo,
  setIsHideInfo,
  isInRoom,
  setIsWaitingRoom,
  setIsInRoom,
  partner,
  user,
  socket,
}) => {
  const socketOn = useRef(null);
  const socketOnCancelRequestInfoPartner = useRef(null);
  const { isShow, toggle } = useModal();
  const { isShow: isShowInfoPartner, toggle: toggleInfoPartner } = useModal();
  const [countRequestInfo, setCountRequestInfo] = useState(5);

  useEffect(() => {
    if (socket) {
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
    }
  }, [socket]);
  const handleClickOutChatRoom = async () => {
    await socket.emit("out-chat-room", partner);
    setIsWaitingRoom(false);
    setIsInRoom(false);
  };

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
export default Partner;
