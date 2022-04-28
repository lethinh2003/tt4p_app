import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Hearts } from "react-loading-icons";
import { toast } from "react-toastify";

const FinalStep = ({ setStep, setInfo, info }) => {
  const currentYears = new Date().getFullYear();
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <>
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
          maxHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

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
          Vui lòng xác nhận thông tin của bạn nhé
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Họ tên: {info.name}, sinh năm {info.date}, giới tính{" "}
          {info.mySex === "boy"
            ? "Trai"
            : info.mySex === "girl"
            ? "Gái"
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

        <Button onClick={() => setStep(5)}>Previous</Button>
      </Box>
    </>
  );
};
export default FinalStep;
