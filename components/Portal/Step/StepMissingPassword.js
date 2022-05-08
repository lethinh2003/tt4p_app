import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import MissingPassword from "../MissingPassword";

const StepMissingPassword = ({ setStep }) => {
  const BoxWrapper = styled(Box)(({ theme }) => ({
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
          <IconButton onClick={() => setStep("login")}>
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
          Quên mật khẩu
        </Typography>
        <Typography
          sx={{
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Vui lòng nhập thông tin tài khoản hoặc email của bạn để lấy lại mật
          khẩu.
        </Typography>
        <MissingPassword setStep={setStep} />
      </BoxWrapper>
    </>
  );
};
export default StepMissingPassword;
