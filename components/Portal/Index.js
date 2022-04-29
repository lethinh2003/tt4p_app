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
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";
import StepFour from "./Step/StepFour";
import StepFive from "./Step/StepFive";
import StepSix from "./Step/StepSix";
const Index = () => {
  const { data: session, status } = useSession();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({});

  const ContainerWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.box.background.default,
    height: "100%",
    maxWidth: "420px",
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
    maxHeight: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 10px",
    gap: "10px",
    overflowY: "auto",
    margin: "10px 0",
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
      <ContainerWrapper
        sx={{
          borderRadius: { xs: "0px" },
          height: { xs: "calc(100% - 0px)" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            padding: "20px 10px",
          }}
        >
          {step == 1 && <StepOne setStep={setStep} />}
          {step == 2 && <StepTwo setStep={setStep} />}
          {step == 3 && (
            <StepThree setStep={setStep} setInfo={setInfo} info={info} />
          )}
          {step == 4 && <StepFour setStep={setStep} />}
          {step == 5 && (
            <StepFive setStep={setStep} setInfo={setInfo} info={info} />
          )}

          {step == 6 && (
            <StepSix setStep={setStep} setInfo={setInfo} info={info} />
          )}
        </Box>
      </ContainerWrapper>
    </>
  );
};
export default Index;
