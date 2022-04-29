import { Box, Button, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import InfoDetail from "../InfoDetail";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const StepFive = ({ setStep, setInfo, info }) => {
  const { data: session, status } = useSession();

  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  }));

  return (
    <>
      <BoxWrapper
        as={motion.div}
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box>
          <IconButton onClick={() => setStep(3)}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "35px",
            alignSelf: "center",
          }}
        >
          Thông tin của bạn
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            alignSelf: "center",
          }}
        >
          Chào {info.name}
        </Typography>
        <Typography
          sx={{
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Vui lòng cho chúng tôi biết thêm về bạn để nhanh chóng kết nối với bạn
          khác nhé!!
        </Typography>
        <InfoDetail setStep={setStep} setInfo={setInfo} info={info} />
      </BoxWrapper>
    </>
  );
};
export default StepFive;
