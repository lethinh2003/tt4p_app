import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const StepOne = ({ setStep }) => {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Chào mừng đến với tâm sự bốn phương
        </Typography>
        <Typography
          sx={{
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Cộng đồng chúng tôi sẽ kêt nối bạn đến với tất cả mọi người!
        </Typography>
        <Box
          sx={{
            position: "relative",
            alignSelf: "center",
          }}
        >
          <Image
            src="https://i.imgur.com/PtK23SZ.png"
            alt="Phone"
            width={150}
            height={250}
          />

          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0,
            }}
            sx={{
              position: "absolute",
              top: "30px",
              right: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/WZBk7jT.png"
              alt="pic1"
              width={100}
              height={30}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0.2,
            }}
            sx={{
              position: "absolute",
              top: "65px",
              left: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/FDQGfEq.png"
              alt="pic1"
              width={100}
              height={30}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0.4,
            }}
            sx={{
              position: "absolute",
              top: "95px",
              right: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/WZBk7jT.png"
              alt="pic1"
              width={100}
              height={30}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0.6,
            }}
            sx={{
              position: "absolute",
              top: "125px",
              left: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/FDQGfEq.png"
              alt="pic1"
              width={100}
              height={30}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0.8,
            }}
            sx={{
              position: "absolute",
              top: "160px",
              right: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/WZBk7jT.png"
              alt="pic1"
              width={100}
              height={30}
            />
          </Box>
          <Box
            component={motion.div}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 1,
            }}
            sx={{
              position: "absolute",
              top: "195px",
              right: "10px",
            }}
          >
            <Image
              src="https://i.imgur.com/WZBk7jT.png"
              alt="pic1"
              width={100}
              height={30}
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
          onClick={() => setStep("login_signup")}
        >
          Bắt đầu
        </Button>
        <Typography
          sx={{
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Chúng tôi cam kết mọi thông tin cá nhân, lịch sử chat sẽ được bảo mật.
        </Typography>
      </BoxWrapper>
    </>
  );
};
export default StepOne;
