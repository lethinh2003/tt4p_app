import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";

const FindPartner = () => {
  const { data: session, status } = useSession();
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
    backgroundColor: "#fd6b2229",
    color: "#fd6b22",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#fd6b2229",
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
        <Box
          sx={{
            height: "100%",
            width: "100%",
            maxHeight: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",

            gap: "10px",
            overflow: "auto",
          }}
        >
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
                  session.sex === "boy"
                    ? "https://i.imgur.com/yFYUbLZ.png"
                    : "https://i.imgur.com/Or9WeCe.png"
                }
                alt="Avatar cute"
                width={200}
                height={200}
              />
            </BoxAvatar>
          </Box>

          <ButtonSocialWrapper type="submit">
            Tìm bạn thui!!
          </ButtonSocialWrapper>
        </Box>
      )}
    </>
  );
};
export default FindPartner;
