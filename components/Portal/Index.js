import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import FinalStep from "./FinalStep";
import InfoDetail from "./InfoDetail";
import Login from "./Login";
import Signup from "./Signup";

const Index = () => {
  const { data: session, status } = useSession();

  console.log(session);
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({});

  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,
    // height: "600px",
    maxWidth: "400px",
    width: "100%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    borderRadius: "30px",
    boxShadow: `0px 4px 6px 2px ${theme.palette.box.shadow.default}`,
  }));
  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "100%",
    maxHeight: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    gap: "10px",
    overflowY: "auto",
    margin: "10px 0",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  }));
  const ButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.default,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "1.5rem",
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
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "#fd6b2229",
      opacity: 0.8,
    },
  }));
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  return (
    <>
      <ContainerWrapper>
        {step == 1 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Chào mừng đến với tâm sự 4 phương
            </Typography>
            <Typography
              sx={{
                opacity: 0.7,
                fontSize: "14px",
              }}
            >
              cộng đồng chúng tôi sẽ kêt nối bạn đên với tất cả mọi người!
            </Typography>
            <Image
              src="https://i.imgur.com/25eZxv6.png"
              alt="Picture of the author"
              width={200}
              height={300}
            />
            <Button
              as={motion.div}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setStep(2)}
            >
              Start
            </Button>
            <Typography
              sx={{
                opacity: 0.7,
                fontSize: "14px",
              }}
            >
              Chúng tôi cam kết mọi thông tin cá nhân, lịch sử chat sẽ được bảo
              mật
            </Typography>
          </BoxWrapper>
        )}
        {step == 2 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 1], x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "35px",
                alignSelf: "center",
              }}
            >
              Chúng tôi luôn ở đây
            </Typography>
            <Typography
              sx={{
                opacity: 0.7,
                fontSize: "14px",
              }}
            >
              Chúng tôi rất mong các bạn sẽ tìm được bạn tâm sự của riêng mình,
              còn chần chờ gì nữa, hãy tham gia cùng chúng tôi
            </Typography>
            <Image
              src="https://i.imgur.com/hXCY8V3.png"
              alt="Picture of the author"
              width={200}
              height={300}
            />
            <Button
              as={motion.div}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setStep(4)}
            >
              Đăng nhập
            </Button>
            <Button
              as={motion.div}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setStep(3)}
            >
              Người dùng mới
            </Button>
          </BoxWrapper>
        )}
        {step == 3 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                opacity: 0.7,
                fontSize: "14px",
              }}
            >
              Vui lòng mô tả chính xác thông tin của bạn, để chúng tôi có thể
              tìm chính xác partner cho bạn nhé
            </Typography>
            <Signup setStep={setStep} setInfo={setInfo} info={info} />
          </BoxWrapper>
        )}
        {step == 4 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                opacity: 0.7,
                fontSize: "14px",
              }}
            >
              Vui lòng mô tả chính xác thông tin của bạn, để chúng tôi có thể
              tìm chính xác partner cho bạn nhé
            </Typography>
            <Login setStep={setStep} />
          </BoxWrapper>
        )}
        {step == 5 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
              Vui lòng chọn đối tượng muốn tâm sự của bạn nhé
            </Typography>
            <InfoDetail setStep={setStep} setInfo={setInfo} info={info} />

            <Button
              as={motion.div}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setStep(3)}
            >
              Previous
            </Button>
          </BoxWrapper>
        )}
        {step == 6 && (
          <BoxWrapper
            as={motion.div}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalStep setStep={setStep} setInfo={setInfo} info={info} />
          </BoxWrapper>
        )}
      </ContainerWrapper>
    </>
  );
};
export default Index;
