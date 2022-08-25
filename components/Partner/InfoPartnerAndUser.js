import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { memo } from "react";
import AvatarUser from "../Homepage/AvatarUser";
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
    width: "200px",
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
          fontSize: "2rem",
          alignSelf: "center",
          color: (theme) => theme.palette.text.color.first,
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
          flexDirection: { xs: "row", sm: "row" },
          gap: { xs: "20px", sm: "0" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              alignSelf: "center",
              maxWidth: { xs: "100px", md: "200px" },
              color: (theme) => theme.palette.text.color.first,
            }}
            className="three-dots"
          >
            {user.name}
          </Typography>

          <AvatarUser
            user={user}
            sx={{
              width: "100px",
              height: "100px",
            }}
          />
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
            alignItems: "center",
          }}
        >
          <Typography
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              alignSelf: "center",
              maxWidth: { xs: "100px", md: "200px" },
              color: (theme) => theme.palette.text.color.first,
            }}
            className="three-dots"
          >
            {namePartner}
          </Typography>

          <AvatarUser
            user={partner}
            sx={{
              width: "100px",
              height: "100px",
            }}
          />
        </Box>
      </Box>
    </>
  );
};
export default memo(InfoPartnerAndUser);
