import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";
import axios from "axios";

const StepSix = ({ setStep, setInfo, info }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, y: "-100%", pointerEvents: "none" },
  };
  const loadingVariants = {
    open: { opacity: 1, display: "flex" },
    closed: { opacity: 0, display: "none" },
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/sign-up`,
        {
          account: info.account,
          name: info.name,
          sex: info.mySex,
          findSex: info.findSex,
          date: info.date,
          city: info.cityLive,
          password: info.password,
        }
      );
      const result = await signIn("login", {
        account: info.account,
        password: info.password,
        redirect: true,
      });

      toast.success(res.data.message);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

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
        <Box
          as={motion.div}
          animate={isLoading ? "open" : "closed"}
          variants={loadingVariants}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Hearts fill="#cf65be" strokeOpacity={0.125} speed={0.75} />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Đang tải...
          </Typography>
        </Box>
        <Box
          as={motion.div}
          animate={!isLoading ? "open" : "closed"}
          variants={variants}
          sx={{
            height: "100%",
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            gap: "10px",
            overflow: "auto",
          }}
        >
          <Box>
            <IconButton onClick={() => setStep(5)}>
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
            Vui lòng xác nhận thông tin của bạn nhé.
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Họ tên: {info.name}, sinh năm {info.date}, giới tính{" "}
            {info.mySex === "boy"
              ? "trai"
              : info.mySex === "girl"
              ? "gái"
              : "LGBT"}
            , sống ở {info.cityLive}, muốn tìm{" "}
            {info.findSex === "boy"
              ? "Bạn Trai"
              : info.findSex === "girl"
              ? "Bạn Gái"
              : "Bạn LGBT"}
            .
          </Typography>

          <Button type="submit" onClick={onSubmit}>
            Next
          </Button>
        </Box>
      </BoxWrapper>
    </>
  );
};
export default StepSix;
