import { Box, Button, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const StepTwo = ({ setStep }) => {
  const { data: session, status } = useSession();

  const BoxWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "100%",
    margin: "20px 0px",
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
        animate={{ opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 1], x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box>
          <IconButton onClick={() => setStep(1)}>
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
          Chúng tôi luôn ở đây
        </Typography>
        <Typography
          sx={{
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Chúng tôi rất mong các bạn sẽ tìm được bạn tâm sự của riêng mình, còn
          chần chờ gì nữa, hãy tham gia cùng chúng tôi.
        </Typography>
        <Box
          sx={{
            position: "relative",
            alignSelf: "center",
          }}
        >
          <Image
            src="https://i.imgur.com/5S3Sfxe.png"
            alt="User"
            width={350}
            height={350}
          />
          <Box
            component={motion.div}
            animate={{
              y: [0, 10, 0],
              x: [0, 10, 0],
              scale: [1, 1.02, 1],
              rotate: [0, 0, 360, 360, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: 0.05,
            }}
            sx={{
              position: "absolute",
              top: "36%",
              left: "46px",
            }}
          >
            <Image
              src="https://i.imgur.com/6j0rlAS.png"
              alt="pic1"
              width={80}
              height={80}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: 0.05,
            }}
            sx={{
              position: "absolute",
              top: "30%",
              right: "70px",
            }}
          >
            <Image
              src="https://i.imgur.com/aZ9Mgg4.png"
              alt="pic4"
              width={50}
              height={50}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: 0.05,
            }}
            sx={{
              position: "absolute",
              right: "44%",
              top: "25%",
            }}
          >
            <Image
              src="https://i.imgur.com/nFrFE3M.png"
              alt="pic3"
              width={50}
              height={50}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              rotate: [0, 45, 45, 0, -45, -45, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: 0.05,
            }}
            sx={{
              position: "absolute",
              top: "18%",
              left: "24%",
            }}
          >
            <Image
              src="https://i.imgur.com/3sLHZlc.png"
              alt="pic2"
              width={50}
              height={50}
            />
          </Box>
        </Box>

        <Button
          as={motion.div}
          sx={{
            margin: "0 10px",
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
            margin: "0 10px",
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
    </>
  );
};
export default StepTwo;
