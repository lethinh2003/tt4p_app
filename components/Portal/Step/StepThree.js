import { Box, Button, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Signup from "../Signup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const StepThree = ({ setStep, setInfo, info }) => {
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
          <IconButton onClick={() => setStep(2)}>
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
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Vui lòng mô tả chính xác thông tin của bạn, để chúng tôi có thể tìm
          chính xác partner cho bạn nhé
        </Typography>
        <Signup setStep={setStep} setInfo={setInfo} info={info} />
      </BoxWrapper>
    </>
  );
};
export default StepThree;
