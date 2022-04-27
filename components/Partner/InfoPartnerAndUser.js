import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { memo } from "react";
const InfoPartnerAndUser = ({
  partner,
  user,
  socket,
  isHideInfo,
  setIsHideInfo,
}) => {
  const [namePartner, setNamePartner] = useState(partner ? partner.name : "");

  useEffect(() => {
    if (socket) {
      socket.on("notify-request-info-partner", (data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "success") {
          setIsHideInfo(false);
          toast.success(data.message);
        }
      });
    }
    return () => socket.off("notify-request-info-partner");
  }, []);

  useEffect(() => {
    if (partner) {
      if (isHideInfo) {
        const namePartnerArray = partner.name.split("");
        for (let i = namePartnerArray.length - 1; i > 0; i--) {
          namePartnerArray[i] = "*";
        }
        setNamePartner(namePartnerArray.join(""));
      } else {
        setNamePartner(partner.name);
      }
    }
  }, [isHideInfo]);

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

  return (
    <>
      <Typography
        as={motion.div}
        initial={{ opacity: 0 }}
        transition={{
          duration: 1,
        }}
        animate={{ opacity: 1 }}
        sx={{
          fontWeight: "bold",
          fontSize: "35px",
          alignSelf: "center",
        }}
      >
        Khu vực tâm sự
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "20px", sm: "0" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              alignSelf: "center",
              maxWidth: "200px",
            }}
            className="three-dots"
          >
            {user.name}
          </Typography>

          <BoxAvatar
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src={
                user.sex === "boy"
                  ? "https://i.imgur.com/yFYUbLZ.png"
                  : "https://i.imgur.com/Or9WeCe.png"
              }
              alt={user.name}
              width={200}
              height={200}
            />
          </BoxAvatar>
        </Box>

        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <img
            src="https://i.imgur.com/cYuOjCa.png"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              alignSelf: "center",
              maxWidth: "200px",
            }}
            className="three-dots"
          >
            {namePartner}
          </Typography>

          <BoxAvatar
            as={motion.div}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src={
                partner.sex === "boy"
                  ? "https://i.imgur.com/yFYUbLZ.png"
                  : "https://i.imgur.com/Or9WeCe.png"
              }
              alt={namePartner}
              width={200}
              height={200}
            />
          </BoxAvatar>
        </Box>
      </Box>
    </>
  );
};
export default memo(InfoPartnerAndUser);
